import {getData, postData} from "./index";
import {AttributeType, AttributeTypeEnum, Product} from "core/types";

export const getProduct = (productId: number, siteId: number) =>
  getData<Product>(productId + "/" + siteId);

const addEdiAttribute = (
  productId: number,
  siteId: number,
  attribType: AttributeTypeEnum,
  key: string,
  value?: string
) => postData<{
    $id: string;
    key: string;
    type: AttributeType;
    value: string;
  }>("add", {productId, siteId, key, value, attribType});

const EDIAttribute = {getProduct, addEdiAttribute};

export default EDIAttribute;
