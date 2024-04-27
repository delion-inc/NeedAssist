import { IAuthResponse, LoginFormData } from "@/types/auth.interface";
import api from "@/api/baseApi";

export const loginSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation<IAuthResponse, LoginFormData>({
         query: (credentials) => ({
            url: "/api/user/authorization",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useLoginMutation } = loginSlice;
