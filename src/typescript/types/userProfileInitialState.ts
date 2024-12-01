export type userProfileInitialState = {
    loading: boolean,
    error: string | null,
    userProfileInfo: {
        isAuth: boolean,
        userData: userDataType,
        userExpences: userExpencesType,
        userIncome: number,
    },
}

export type userDataType = {
    firstName: string,
    lastName: string,
    email: string,
    uid: string,
}

export type userExpencesType = {
    food: number,
    home: number,
    shopping: number,
    car: number,
    leisure: number,
}