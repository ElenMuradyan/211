import { onAuthStateChanged } from "firebase/auth";
import { userDataType, userProfileInitialState } from "../../typescript/types/userProfileInitialState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../util/constants/firestorePathNames";
import { DocumentSnapshot } from "firebase/firestore";

const initialState: userProfileInitialState = {
    loading: true,
    error: null,
    userProfileInfo: {
        isAuth: false,
        userData: {
            firstName: '',
            lastName: '',
            email: '',
            uid: '',
        }
    }
}

export const fetchUserProfileInfo = createAsyncThunk<DocumentSnapshot | null>(
    'data/fetchUserProfileInfo',
    async () => {
        return new Promise<DocumentSnapshot | null>((resolve, reject) => {
            onAuthStateChanged(auth, async user => {
                if(user) {
                    const { uid } = user;
                    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
                    getDoc(userRef)
                    .then(userData  => {
                        if(userData.exists()){
                            resolve(userData);
                        }else{
                            resolve(null)
                        }
                    })
                }else{
                    reject('Something is wrong');
                }
            })
        })
    }
)

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.userProfileInfo.isAuth = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: promise => {
        promise
        .addCase(fetchUserProfileInfo.pending, state => {
            state.loading = true;
        })
        .addCase(fetchUserProfileInfo.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                const userProfile = action.payload.data() as userDataType;
                state.userProfileInfo = {
                    isAuth: true,
                    userData: userProfile,
                }     
        }})
        .addCase(fetchUserProfileInfo.rejected, (state, action) => {
            state.loading = false;
            state.userProfileInfo = {
                isAuth: false,
                userData: {
                  firstName: '',
                  lastName: '',
                  email: '',
                  uid: '',
                }}
                state.error = action.payload as string;
            })
    }   
})

export default userProfileSlice.reducer;
export const { setIsAuth, setLoading } = userProfileSlice.actions;