import { userProfileInitialState } from "../types/userProfileInitialState";
import { WalletEventsState } from "./WalletEventState";

export interface RootState {
    userProfile: userProfileInitialState
    walletEvents: WalletEventsState
}
  