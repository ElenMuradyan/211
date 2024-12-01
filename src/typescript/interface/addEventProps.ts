import { walletEvent } from "../types/walletEvent";

export interface addEventProps {
    title: walletEvent,
    isOpen: boolean,
    onClose: () => void,
}