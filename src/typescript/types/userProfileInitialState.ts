export type userProfileInitialState = {
    loading: boolean,
    error: string | null,
    userProfileInfo: {
        isAuth: boolean,
        userData: userDataType,
    },
}

export type userDataType = {
    firstName: string,
    lastName: string,
    email: string,
    uid: string,
    userExpences: userExpencesType,
    userIncome: number,
}

export type userExpencesType = {
    food: number,
    home: number,
    shopping: number,
    car: number,
    leisure: number,
}