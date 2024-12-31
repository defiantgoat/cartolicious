import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, List, ListItem } from "@material-ui/core";
import { Curation, ReduxStateConfigProps } from "../../interfaces";
import { toggleCurationsDialog } from "../../actions";
import {
  Delete,
  EditRounded,
  SaveRounded,
  Visibility,
} from "@material-ui/icons";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import { LiciousPanel, LiciousInput, LiciousIconButton } from "@licious/react";
import { CLOSE_CURATIONS_DIALOG } from "../../constants";

const CurationItem: React.FC<{ curation: Curation }> = ({ curation }) => {
  const { _id, name, style } = curation;
  const [editName, setEditName] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [curationName, setCurationName] = useState(name);
  const { loadCuration, updateCuration, deleteCuration } = useCartoliciousApi();

  const handleLoadCuration = () => {
    loadCuration(_id);
  };

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
      console.log("update local state with new curation");
    }
  };

  const handleCurationName = (e: any) => {
    setCurationName(
      e?.target?.shadowRoot?.querySelector("input")?.value || "?"
    );
  };

  const { token, curations } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  return !deleted ? (
    <ListItem
      key={`curation-${_id}`}
      style={{ borderBottom: "1px solid #ccc", display: "flex" }}
    >
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
              <IconButton onClick={handleLoadCuration}>
                <Visibility />
              </IconButton>
              <IconButton onClick={() => setEditName(true)}>
                <EditRounded />
              </IconButton>
              <LiciousIconButton icon="trash" onClick={handleDeleteCuration} />
            </>
          ) : (
            <>
              <LiciousIconButton icon="save" onClick={handleUpdateCuration} />
            </>
          )}
        </div>
      </div>
    </ListItem>
  ) : (
    <ListItem
      key={`curation-${_id}`}
      style={{ borderBottom: "1px solid #ccc", display: "flex" }}
    >
      <p>deleted</p>
    </ListItem>
  );
};

const EditCurationsDialog: React.FC = () => {
  const dispatch = useDispatch();
  const panelRef = useRef<any>(null);

  const open = useSelector(
    (state: ReduxStateConfigProps) => state.curations_dialog_open
  );

  const { curations } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const handleClose = (event: object) => {
    dispatch({ type: CLOSE_CURATIONS_DIALOG });
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
      options.push(
        <CurationItem curation={curation} />
        // <ListItem key={`curation-${i}`} style={{borderBottom: "1px solid #ccc", display:"flex"}}>
        //   <div style={{display: "flex", flex: 1}}>
        //     <div style={{flexGrow: 1, display: "flex", alignItems: "center"}}>
        //       <TextField defaultValue={name} style={{flex: 1}}></TextField>
        //       </div>
        //     <div style={{flexBasis: "33%",display: "flex", justifyContent: "flex-end"}}>
        //       <IconButton><Visibility /></IconButton>
        //       <IconButton><EditAttributes /></IconButton>
        //       <IconButton><Delete /></IconButton>
        //     </div>
        //     </div>
        // </ListItem>
      )
    );

    return options;
  };

  return (
    <LiciousPanel ref={panelRef} open={open} header="Edit Curations">
      <div slot="content">
        <List>{createCurationList()}</List>
      </div>
    </LiciousPanel>
  );
};

export default EditCurationsDialog;
