import { IRegisterCredentials } from "@/types/auth.interface";
import authApi from "@/api/authApi";

export const registerSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation<void, IRegisterCredentials>({
         query: (credentials) => ({
            url: "/register",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useRegisterMutation } = registerSlice;
