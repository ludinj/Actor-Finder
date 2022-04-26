import { configureStore } from "@reduxjs/toolkit";
import actorSlice from "./actorSlice";

export default configureStore({
  reducer: {
    actor: actorSlice,
  },
});
