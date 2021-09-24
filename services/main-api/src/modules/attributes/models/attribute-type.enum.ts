export const AttributeTypes = ['BOOLEAN', 'NUMBER', 'STRING', 'JSON'] as const;
export type AttributeTypeEnum = typeof AttributeTypes[number];
