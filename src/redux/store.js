import { configureStore } from "@reduxjs/toolkit";

import HvReducer from "./slices/hvsSlice";
import DlxReducer from "./slices/dlxSlice";

export default configureStore({
  reducer: {
    dataHvs: HvReducer,
    datadlx: DlxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
