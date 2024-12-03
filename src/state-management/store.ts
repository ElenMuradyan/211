import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../state-management/slices/userProfile';
import walletEventsReducer from '../state-management/slices/walletEvents';

const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    walletEvents: walletEventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
