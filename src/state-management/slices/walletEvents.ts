import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { FIRESTORE_PATH_NAMES } from "../../util/constants/firestorePathNames";
import { createWalletEventProps } from "../../typescript/types/createWalletEventProps";
import { WalletEventsState } from "../../typescript/interface/WalletEventState";

const initialState: WalletEventsState = {
    data: [],
    isLoading: false,
    error: null
}

export const fetchWalletEvents = createAsyncThunk(
    'data/fetchWalletEvents',
    async (uid: string) => {
        const userWalletEventsRef = collection(doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid), FIRESTORE_PATH_NAMES.WALLET_EVENTS)
        const queryData = await getDocs(userWalletEventsRef);

        const events: createWalletEventProps[] = queryData.docs.map((doc) => {
            const data = doc.data();
            return data as createWalletEventProps;
        })
        return events;
    }
)

const walletEvents = createSlice({
    name: 'walletEvents',
    initialState,
    reducers: {},
    extraReducers: promise => {
        promise
        .addCase(fetchWalletEvents.pending, state => {
            state.isLoading = true;
        })
        .addCase(fetchWalletEvents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchWalletEvents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
    }
})

export default walletEvents.reducer;