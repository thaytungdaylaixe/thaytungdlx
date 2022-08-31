import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { deleteHv } from "../../redux/slices/hvsSlice";

import Moment from "react-moment";

import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import Loading from "../../components/loading";
import "./SingleHv.css";

const SingleHv = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    dataHvs,
    dataHvs: { hvs },
  } = useSelector((state) => ({ ...state }));

  const [dataHv, setDataHv] = useState({});

  const [loadingPage, setLoadingPage] = useState(true);
  // eslint-disable-next-line
  useEffect(() => {
    setDataHv(
      hvs.filter((hv) => {
        return hv._id === id;
      })[0]
    );
    hvs && setLoadingPage(false);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("dataHvs", JSON.stringify(dataHvs));
    // eslint-disable-next-line
  }, [hvs]);

  console.log(dataHv);

  return (
    <>
      <Loading loading={loadingPage} />
      {dataHv && (
        <Box component="div" className="SingleHv">
          <Box component="div" className="topSingle">
            <Box component="div" className="hovaten">
              {dataHv.hovaten}
            </Box>
          </Box>
          <Box component="div">
            <Box component="div" className="sdt">
              Số điện thoại: {dataHv.sdt}
            </Box>
            <Box component="div" className="sdt">
              Ngày sinh: {dataHv.ngaysinh}
            </Box>
            <Box component="div" className="sdt">
              Số giờ học: {dataHv.sogiohoc}
            </Box>
            <Box component="div" className="sdt">
              Ngày vào khóa: {dataHv.ngayvaokhoa}
            </Box>
            <Box component="div" className="sdt">
              Sân học: {dataHv.sanhoc}
            </Box>
            <Box component="div" className="sdt">
              Nguồn: {dataHv.nguon}
            </Box>
            <Box component="div" className="sdt">
              Trường thi: {dataHv.truongthi}
            </Box>
            <Box component="div" className="sdt">
              Khóa thi: {dataHv.khoathi}
            </Box>
            <Box component="div" className="groupBtn">
              <Button variant="contained">Sửa</Button>
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  await dispatch(deleteHv(dataHv._id));
                  navigate("/hocvien");
                }}
              >
                Xóa
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  navigate("/hocvien");
                }}
              >
                Đóng
              </Button>
            </Box>
            ;
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleHv;
