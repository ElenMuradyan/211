import { walletEvent } from "./walletEvent";

export type createWalletEventProps = {
    amount: number;
    description: string;
    type: string;
    category?: walletEvent;
    date?: string;
}