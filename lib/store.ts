import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { EmployeeData } from "./slices/employeeData";
import { employeesApi } from "./api/employeeApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  employee: EmployeeData.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(employeesApi.middleware),
  });
};

setupListeners(makeStore().dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
