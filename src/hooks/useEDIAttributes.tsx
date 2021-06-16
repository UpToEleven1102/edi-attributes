import { useCallback, useEffect, useState } from "react";
import ediApi from "../core/api/EDIAttribute";
import { AttributeTypeEnum, NewEdiAttribute, Product } from "../core/types";
import { AxiosError } from "axios";

function useEDIAttributes(productId: number, siteId: number) {
  const [data, setData] = useState<Product>();
  const [count, setCount] = useState(0);
  const [error, setError] = useState<Error | AxiosError>();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    ediApi.getProduct(productId, siteId).then((res) => {
      setData(res as Product);
      if (error) setError(undefined);
    }).catch(err => {
      setData(undefined);
      setError(err);
    }).finally(() => setLoading(false));
  }, [setData, productId, siteId, error]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const reFetch = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);

  const addEdiAttribute = useCallback(
    async (newLine: NewEdiAttribute) => {
      try {
        if (!loading) setLoading(true);
        const res = await ediApi.addEdiAttribute(
          productId,
          siteId,
          newLine.dynamic
            ? AttributeTypeEnum.dynamic
            : AttributeTypeEnum.static,
          newLine.key,
          newLine.value
        );

        setData(prevState => prevState ? ({
          ...prevState,
          attributes: {
            ...prevState.attributes,
            $values: [
              ...prevState.attributes.$values,
              // newly added ediAttribute
              {
                $id: res.$id,
                productId: productId,
                ediAttributeId: res.key,
                ediAttribute: {
                  key: res.key,
                  value: res.value,
                  type: res.type,
                }
              }
            ]
          }
        }): prevState);
      } catch (error) {
        setError(error);
        return Promise.reject(error);
      } finally {
        if (loading) setLoading(false);
      }
    },
    [ setData, loading, productId, siteId ]
  );

  return {
    product: data,
    data: data?.attributes?.$values,
    reFetch,
    error,
    addEdiAttribute,
    loading,
  };
}

export default useEDIAttributes;
