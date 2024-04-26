import { PWD_REGEX, USER_REGEX } from "@/const/RegEx";
import { RegisterReducerState } from "@/types/auth.interface";
import { RegisterActions } from "@/types/registerActions.type";

export const reducer = (state: RegisterReducerState, action: RegisterActions): RegisterReducerState => {
   switch (action.type) {
      case "SET_NAME":
         return { ...state, name: action.payload, validName: USER_REGEX.test(action.payload) };
      case "SET_PASSWORD":
         return { ...state, password: action.payload, validPassword: PWD_REGEX.test(action.payload), validMatch: action.payload === state.matchPassword };
      case "SET_MATCH_PASSWORD":
         return { ...state, matchPassword: action.payload, validMatch: state.password === action.payload };
      case "SET_ERR_MSG":
         return { ...state, errMsg: action.payload };
      case "SET_SUCCESS":
         return { ...state, success: action.payload };
      case "SET_NAME_FOCUS":
         return { ...state, nameFocus: action.payload };
      case "SET_PASSWORD_FOCUS":
         return { ...state, passwordFocus: action.payload };
      case "SET_MATCH_FOCUS":
         return { ...state, matchFocus: action.payload };
      default:
         throw new Error();
   }
};