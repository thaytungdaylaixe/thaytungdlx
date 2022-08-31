import { createSlice } from "@reduxjs/toolkit";

const hvsSlice = createSlice({
  name: "dataHvs",
  initialState: JSON.parse(localStorage.getItem("dataHvs")) || {
    hvs: [],
    hv_error: "",
    hv_loading: false,
  },
  reducers: {
    addHv: (state, action) => {
      state.hvs = [...state.hvs, action.payload];
    },
    deleteHv: (state, action) => {
      console.log(action.payload);
      state.hvs = state.hvs.filter((data) => data._id !== action.payload);
    },
  },
  extraReducers: {},
});

export const { addHv, deleteHv } = hvsSlice.actions;

export default hvsSlice.reducer;
