import api from "@/api/baseApi";
import { IRequest } from "@/types/request.interface";

export const registerSlice = api.injectEndpoints({
   endpoints: (builder) => ({
      getAllProposes: builder.query<IRequest[], void>({
         // query: () => "/api/request/get-all-proposes",
         query: () => "/proposes",
      }),
   }),
});

export const { useGetAllProposesQuery } = registerSlice;
