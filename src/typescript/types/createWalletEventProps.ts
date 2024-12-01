import { walletEvent } from "./walletEvent";

export type createWalletEventProps = {
    amount: number;
    description: string;
    category?: walletEvent;
}