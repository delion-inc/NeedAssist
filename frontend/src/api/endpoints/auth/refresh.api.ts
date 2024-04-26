import authApi from "@/api/authApi";
import { IAuthResponse } from "@/types/auth.interface";

export const refreshSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({ 
      refresh: builder.mutation<void, IAuthResponse>({
         query: () => ({
            url: "/api/user/refresh",
            method: "POST",
         }),
      }),
   }),
});

export const { useRefreshMutation } = refreshSlice;
