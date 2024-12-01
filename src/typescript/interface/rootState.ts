export interface RootState {
    userProfile: {
      loading: boolean;
      error: string | null;
      userProfileInfo: {
        isAuth: boolean;
        userData: {
          firstName: string;
          lastName: string;
          email: string;
          uid: string;
        };
      };
    };
  }
  