import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { getDataDlx } from "../../redux/slices/dlxSlice";

// import { toast } from "react-toastify";

import "./AddEditHV.css";

import { Button, Box, Typography } from "@mui/material";

import Loading from "../loading";
import Input from "../form/Input";
import Select from "../form/Select";
import { Validate } from "../../utils/valid";
import DateTimeMui from "../form/DateTimeMui";

import ChildModal from "./ChildModal";

const AddEdit = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { datadlx } = useSelector((state) => ({ ...state }));

  const { sanhoc, nguon, truongthi, khoathi } = datadlx;

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    datadlx && setLoadingPage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const ValidateForm = await Validate(formValue);

    console.log(formValue);

    // if (Object.keys(ValidateForm).length > 0) {
    //   return setErrors(ValidateForm);
    // }

    // await dispatch(createData({ formValue, navigate, toast }));
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
        setErrors({ ...errors, [name]: "Mật khẩu không khớp." });
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
      label: "Số điện thoại",
      type: "text",
      size: "small",
      autoFocus: true,
    },
    {
      id: "hovaten",
      label: "Họ và tên",
      type: "text",
      size: "small",
    },
    {
      id: "ngaysinh",
      size: "small",
      label: "Ngày sinh",
      type: "DateTime",
      required: true,
    },
    {
      id: "sogiohoc",
      label: "Số giờ học",
      type: "text",
      size: "small",
    },
    {
      id: "ngayvaokhoa",
      size: "small",
      label: "Ngày vào khóa",
      type: "DateTime",
    },

    {
      id: "sanhoc",
      label: "Sân học",
      option: sanhoc,
      type: "modal",
    },

    { id: "nguon", label: "Nguồn", option: nguon, type: "modal" },
    {
      id: "truongthi",
      label: "Trường thi",
      option: truongthi,
      type: "modal",
    },
    { id: "khoathi", label: "Khóa thi", option: khoathi, type: "modal" },
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
          Thêm học viên
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {inputForm.map((ip, i) => (
            <Fragment key={i}>
              {ip.type === "select" && (
                <Select
                  name={ip.id}
                  label="Bạn là ..."
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
              Thêm
            </Button>
            <Button
              onClick={() => {
                navigate("/hocvien");
              }}
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Đóng
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEdit;
