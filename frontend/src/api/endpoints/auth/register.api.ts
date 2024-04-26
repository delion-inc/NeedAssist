import { RegisterFormData } from "@/types/auth.interface";
import authApi from "@/api/authApi";

export const registerSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation<void, Partial<RegisterFormData>>({
         query: (credentials) => ({
            url: "/api/user/registration",
            method: "POST",
            body: { ...credentials },
         }),
      }),
   }),
});

export const { useRegisterMutation } = registerSlice;
