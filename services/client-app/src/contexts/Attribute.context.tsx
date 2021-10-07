import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAttributes, Attribute } from '../services/attribute.service';
import { UserContext } from './User.context';

interface AttributeContextValues {
  attributes: Attribute[];
  addAttribute: (attribute: Attribute) => void;
  editAttribute: (Attribute: Attribute) => void;
  removeAttribute: (attributeId: number) => void;
}

const defaultValue: AttributeContextValues = {
  attributes: [],
  addAttribute: (attribute: Attribute) => {},
  editAttribute: (Attribute: Attribute) => {},
  removeAttribute: (attributeId: number) => Promise.resolve(),
};

export const AttributeContext = createContext(defaultValue);

const AttributeProvider = ({ children }: any) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) fetchAttributes().then((result) => setAttributes(result));
  }, [user]);

  const addAttribute = (attribute: Attribute) => {
    setAttributes([attribute, ...attributes]);
  };

  const editAttribute = (attribute: Attribute) => {
    let existingAttribute = attributes.find((org) => org.id === attribute.id);
    if (existingAttribute) {
      Object.assign(existingAttribute, attribute);
    }
  };

  const removeAttribute = (attributeId: number) => {
    setAttributes(
      attributes.filter((attribute) => attribute.id !== attributeId),
    );
  };

  return (
    <AttributeContext.Provider
      value={{
        attributes,
        addAttribute,
        editAttribute,
        removeAttribute,
      }}
    >
      {children}
    </AttributeContext.Provider>
  );
};

export default AttributeProvider;
