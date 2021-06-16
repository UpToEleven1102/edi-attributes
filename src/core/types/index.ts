export type AttributeType = "Static" | "Dynamic";

export enum AttributeTypeEnum {
  // eslint-disable-next-line no-unused-vars
  static,
  // eslint-disable-next-line no-unused-vars
  dynamic,
}

export type EdiAttribute = {
  value?: string;
  key: string;
  type: AttributeType;
};

export type Attribute = {
  ediAttributeId: string;
  productId: number;
  ediAttribute: EdiAttribute;
};

export type Product = {
  id: number;
  siteId: number;
  attributes: { $id: string; $values: Attribute[] };
};

export type NewEdiAttribute = {
  id: number;
  key: string;
  value?: string;
  dynamic: boolean;
};
