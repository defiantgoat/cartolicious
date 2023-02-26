import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import { Curation, ReduxStateConfigProps } from "../../interfaces";
import { toggleCurationsDialog } from "../../actions";
import {
  Delete,
  EditRounded,
  SaveRounded,
  Visibility,
} from "@material-ui/icons";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";

const CurationItem: React.FC<{ curation: Curation }> = ({ curation }) => {
  const { id, name, style } = curation;
  const [editName, setEditName] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [curationName, setCurationName] = useState(name);
  const { loadCuration, updateCuration, deleteCuration } = useCartoliciousApi();

  const handleLoadCuration = () => {
    loadCuration(`${id}`);
  };

  const handleUpdateCuration = async () => {
    const { status, data, errors } = await updateCuration({
      id,
      name: curationName,
    });
    if (status === 200) {
      console.log("update local state with new curation");
    }
    setEditName(false);
  };

  const handleDeleteCuration = async () => {
    const { status, data, errors } = await deleteCuration({ id });
    console.log(status, data, errors);
    if (status === 200) {
      setDeleted(true);
      console.log("update local state with new curation");
    }
  };

  const handleCurationName = ({ target: { value } }) => {
    setCurationName(value);
  };

  const { token, curations } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  return !deleted ? (
    <ListItem
      key={`curation-${id}`}
      style={{ borderBottom: "1px solid #ccc", display: "flex" }}
    >
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          {editName ? (
            <TextField
              disabled={!editName}
              variant="outlined"
              defaultValue={curationName}
              style={{ flex: 1 }}
              onChange={handleCurationName}
            ></TextField>
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
              <IconButton onClick={handleDeleteCuration}>
                <Delete />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={handleUpdateCuration}>
                <SaveRounded />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </ListItem>
  ) : (
    <ListItem
      key={`curation-${id}`}
      style={{ borderBottom: "1px solid #ccc", display: "flex" }}
    >
      <p>deleted</p>
    </ListItem>
  );
};

const EditCurationsDialog: React.FC = () => {
  const dispatch = useDispatch();

  const open = useSelector(
    (state: ReduxStateConfigProps) => state.curations_dialog_open
  );

  const { curations } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const handleClose = (event: object, reason: string) => {
    dispatch(toggleCurationsDialog());
  };

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
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
      <div style={{ padding: "2rem" }}>
        <List>{createCurationList()}</List>
      </div>
    </Dialog>
  );
};

export default EditCurationsDialog;
