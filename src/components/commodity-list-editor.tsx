import CommodityEditModalProvider, { CommodityStateContext } from '@/components/commodity-edit-modal';
import CommodityDescription from '@/components/descriptions/commodity-description';
import LineItemSelector from '@/components/line-item-selector';
import React, { useContext, useEffect } from 'react';
import { Loading } from '@/components/loader';
import { CommodityType } from '@/lib/types';

type CommodityCollection = Record<string, CommodityType>;
interface CommodityCollectionEditorProps {
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: CommodityType[];
  pickLineItems?: boolean;
  onRemove?: (id: string) => Promise<any>;
  onUpdate?: (data: CommodityType) => Promise<any>;
  onChange?: (commodities: CommodityType[]) => void;
}
interface CommodityCollectionEditorInterface {
  commodities: CommodityType[];
}

export const CommodityCollectionEditorContext = React.createContext<CommodityCollectionEditorInterface>({
  commodities: [],
} as CommodityCollectionEditorInterface);

const CommodityCollectionEditor: React.FC<CommodityCollectionEditorProps> = ({ defaultValue, children, className, onChange, onRemove, onUpdate, pickLineItems, ...props }) => {
  const { loading } = useContext(Loading);
  const [commodities, setCommodities] = React.useState<CommodityCollection>(toCommodityCollection(defaultValue));
  const [key, setKey] = React.useState<string>(`commodities-${Date.now()}`);

  const updateCommodity = async (uid: string, data: CommodityType) => {
    data.id && onUpdate && await onUpdate(data);

    const newState = { ...commodities, [uid]: data };
    setCommodities(newState);
  };
  const removeCommodity = async (uid: string) => {
    const { id } = commodities[uid];
    id && onRemove && await onRemove(id);
    if (!id) {
      const newState = Object
        .entries(commodities)
        .reduce((acc, [key, item]) => (key === uid ? acc : { ...acc, [key]: item }), {});

      setCommodities(newState);
    }
  };

  useEffect(() => {
    onChange && onChange(Object.values(commodities));
  }, [commodities]);
  useEffect(() => {
    setCommodities(toCommodityCollection(defaultValue));
    setKey(`commodities-${Date.now()}`);
  }, [defaultValue]);

  return (
    <article className={`panel is-shadowless ${className || 'is-white my-3'}`} {...props} key={key}>
      <CommodityEditModalProvider>
        <CommodityCollectionEditorContext.Provider value={{ commodities: Object.values(commodities) }}>

          <div className="p-2">
            {children}
          </div>

          <CommodityStateContext.Consumer>{({ editCommodity }) => (<>

            {Object.entries(commodities).map(([uid, commodity]) => (
              <div key={uid} className="panel-block columns m-0 p-0">
                <CommodityDescription commodity={commodity} className="column px-2" />
                <div className="buttons">
                  <button type="button" className="button is-small is-white" disabled={loading}
                    onClick={e => {
                      e.preventDefault();
                      editCommodity({ commodity, onSubmit: async changes => updateCommodity(uid, changes) });
                      return false;
                    }}>
                    <span className="icon is-small"><i className="fas fa-pen"></i></span>
                  </button>
                  <button type="button" className="button is-small is-white" disabled={loading}
                    onClick={e => { e.preventDefault(); removeCommodity(uid); return false; }}>
                    <span className="icon is-small"><i className="fas fa-trash"></i></span>
                  </button>
                </div>
              </div>
            ))}

            <div className="panel-block is-justify-content-space-between p-1" style={{ border: 'transparent' }}>
              <button
                type="button"
                className="button is-white is-small has-text-primary"
                onClick={() => editCommodity({
                  onSubmit: async data => updateCommodity(`commodity-${Date.now()}`, data)
                })}>
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>
                <span>Add another item</span>
              </button>
              {pickLineItems &&
                <LineItemSelector
                  onChange={items => setCommodities({ ...commodities, ...toCommodityCollection(items as any) })}
                />
              }
            </div>

          </>)}</CommodityStateContext.Consumer>

        </CommodityCollectionEditorContext.Provider>
      </CommodityEditModalProvider>
    </article>
  );
};

function toCommodityCollection(commodities?: CommodityType[], byIndex: boolean = false): CommodityCollection {
  return (commodities || []).reduce((acc, commodity, index) => {
    const key = byIndex ? index : commodity.id || `commodity-${index}-${Date.now()}`;
    return { ...acc, [key]: commodity };
  }, {});
}

export default CommodityCollectionEditor;
