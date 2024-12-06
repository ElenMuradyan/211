import { walletEvent } from "../types/walletEvent";

export interface createWalletEventProps {
    amount: number;
    description: string;
    type: string;
    category?: walletEvent;
    date?: string;
}