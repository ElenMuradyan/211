import { onAuthStateChanged } from "firebase/auth";
import { userDataType, userExpencesType, userProfileInitialState } from "../../typescript/types/userProfileInitialState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../util/constants/firestorePathNames";

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
            userExpences: {
                food: 0,
                home: 0,
                shopping: 0,
                car: 0,
                leisure: 0,
            },
            userIncome: 0
        }
    }
}

export const fetchUserProfileInfo = createAsyncThunk<userDataType | null>(
    'data/fetchUserProfileInfo',
    async () => {
        return new Promise<userDataType | null>((resolve, reject) => {
            onAuthStateChanged(auth, async user => {
                if(user) {
                    const { uid } = user;
                    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
                    getDoc(userRef)
                    .then(userData  => {
                        if(userData.exists()){  
                            const data = userData.data() as userDataType;                            
                            resolve(data);
                        }else{
                            resolve(null);
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
        setWalletExpance: (state, action) => {
            const [category, amount]: [keyof userExpencesType, number] = action.payload;            
            state.userProfileInfo.userData.userExpences[category] += amount;
            state.userProfileInfo.userData.userIncome -= amount;
        },
        setWalletIncome: (state, action) => {
            state.userProfileInfo.userData.userIncome += action.payload;
        }
    },
    extraReducers: promise => {
        promise
        .addCase(fetchUserProfileInfo.pending, state => {
            state.loading = true;
        })
        .addCase(fetchUserProfileInfo.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                const userProfile = action.payload as userDataType;
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
                  userExpences: {
                    food: 0,
                    home: 0,
                    shopping: 0,
                    car: 0,
                    leisure: 0,
                },
                userIncome: 0
                },
            }
                state.error = action.payload as string;
            })
    }   
})

export default userProfileSlice.reducer;
export const { setIsAuth, setLoading, setWalletExpance, setWalletIncome } = userProfileSlice.actions;
