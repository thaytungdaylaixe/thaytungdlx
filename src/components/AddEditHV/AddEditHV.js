import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { trimText } from "../../utils/valid";

import { toast } from "react-toastify";

import "./AddEditHV.css";
import { addHv } from "../../redux/slices/hvsSlice";

import { Button, Box, Typography } from "@mui/material";

import Loading from "../loading";
import Input from "../form/Input";
import Select from "../form/Select";
import { Validate } from "../../utils/valid";
import DateTimeMui from "../form/DateTimeMui";

import ChildModal from "./ChildModal";

const AddEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { datadlx, dataHvs } = useSelector((state) => ({ ...state }));

  const { sanhoc, nguon, truongthi, khoathi } = datadlx;
  const { hvs } = dataHvs;

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    datadlx && setLoadingPage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("dataHvs", JSON.stringify(dataHvs));
  }, [dataHvs]);

  const [formValue, setFormValue] = useState({
    sdt: "",
    hovaten: "",
    ngaysinh: new Date(),
    sogiohoc: "",
    ngayvaokhoa: new Date(),
    sanhoc: "",
    nguon: "",
    truongthi: "",
    khoathi: "",
    thietbi: [],
    thitn: [],
    thish: [],
    ghichu: [],
    hinhanh: [],
    tags: [],
    luong: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoadingPage(true);

    const dataForm = {
      ...formValue,
      _id: uuid(),
      sdt: trimText(formValue.sdt),
      hovaten: trimText(formValue.hovaten),
      sogiohoc: trimText(formValue.sogiohoc),
      ngaysinh: moment(formValue.ngaysinh).format("DD/MM/YYYY"),
      ngayvaokhoa: moment(formValue.ngayvaokhoa).format("DD/MM/YYYY"),
    };

    // : moment(value).format("DD/MM/YYYY")

    const ValidateForm = await Validate(dataForm);

    if (Object.keys(ValidateForm).length > 0) {
      setLoadingPage(false);
      return setErrors(ValidateForm);
    }

    const checkSdt = hvs.filter((hv) => {
      setLoadingPage(false);
      return hv.sdt === dataForm.sdt;
    });

    setLoadingPage(false);

    if (checkSdt.length > 0) {
      setLoadingPage(false);
      return toast.error("S??? ??i???n tho???i ???? t???n t???i.");
    }

    await dispatch(addHv(dataForm));
    setLoadingPage(false);
    navigate("/hocvien");
  };

  const [errors, setErrors] = useState({});

  const inputChange = async (data) => {
    const name = data.name.toString();
    const value = data.value.toString();

    var object = {};
    object[name] = value;

    const ValidateForm = await Validate(object);

    if (Object.keys(ValidateForm).length > 0) {
      setErrors({ ...errors, [name]: ValidateForm[name] });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    if (name === "cf_password") {
      if (formValue.password !== value) {
        setErrors({ ...errors, [name]: "M???t kh???u kh??ng kh???p." });
      }
    }

    if (name === "sdt") {
      const checkSdt = hvs.filter((hv) => {
        return hv.sdt === trimText(value);
      });
      if (checkSdt.length > 0) {
        setErrors({ ...errors, [name]: "S??? ??i???n tho???i ???? t???n t???i." });
      }
    }

    setFormValue({ ...formValue, [name]: value });
  };

  const inputDateChange = ({ name, value }) => {
    setFormValue({ ...formValue, [name]: value });
  };

  const inputForm = [
    {
      id: "sdt",
      label: "S??? ??i???n tho???i",
      type: "text",
      size: "small",
      autoFocus: true,
    },
    {
      id: "hovaten",
      label: "H??? v?? t??n",
      type: "text",
      size: "small",
    },
    {
      id: "ngaysinh",
      size: "small",
      label: "Ng??y sinh",
      type: "DateTime",
      required: true,
    },
    {
      id: "sogiohoc",
      label: "S??? gi??? h???c",
      type: "text",
      size: "small",
    },
    {
      id: "ngayvaokhoa",
      size: "small",
      label: "Ng??y v??o kh??a",
      type: "DateTime",
    },

    {
      id: "sanhoc",
      label: "S??n h???c",
      option: sanhoc,
      type: "modal",
    },

    { id: "nguon", label: "Ngu???n", option: nguon, type: "modal" },
    {
      id: "truongthi",
      label: "Tr?????ng thi",
      option: truongthi,
      type: "modal",
    },
    { id: "khoathi", label: "Kh??a thi", option: khoathi, type: "modal" },
  ];

  return (
    <Box component="main">
      <Loading loading={loadingPage} />

      <Box
        className=""
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Th??m h???c vi??n
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {inputForm.map((ip, i) => (
            <Fragment key={i}>
              {ip.type === "select" && (
                <Select
                  name={ip.id}
                  label="B???n l?? ..."
                  error={errors[ip.id] && errors[ip.id]}
                  inputChange={inputChange}
                />
              )}

              {ip.type === "DateTime" && (
                <DateTimeMui
                  name={ip.id}
                  label={ip.label}
                  error={null}
                  disabled={false}
                  required={ip.required}
                  valueChange={formValue[ip.id] || new Date()}
                  onInputChange={inputDateChange}
                />
              )}

              {(ip.type === "text" || ip.type === "password") && (
                <Input
                  error={errors[ip.id] && errors[ip.id]}
                  name={ip.id}
                  value={formValue[ip.id]}
                  label={ip.label}
                  type={ip.type}
                  size={ip.size}
                  autoFocus={ip.autoFocus}
                  inputChange={inputChange}
                />
              )}
              {ip.type === "modal" && (
                <ChildModal
                  name={ip.id}
                  label={ip.label}
                  option={ip.option}
                  onInputChange={inputChange}
                />
              )}
            </Fragment>
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Th??m
            </Button>
            <Button
              onClick={() => {
                navigate("/hocvien");
              }}
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              ????ng
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEdit;
