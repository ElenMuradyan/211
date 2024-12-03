import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../state-management/slices/userProfile';
import walletEventsReducer from '../state-management/slices/walletEvents';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  walletEvents: walletEventsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
