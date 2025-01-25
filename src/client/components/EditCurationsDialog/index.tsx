import React, { useState, useRef, useEffect, JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Curation } from "../../interfaces";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import {
  LiciousPanel,
  LiciousIconButton,
  LiciousListItem,
} from "@licious/react";
import useUser from "../../hooks/useUser";
import palette from "../../lib/palette";
import { close_curations_dialog } from "../../reducers/rootSlice";
import { remove_curation, add_curation } from "../../reducers/userSlice";

const CurationItem: React.FC<{ curation: Curation }> = ({ curation }) => {
  const dispatch = useDispatch();
  const { _id, name, createdAt } = curation;
  const [editName, setEditName] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [curationName, setCurationName] = useState(name);
  const { loadCuration, updateCuration, deleteCuration, saveDailyCuration } =
    useCartoliciousApi();
  const { userIsOwner } = useUser();
  const itemRef = useRef<any>(null);

  const handleLoadCuration = () => {
    loadCuration(_id);
  };

  useEffect(() => {
    if (itemRef.current) {
      itemRef?.current?.addEventListener("inputChanged", (e: any) =>
        setCurationName(e.detail || "?")
      );
      return itemRef?.current?.removeEventListener("inputChanged", (e: any) =>
        setCurationName(e.detail || "?")
      );
    }
  }, [itemRef.current]);

  const handleUpdateCuration = async () => {
    const { status, data, errors } = await updateCuration({
      _id,
      name: curationName,
    });
    if (status === 200) {
      console.log("update local state with new curation");
    }
    setEditName(false);
  };

  const handleDeleteCuration = async () => {
    const { status, data, errors } = await deleteCuration({ _id });
    console.log(status, data, errors);
    if (status === 200) {
      setDeleted(true);
      dispatch(remove_curation(_id));
      console.log("update local state with new curation");
    }
  };

  const handleSaveDailyCuration = async () => {
    const { status, data, errors } = await saveDailyCuration({ _id });
    console.log(status, data, errors);
    if (status === 200) {
      console.log("update local state with new curation");
    }
  };

  const handleCurationName = (e: any) => {
    setCurationName(
      e?.target?.shadowRoot?.querySelector("input")?.value || "?"
    );
  };

  const handleCancel = () => {
    setEditName(false);
  };
  const { token, curations } = useSelector((state: any) => state.user);

  const subheader = `${new Date(createdAt).toDateString()}`;

  return !deleted ? (
    <div key={`curation-${_id}`} style={{ marginBottom: ".5rem" }}>
      {!editName ? (
        <LiciousListItem
          ref={itemRef}
          header={curationName}
          subheader={subheader}
          mode="display"
        >
          <span slot="display-mode-buttons">
            <LiciousIconButton icon="custom" onClick={handleLoadCuration}>
              <svg
                /*
                  // @ts-ignore */
                slot="custom-icon"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  fill={palette.warm.primary.hex}
                />
              </svg>
            </LiciousIconButton>
            <LiciousIconButton
              icon="edit"
              onClick={() => setEditName(true)}
            ></LiciousIconButton>
          </span>
        </LiciousListItem>
      ) : (
        <LiciousListItem ref={itemRef} value={curationName} mode="edit">
          <span slot="edit-mode-buttons">
            <LiciousIconButton
              icon="save"
              onClick={handleUpdateCuration}
              title="Save"
            ></LiciousIconButton>
            <LiciousIconButton
              icon="trash"
              onClick={handleDeleteCuration}
              title="Delete"
            />

            {userIsOwner ? (
              <LiciousIconButton
                icon="custom"
                onClick={handleSaveDailyCuration}
                title="Set Daily Curation"
              >
                <svg
                  /*
                    // @ts-ignore */
                  slot="custom-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"
                    fill={palette.warm.primary.hex}
                  />
                </svg>
              </LiciousIconButton>
            ) : null}
            <LiciousIconButton
              title="Cancel"
              icon="close"
              onClick={handleCancel}
            ></LiciousIconButton>
          </span>
        </LiciousListItem>
      )}
    </div>
  ) : null;
};

const EditCurationsDialog: React.FC = () => {
  const dispatch = useDispatch();
  const panelRef = useRef<any>(null);
  const [curations, setCurations] = useState([]);

  const open = useSelector((state: any) => state.root.curations_dialog_open);

  const { curations: stateCurations } = useSelector((state: any) => state.user);

  useEffect(() => {
    setCurations(stateCurations);
  }, [stateCurations]);

  const handleClose = (event: object) => {
    dispatch(close_curations_dialog());
  };

  useEffect(() => {
    if (panelRef.current) {
      panelRef?.current?.addEventListener("panelClosed", (e: any) =>
        handleClose(e)
      );
      return panelRef?.current?.removeEventListener("panelClosed", (e: any) =>
        handleClose(e)
      );
    }
  }, [panelRef.current]);

  const createCurationList = (): JSX.Element[] => {
    const options = [] as JSX.Element[];

    curations.forEach((curation, i) =>
      options.push(<CurationItem curation={curation} />)
    );

    return options;
  };

  return (
    <LiciousPanel ref={panelRef} open={open} header="Edit Curations">
      <div slot="content">
        <div>{createCurationList()}</div>
      </div>
    </LiciousPanel>
  );
};

export default EditCurationsDialog;

/*
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          {editName ? (
            <LiciousInput
              value={curationName}
              disabled={!editName}
              onInput={handleCurationName}
            />
          ) : (
            curationName
          )}
        </div>
        <div
          style={{
            flexBasis: "33%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {!editName ? (
            <>
              <LiciousIconButton icon="custom" onClick={handleLoadCuration}>
                <svg
                  /*
                  slot="custom-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                    fill={palette.warm.primary.hex}
                  />
                </svg>
              </LiciousIconButton>
              <LiciousIconButton
                icon="edit"
                onClick={() => setEditName(true)}
              ></LiciousIconButton>
              <LiciousIconButton icon="trash" onClick={handleDeleteCuration} />
              {userIsOwner ? (
                <LiciousIconButton
                  icon="custom"
                  onClick={handleSaveDailyCuration}
                >
                  <svg
                    /*
                    slot="custom-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"
                      fill={palette.warm.primary.hex}
                    />
                  </svg>
                </LiciousIconButton>
              ) : null}
            </>
          ) : (
            <>
              <LiciousIconButton icon="save" onClick={handleUpdateCuration} />
            </>
          )}
        </div>
      </div>
      */
