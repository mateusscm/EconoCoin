import { createStore, applyMiddleware, compose } from "redux";
import { Reducers } from "./Reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
// import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, Reducers);

let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
let persistor = persistStore(store);

export { store, persistor };
