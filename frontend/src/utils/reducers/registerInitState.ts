import { RegisterReducerState } from "@/types/auth.interface";

export const initialState: RegisterReducerState = {
   name: "",
   validName: false,
   nameFocus: false,
   surname: "",
   validSurname: false,
   surnameFocus: false,
   email: "",
   validEmail: false,
   emailFocus: false,
   phone: "",
   validPhone: false,
   phoneFocus: false,
   password: "",
   validPassword: false,
   passwordFocus: false,
   matchPassword: "",
   validMatch: false,
   matchFocus: false,
   errMsg: "",
   success: false,
};
