import React, { useEffect, useReducer, useState } from 'react';
import Head from 'next/head';
import AuthenticatedPage from '@/layouts/authenticated-page';
import DocumentTemplateMutationProvider, { useDocumentTemplateMutation } from '@/context/document-template-mutation';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import InputField from '@/components/generic/input-field';
import TextAreaField from '@/components/generic/textarea-field';
import { DocumentTemplateType, DOCUMENT_RELATED_OBJECTS, NotificationType, TemplateType } from '@/lib/types';
import { useNotifier } from '@/components/notifier';
import { useLoader } from '@/components/loader';
import { isEqual, isNoneOrEmpty, useLocation, validationMessage, validityCheck } from '@/lib/helper';
import DocumentTemplateProvider, { useDocumentTemplate } from '@/context/document-template-provider';
import { bundleContexts } from '@/context/utils';
import { KARRIO_API } from '@/client/context';
import AppLink from '@/components/app-link';
import { DEFAULT_DOCUMENT_TEMPLATE } from '@/lib/sample';

export { getServerSideProps } from "@/lib/middleware";

type stateValue = string | boolean | string[] | Partial<TemplateType>;
const DEFAULT_STATE = {
  related_object: 'order',
  template: DEFAULT_DOCUMENT_TEMPLATE,
};
const ContextProviders: React.FC = bundleContexts([
  DocumentTemplateProvider,
  DocumentTemplateMutationProvider,
]);

function reducer(state: any, { name, value }: { name: string, value: stateValue }) {
  switch (name) {
    case 'partial':
      return { ...(value as TemplateType) };
    default:
      return { ...state, [name]: value }
  }
}

export default function DocumentTemplatePage(pageProps: any) {
  const Component: React.FC = () => {
    const loader = useLoader();
    const router = useLocation();
    const notifier = useNotifier();
    const query = useDocumentTemplate();
    const mutation = useDocumentTemplateMutation();
    const [isNew, setIsNew] = useState<boolean>();
    const [template, dispatch] = useReducer(reducer, DEFAULT_STATE, () => DEFAULT_STATE);

    const computeParams = (template: DocumentTemplateType) => {
      if (isNoneOrEmpty(template.related_object)) { return ''; }
      return `?${template.related_object}s=sample`;
    };
    const handleChange = (event: React.ChangeEvent<any>) => {
      const target = event.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name: string = target.name;

      if (target.multiple === true) {
        value = Array.from(target.selectedOptions).map((o: any) => o.value)
      }

      dispatch({ name, value });
    };
    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      loader.setLoading(true);
      try {
        if (isNew) {
          const response = await mutation.createDocumentTemplate(template);
          setTimeout(() => {
            router.updateUrlParam('id', response?.template?.id as string);
          }, 1000);
          notifier.notify({
            type: NotificationType.success,
            message: `Document template created successfully`
          });
          loader.setLoading(false);
        } else {
          await mutation.updateDocumentTemplate(template);
          query.refetch();
          notifier.notify({
            type: NotificationType.success,
            message: `Document template updated successfully`
          });
          loader.setLoading(false);
        }
      } catch (message: any) {
        notifier.notify({ type: NotificationType.error, message });
        loader.setLoading(false);
      }
    };

    useEffect(() => {
      setIsNew(router.query.id === 'new');
      if (router.query.id !== 'new') {
        query.loadDocumentTemplate(router.query.id as string);
      }
    }, [router.query.id]);
    useEffect(() => {
      if (router.query.id !== 'new') {
        dispatch({ name: 'partial', value: query.template as any });
      }
    }, [query.template]);

    return (
      <form onSubmit={handleSubmit} className="p-4">

        <div className="py-4 is-flex is-justify-content-space-between has-background-white">
          <div className="is-vcentered">
            <AppLink className="button is-small is-white" href="/settings/templates">
              <span className="icon is-small">
                <i className="fas fa-times"></i>
              </span>
            </AppLink>
            <span className="title is-6 has-text-weight-semibold p-3">Edit document template</span>
          </div>
          <div>
            <a className={`button is-small is-primary mx-1 ${isNoneOrEmpty(template.id) ? 'is-static' : ''}`}
              href={`${KARRIO_API}/documents/${template.id}.${template.slug}${computeParams(template)}`}
              target="_blank" rel="noreferrer">
              Preview Template
            </a>
            <button
              type="submit"
              className="button is-small is-success"
              disabled={loader.loading || isEqual(template, query.template || DEFAULT_STATE)}
            >
              Save Template
            </button>
          </div>
        </div>

        <hr className='my-2' style={{ height: '1px' }} />

        <div className="columns m-0">

          <div className="column px-0 pb-4 is-relative">

            <InputField label="name"
              name="name"
              value={template.name as string}
              onChange={handleChange}
              placeholder="packing slip"
              className="is-small"
              required
            />

            <InputField label="slug"
              name="slug"
              value={template.slug as string}
              onInvalid={validityCheck(validationMessage('Please enter a valid slug'))}
              onChange={validityCheck(handleChange)}
              placeholder="packing_slip"
              className="is-small"
              pattern="^[a-z0-9_]+$"
              required
            />

            <div className="field mb-2">
              <label className="label is-capitalized" style={{ fontSize: ".8em" }}>
                <span>Related Objects</span>
                <span className="icon is-small has-text-danger small-icon">
                  <i className="fas fa-asterisk" style={{ fontSize: ".7em" }}></i>
                </span>
              </label>

              <div className="control">
                <div className="select is-small is-fullwidth">
                  <select name="related_object" onChange={handleChange} value={template?.related_object} required>
                    {DOCUMENT_RELATED_OBJECTS.map(obj => <option key={obj} value={obj}>{obj}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <TextAreaField label="description"
              name="description"
              value={template.description as string}
              onChange={handleChange}
              placeholder="Packing slip template"
              className="is-small"
            />

          </div>

          <div className="p-2"></div>

          <div className="column px-0 is-9">
            <div className="card" style={{ borderRadius: 0 }}>
              <CodeMirror
                height="80vh"
                extensions={[html({})]}
                value={template.template as string}
                onChange={value => dispatch({ name: 'template', value })}
              />
            </div>
          </div>

        </div>

      </form>
    )
  };

  return AuthenticatedPage((
    <>
      <Head><title>Template - {(pageProps as any).metadata?.APP_NAME}</title></Head>

      <ContextProviders>

        <Component />

      </ContextProviders>
    </>
  ), pageProps);
}
