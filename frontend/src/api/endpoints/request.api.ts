import api from "@/api/baseApi";
import { IRequest } from "@/types/request.interface";

export const registerSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      getAllRequests: builder.query<IRequest[], void>({
         query: () => "/api/request/get-all-requests",
         // query: () => "/requests",
      }),
   }),
});

export const { useGetAllRequestsQuery } = registerSlice;
