import api from "@/api/baseApi";
import { IRequest } from "@/types/request.interface";

export const proposeSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      getAllProposes: builder.query<IRequest[], void>({
         query: () => "/api/request/get-all-proposes",
         // query: () => "/proposes",
         providesTags: ['Request'],
      }),
   }),
});

export const { useGetAllProposesQuery } = proposeSlice;
