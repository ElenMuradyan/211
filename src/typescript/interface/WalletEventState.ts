import { createWalletEventProps } from "../types/createWalletEventProps";

export interface WalletEventsState {
    data: createWalletEventProps[]; 
    isLoading: boolean; 
    error: string | null; 
    currency: string
}