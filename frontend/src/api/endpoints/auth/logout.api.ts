import authApi from "@/api/authApi";

export const logoutSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      logout: builder.query<void, void>({
         query: () => "/api/user/logout",
      }),
   }),
});

export const { useLogoutQuery } = logoutSlice;
