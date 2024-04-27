import authApi from "@/api/authApi";

export const logoutSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      logout: builder.mutation<void, void>({
         query: () => ({
            url: "/api/user/logout",
            method: "POST",
         }),
      }),
   }),
});

export const { useLogoutMutation } = logoutSlice;
