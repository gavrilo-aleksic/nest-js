import api from './api';

export const AttributeTypes = ['BOOLEAN', 'NUMBER', 'STRING', 'JSON'] as const;
export type AttributeTypeEnum = typeof AttributeTypes[number];

export type Attribute = {
  id: number;
  organizationId: number;
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
