import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataDlx,
  deleteDataDlx,
  updateDataDlx,
} from "../../redux/slices/dlxSlice";
import { toast } from "react-toastify";

import uuid from "react-uuid";

import { trimText } from "../../utils/valid";
import Loading from "../loading";
import { Box, Modal, Button, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "1px solid secondary",
  boxShadow: 24,
  px: 2,
  overflow: "scroll",
  minHeight: "50%",
  borderRadius: "15px",
};

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ChildModal = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [dense, setDense] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [secondary, setSecondary] = useState(false);

  const { datadlx } = useSelector((state) => ({ ...state }));

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    datadlx && setLoadingPage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [data, setData] = useState("");
  const [dataInputButton, setDataInputButton] = useState("");

  const { name, label, option, onInputChange } = props;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditData(false);
    setData("");
  };

  const addButtonAction = async (e) => {
    e.preventDefault();

    const trimData = trimText(data);

    if (trimData !== "") {
      let o = option.find((o) => o.value === trimData);

      if (!o) {
        const addNewData = await {
          ...datadlx,
          [name]: [...datadlx[name], { value: trimData, _id: uuid() }],
        };

        await dispatch(setDataDlx(addNewData));
        setData("");
      } else toast.error(label + " " + trimData + " đã tồn tại.");

      setDataInputButton(trimData);
    } else toast.error("Bạn chưa nhập " + label + ".");
  };

  useEffect(() => {
    localStorage.setItem("datadlx", JSON.stringify(datadlx));
  }, [datadlx]);

  const deleteAction = async (data) => {
    const formValue = { ...data, name };

    await dispatch(deleteDataDlx(formValue));
  };

  const [editData, setEditData] = useState(false);

  const editAction = async () => {
    const trimData = trimText(data);

    if (trimData !== "") {
      const formValue = { ...editData, name, label, newValue: trimData };

      let o = option.find((o) => o.value === trimData);

      if (!o) {
        await dispatch(updateDataDlx(formValue));
        setData("");
      } else toast.error(label + " " + trimData + " đã tồn tại.");

      setDataInputButton(trimData);
    } else toast.error("Bạn chưa nhập " + label + ".");

    CancelAction();
  };

  const editClick = async (opt) => {
    setData(opt.value);
    setEditData(opt);
  };

  const CancelAction = async () => {
    setEditData(false);
    setData("");
  };

  return (
    <>
      <TextField
        size="small"
        margin="normal"
        fullWidth
        label={label}
        onClick={handleOpen}
        value={dataInputButton || ""}
        disabled={true}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, maxWidth: 600 }}>
          <Loading loading={loadingPage} />

          <h2 style={{ textAlign: "center" }} id="parent-modal-title">
            {label}
          </h2>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id={name}
                label={label}
                name={name}
                autoComplete={name}
                value={data || ""}
                autoFocus
                onChange={(e) => {
                  e.preventDefault();
                  const { value } = e.target;

                  setData(value);
                }}
              />
            </Box>
            <Box style={{ display: "flex", justifyContent: "space-around" }}>
              {!editData && (
                <Button
                  margin="normal"
                  size="small"
                  variant="contained"
                  sx={{ width: 60 }}
                  onClick={addButtonAction}
                >
                  Thêm
                </Button>
              )}

              {editData && (
                <Button
                  margin="normal"
                  size="small"
                  variant="contained"
                  sx={{ width: 60 }}
                  onClick={editAction}
                >
                  Sửa
                </Button>
              )}

              <Button color="warning" onClick={CancelAction}>
                Cancel
              </Button>
              <Button
                color="error"
                onClick={handleClose}
                style={{
                  color: "red",
                }}
              >
                Đóng
              </Button>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Demo>
                  <List dense={dense}>
                    {option &&
                      option
                        .filter(({ value }) =>
                          value.toLowerCase().includes(data.toLowerCase())
                        )
                        .sort((a, b) => {
                          return a.value.localeCompare(b.value);
                        })
                        .map((opt, i) => (
                          <Fragment key={i}>
                            <ListItem
                              secondaryAction={
                                <>
                                  <Button
                                    size="small"
                                    sx={{ minWidth: "0" }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      editClick(opt);
                                    }}
                                  >
                                    <ModeEditOutlineOutlinedIcon />
                                  </Button>

                                  <Button
                                    sx={{ minWidth: "0" }}
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteAction(opt);
                                    }}
                                  >
                                    <DeleteOutlinedIcon />
                                  </Button>
                                </>
                              }
                            >
                              <ListItemText
                                primary={opt.value}
                                secondary={secondary ? "Secondary text" : null}
                                style={{ cursor: "pointer" }}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  setDataInputButton(opt.value);
                                  setData("");
                                  onInputChange({ name, value: opt._id });
                                  handleClose();
                                }}
                              />
                            </ListItem>
                          </Fragment>
                        ))}
                  </List>
                </Demo>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChildModal;
