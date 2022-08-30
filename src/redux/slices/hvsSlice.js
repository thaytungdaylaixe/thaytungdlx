import { createSlice } from "@reduxjs/toolkit";

const hvsSlice = createSlice({
  name: "hvs",
  initialState: {
    hvs: [],
    hv_error: "",
    hv_loading: false,
  },
  reducers: {
    setDataHv: (state, action) => {
      if (JSON.parse(localStorage.getItem("hvs")))
        state.hvs = JSON.parse(localStorage.getItem("hvs"));
    },
    addHv: (state, action) => {
      state.hvs = [...state.hvs, action.payload.data];
    },
    deleteHv: (state, action) => {
      console.log(action.payload);
      state.hvs = state.hvs.filter((data) => data._id !== action.payload._id);
    },
  },
  extraReducers: {},
});

export const { setDataHv, addHv, deleteHv } = hvsSlice.actions;

export default hvsSlice.reducer;
