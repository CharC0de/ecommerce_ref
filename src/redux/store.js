import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./auth";
import { reducer as userAdminReducer } from "./admin/user";
import { reducer as productAdminReducer } from "./admin/product";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userAdmin: userAdminReducer,
    productAdmin: productAdminReducer,
  },
});
