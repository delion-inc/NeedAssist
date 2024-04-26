export interface IAuthCredentials {
   email: string;
   password: string;
}

export interface IAuthResponse {
   roles: number[];
   accessToken: string;
}

export interface IRegisterCredentials {
   name: string;
   surname: string;
   email: string;
   password: string;
   phone: string;
}

export interface RegisterReducerState { 
   name: string;
   validName: boolean;
   nameFocus: boolean;
   surname: string;
   validSurname: boolean;
   surnameFocus: boolean;
   email: string;
   validEmail: boolean;
   emailFocus: boolean;
   password: string;
   validPassword: boolean;
   passwordFocus: boolean;
   phone: string;
   validPhone: boolean;
   phoneFocus: boolean;
   matchPassword: string;
   validMatch: boolean;
   matchFocus: boolean;
   errMsg: string;
   success: boolean;
}