import authApi from "@/api/authApi";
import { IAuthResponse } from "@/types/auth.interface";

export const refreshSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      refresh: builder.query<IAuthResponse, void>({
         query: () => "/refresh",
      }),
   }),
});

export const { useRefreshQuery } = refreshSlice;
