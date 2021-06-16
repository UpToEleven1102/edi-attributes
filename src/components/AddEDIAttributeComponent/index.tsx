import React, { useCallback, useMemo, useState } from "react";
import Modal from "react-modal";
import ReactSwitch from "react-switch";
import "./styles.css";
import { NewEdiAttribute } from "../../core/types";
import CloseIcon from "../../assets/CloseIcon";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    border: "none",
  },
};

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmit: (ediEntry: NewEdiAttribute) => void;
};

const AddEDIAttributeComponent: React.FC<Props> = ({
  isOpen = false,
  onCloseModal,
  onSubmit,
}) => {
  const [ediState, setEdiState] = useState<NewEdiAttribute>({
    key: "",
    value: "",
  } as NewEdiAttribute);

  const disabled = useMemo(
    () =>
      !(ediState?.key?.length! > 0 && ediState?.value?.length! > 0) &&
      !(ediState?.dynamic && ediState?.key?.length! > 0),
    [ediState]
  );

  const onInputChange = useCallback(
    ({ target: { name, value } }) =>
      ediState
        ? setEdiState({ ...ediState, [name as string]: value as string })
        : setEdiState({ [name as "key" | "value"]: value } as NewEdiAttribute),
    [ediState, setEdiState]
  );

  const onDynamicSwitchChange = useCallback(
    (value) => {
      if (ediState) {
        setEdiState({ ...ediState, value: "", dynamic: value });
      } else {
        setEdiState({ dynamic: value } as NewEdiAttribute);
      }
    },
    [ediState, setEdiState]
  );

  const resetState = useCallback(() => {
    setEdiState({
      key: "",
      value: "",
    } as NewEdiAttribute);
  }, []);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      style={customStyles}
      onAfterClose={resetState}
    >
      <div className={"add-edi-attribute-component-root"}>
        <div className={"main-header"}>
          <h1>Create/Edit EDI Attribute</h1>
          <button className={"clear-button"} onClick={onCloseModal}>
            <CloseIcon fill={"#f4510b"} size={14} />
          </button>
        </div>
        <div className={"main-content"}>
          <div className={"input-control"}>
            <label htmlFor="key">Key</label>
            <input
              type="text"
              name={"key"}
              value={ediState?.key}
              placeholder={"Enter Key Value"}
              onChange={onInputChange}
            />
          </div>
          <div className={"input-switch"}>
            <ReactSwitch
              checked={!!ediState?.dynamic}
              checkedIcon={false}
              height={24}
              width={48}
              uncheckedIcon={false}
              onChange={onDynamicSwitchChange}
            />
            Dynamic {ediState?.dynamic ? "On" : "Off"}
          </div>
          <div className={"input-control"}>
            <label htmlFor="value">Value</label>
            <input
              disabled={!!ediState?.dynamic}
              type="text"
              name={"value"}
              value={ediState?.value}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className={"action-buttons"}>
          <button className={"cancel-button"} onClick={onCloseModal}>
            Cancel
          </button>
          <button
            className={`submit-button`}
            disabled={disabled}
            onClick={() => onSubmit(ediState!)}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEDIAttributeComponent;
