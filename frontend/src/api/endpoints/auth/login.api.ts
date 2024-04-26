import { IAuthCredentials, IAuthResponse } from "@/types/auth.interface";
import authApi from "@/api/authApi"; 

export const loginSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation<IAuthResponse, IAuthCredentials>({
         query: (credentials) => ({
            // url: "/auth",
            url: "/auth",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useLoginMutation } = loginSlice;
