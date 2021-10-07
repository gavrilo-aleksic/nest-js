import api from './api';

export const AttributeTypes = ['BOOLEAN', 'NUMBER', 'STRING', 'JSON'] as const;
export type AttributeTypeEnum = typeof AttributeTypes[number];

export type Attribute = {
  id: number;
  name: string;
  type?: AttributeTypeEnum;
  required?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const fetchAttributes = () => {
  return api.getAttributes().then((res) =>
    res.map((attribute: Attribute) => ({
      id: attribute.id,
      name: attribute.name,
      createdAt: new Date(attribute.createdAt),
      updatedAt: new Date(attribute.updatedAt),
      required: Boolean(attribute.required),
      type: attribute.type,
    })),
  );
};

export const createAttribute = (attribute: Partial<Attribute>) => {
  return api.createAttribute(attribute).then((res) => {
    const mappedAttribute: Attribute = {
      id: res.id,
      name: res.name,
      required: res.required,
      type: res.type,
      createdAt: new Date(res.createdAt),
      updatedAt: new Date(res.updatedAt),
    };
    return mappedAttribute;
  });
};

export const updateAttribute = (attribute: Partial<Attribute>) => {
  return api.updateAttribute(attribute).then((res) => {
    const mappedAttribute: Attribute = {
      id: res.id,
      name: res.name,
      required: res.required,
      type: res.type,
      createdAt: new Date(res.createdAt),
      updatedAt: new Date(res.updatedAt),
    };
    return mappedAttribute;
  });
};

export const deleteAttribute = (attributeId: number) => {
  return api.deleteAttribute(attributeId);
};
