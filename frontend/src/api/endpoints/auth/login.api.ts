import { IAuthResponse, LoginFormData } from "@/types/auth.interface";
import authApi from "@/api/authApi";

export const loginSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation<IAuthResponse, LoginFormData>({
         query: (credentials) => ({
            // url: "/auth",
            url: "/api/user/authorization",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useLoginMutation } = loginSlice;
