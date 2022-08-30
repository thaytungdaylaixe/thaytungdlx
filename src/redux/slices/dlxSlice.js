import { createSlice } from "@reduxjs/toolkit";

const dlxSlice = createSlice({
  name: "datadlx",
  initialState: JSON.parse(localStorage.getItem("datadlx")) || {
    sanhoc: [],
    nguon: [],
    truongthi: [],
    khoathi: [],
    error: "",
    loading: false,
  },
  reducers: {
    setDataDlx: (state, action) => {
      return action.payload;
    },

    deleteDataDlx: (state, action) => {
      const { _id, name } = action.payload;

      return {
        ...state,
        [name]: state[name].filter((item) => {
          return item._id !== _id;
        }),
      };
    },

    updateDataDlx: (state, action) => {
      console.log(action.payload);
      const { _id, name, newValue } = action.payload;

      return {
        ...state,
        [name]: state[name].map((item) =>
          item._id === _id ? { ...item, value: newValue } : item
        ),
      };
    },
  },
  extraReducers: {},
});

export const { setDataDlx, deleteDataDlx, updateDataDlx } = dlxSlice.actions;

export default dlxSlice.reducer;
