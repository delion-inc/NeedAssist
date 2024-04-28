import api from "@/api/baseApi";
import { IAddRequest, IRequest } from "@/types/request.interface";

export const requestSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      getAllRequests: builder.query<IRequest[], void>({
         query: () => "/api/request/get-all-requests",
         // query: () => "/requests",
         providesTags: ['Request'],
      }),
      getRequest: builder.query<IRequest, number>({
         query: (id) => `/api/request/get/${id}`,
         // query: (id) => `/requests/${id}`,
      }),
      addRequest: builder.mutation<void, IAddRequest>({
         query: (credentials) => ({
            url: "/api/request/add",
            // url: "/requests",
            method: "POST",
            body: { ...credentials },
         }),
         invalidatesTags: ["Request"],
      }),
   }),
});

export const { useGetAllRequestsQuery, useGetRequestQuery, useAddRequestMutation } = requestSlice;
