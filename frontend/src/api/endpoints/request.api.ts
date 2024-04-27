import api from "@/api/baseApi";
import { IRequest } from "@/types/request.interface";

export const registerSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      getAllRequests: builder.query<IRequest[], void>({
         query: () => "/api/request/get-all-requests",
         // query: () => "/requests",
      }),
      getRequest: builder.query<IRequest, number>({
         query: (id) => `/api/request/get/${id}`,
         // query: (id) => `/requests/${id}`,
      }),
   }),
});

export const { useGetAllRequestsQuery, useGetRequestQuery } = registerSlice;
