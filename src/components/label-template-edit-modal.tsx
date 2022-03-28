import React, { useContext, useReducer, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { jsonLanguage } from '@codemirror/lang-json';
import { deepEqual, failsafe, isEqual, isNone, isNoneOrEmpty, validationMessage, validityCheck } from '@/lib/helper';
import { get_user_connections_with_generics_user_connections_GenericSettings, LabelTemplate, LabelTemplateTypeEnum } from 'karrio/graphql';
import Notifier from '@/components/notifier';
import { Loading } from '@/components/loader';
import InputField from '@/components/generic/input-field';
import { DEFAULT_SVG_LABEL_TEMPLATE } from '@/lib/sample';
import { KARRIO_API } from '@/client/context';
import Tabs, { TabStateProvider } from './generic/tabs';

export const DEFAULT_LABEL_TEMPLATE_CONTENT: Partial<LabelTemplate> = {
  slug: '',
  width: 4,
  height: 6,
  template_type: LabelTemplateTypeEnum.SVG,
  template: DEFAULT_SVG_LABEL_TEMPLATE,
  shipment_sample: {},
};

type ConnectionType = get_user_connections_with_generics_user_connections_GenericSettings;
type OperationType = {
  connection: ConnectionType;
  onSubmit: (template: LabelTemplate) => Promise<any>;
};
type LabelTemplateStateContextType = {
  isActive: boolean;
  operation?: OperationType;
  editLabelTemplate: (operation: OperationType) => void,
};
type stateValue = string | boolean | Partial<LabelTemplate> | undefined | null;

export const LabelTemplateStateContext = React.createContext<LabelTemplateStateContextType>({} as LabelTemplateStateContextType);

interface LabelTemplateEditModalComponent { }

function reducer(state: any, { name, value }: { name: string, value: stateValue }) {
  switch (name) {
    case 'partial':
      return isNone(value) ? undefined : { ...(state || {}), ...(value as LabelTemplate) };
    case 'shipment_sample':
      const content = failsafe(() => JSON.parse(value as string), state.shipment_sample);
      return { ...state, shipment_sample: content };
    default:
      return { ...state, [name]: value }
  }
}

const LabelTemplateEditModalProvider: React.FC<LabelTemplateEditModalComponent> = ({ children }) => {
  const { loading, setLoading } = useContext(Loading);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`template-${Date.now()}`);
  const [template, dispatch] = useReducer(reducer, undefined, () => DEFAULT_LABEL_TEMPLATE_CONTENT);
  const [operation, setOperation] = useState<OperationType | undefined>();

  const isUnChanged = (change: LabelTemplate): boolean => {
    return (
      isEqual(template, operation?.connection.label_template || DEFAULT_LABEL_TEMPLATE_CONTENT)
    )
  }
  const editLabelTemplate = (operation: OperationType) => {
    const template = (operation.connection.label_template || DEFAULT_LABEL_TEMPLATE_CONTENT as LabelTemplate);

    setIsActive(true);
    setOperation(operation);
    dispatch({ name: 'partial', value: template });
    setKey(`template-${operation.connection.id}`);
  };
  const close = (_?: React.MouseEvent) => {
    setIsActive(false);
    setOperation(undefined);
    dispatch({ name: 'partial', value: undefined });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | any>) => {
    event.preventDefault();
    const target = event.target;
    let name: string = target.name;
    let value: stateValue = target.type === 'checkbox' ? target.checked : target.value;

    dispatch({ name, value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    operation?.onSubmit && await operation?.onSubmit(template as LabelTemplate);
  };

  return (
    <Notifier>
      <LabelTemplateStateContext.Provider value={{ editLabelTemplate, operation, isActive }}>
        {children}
      </LabelTemplateStateContext.Provider>

      <form onSubmit={handleSubmit} className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background has-background-white"></div>
        <div className="modal-card is-large-modal">

          {template !== undefined && <section className="modal-card-body p-4">

            <div className="pb-4 pt-0 is-flex is-justify-content-space-between has-background-white">
              <div className="is-vcentered">
                <button className="button is-small is-white" aria-label="close" onClick={close}>
                  <span className="icon is-small"><i className="fas fa-times"></i></span>
                </button>
                <span className="title is-6 has-text-weight-semibold p-3">Edit document template</span>
              </div>
              <div>
                <a className={`button is-small is-primary mx-1 ${isNoneOrEmpty(template.id) ? 'is-static' : ''}`}
                  href={`${KARRIO_API}/v1/carriers/${operation?.connection.id}/label.pdf`}
                  target="_blank" rel="noreferrer">
                  Preview Template
                </a>
                <button
                  type="submit"
                  className="button is-small is-success"
                  disabled={loading || isUnChanged(template)}
                >
                  Save Template
                </button>
              </div>
            </div>

            <hr className='my-2' style={{ height: '1px' }} />

            <div className="columns m-0">

              <div className="column px-0 pb-4">

                <InputField label="slug"
                  name="slug"
                  value={template.slug as string}
                  onInvalid={validityCheck(validationMessage('Please enter a valid slug'))}
                  onChange={validityCheck(handleChange)}
                  pattern="^[a-z0-9_]+$"
                  placeholder="ucc_128"
                  className="is-small"
                  required
                />

                <InputField label="height"
                  name="height"
                  type="number"
                  value={template.height}
                  onChange={handleChange}
                  className="is-small"
                  required
                />

                <InputField label="width"
                  name="width"
                  type="number"
                  value={template.width}
                  onChange={handleChange}
                  className="is-small"
                  required
                />

              </div>

              <div className="p-2"></div>

              <div className="column p-0 is-9">

                <TabStateProvider tabs={['TEMPLATE', 'SHIPMENT SAMPLE']} setSelectedToURL={false}>
                  <Tabs tabClass="is-size-7 has-text-weight-bold" style={{ position: 'relative' }}>
                    <div className="card" style={{ borderRadius: 0 }}>
                      <CodeMirror
                        height="85vh"
                        extensions={[html({})]}
                        value={template.template as string}
                        onChange={value => dispatch({ name: 'template', value })}
                      />
                    </div>
                    <div className="card" style={{ borderRadius: 0 }}>
                      <CodeMirror
                        height="85vh"
                        extensions={[jsonLanguage]}
                        value={failsafe(() => JSON.stringify(template.shipment_sample, null, 2))}
                        onChange={value => dispatch({ name: 'shipment_sample', value })}
                      />
                    </div>
                  </Tabs>
                </TabStateProvider>
              </div>

            </div>

          </section>}

        </div>
      </form>
    </Notifier>
  )
};

export function useLabelTemplateModal() {
  return useContext(LabelTemplateStateContext);
}

export default LabelTemplateEditModalProvider;
