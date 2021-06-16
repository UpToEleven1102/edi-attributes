import React, {useCallback, useState} from "react";
import Loader from "react-loader-spinner";
import AddEDIAttributeComponent from "components/AddEDIAttributeComponent";
import useEDIAttributes from "hooks/useEDIAttributes";
import {RouteProps} from "react-router-dom";
import "./styles.css";
import * as queryString from "querystring";
import {NewEdiAttribute} from "core/types";

const MainContainer: React.FC<RouteProps> = ({location}) => {
  const [success, setSuccess] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [state, setState] = useState<{
    productId: number | null;
    siteId: number | null;
  }>({
    productId: null,
    siteId: null,
  });

  const {data, addEdiAttribute, error, loading} = useEDIAttributes(
    Number(queryString.parse(location?.search.replace("?", "")!).productId),
    Number(queryString.parse(location?.search.replace("?", "")!).siteId)
  );

  React.useEffect(() => {
    setErrorMessage(error?.message);
  }, [error]);

  React.useEffect(() => {
    const querySts = queryString.parse(location?.search.replace("?", "")!);
    setState({
      productId: Number(querySts.productId),
      siteId: Number(querySts.siteId),
    });
  }, [location?.search]);

  const onAddNewLine = useCallback(
    () => setOpenAddModal(true),
    [setOpenAddModal]
  );

  const onCancelAddNewLine = useCallback(
    () => setOpenAddModal(false),
    [setOpenAddModal]
  );

  React.useEffect(() => {
    if (errorMessage)
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 3000);
    if (success)
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
  }, [errorMessage, success]);

  const onSubmitNewLine = useCallback(
    async (newLine: NewEdiAttribute) => {
      if (!state.productId || !state.siteId) {
        setOpenAddModal(false);

        return setErrorMessage(
          "Missing productId or siteId in the query string params"
        );
      }
      setOpenAddModal(false);
      await addEdiAttribute(newLine);
      setSuccess(true);
    },
    [addEdiAttribute, state, setErrorMessage]
  );

  return (
    <div id={"main-container"}>
      <div id={"tab-bar"}>
        <p>EDI Attributes</p>
      </div>
      <div id={"main-content"}>
        <div className={"action-bar"}>
          {loading && (
            <div className={"message-container"}>
              <Loader
                type='TailSpin'
                color='rgb(245, 76, 10)'
                height={20}
                width={20}
              />
            </div>
          )}
          {!loading && success ? (
            <span className={"success-message"}>Success</span>
          ) : (
            errorMessage && (
              <span className={"error-message"}>{errorMessage}</span>
            )
          )}
        </div>
        <hr/>
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Key</th>
            <th>Value</th>
            <th>Dynamic</th>
          </tr>
          </thead>
          <tbody>
          {data?.map((edi, idx) => (
            <tr key={edi.ediAttributeId}>
              <td>{idx + 1}</td>
              <td>{edi.ediAttribute.key}</td>
              <td>{edi.ediAttribute.value}</td>
              <td>{edi.ediAttribute.type === "Dynamic" ? "Yes" : "No"}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div id={"bottom-row"}>
          <button onClick={onAddNewLine}>+ Add a New Line</button>
        </div>
      </div>
      <AddEDIAttributeComponent
        isOpen={openAddModal}
        onCloseModal={onCancelAddNewLine}
        onSubmit={onSubmitNewLine}
      />
    </div>
  );
};

export default MainContainer;
