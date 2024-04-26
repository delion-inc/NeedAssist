import { createApi  } from "@reduxjs/toolkit/query/react"; 
import { baseQueryWithReAuth } from "@/api/baseQuery"; 

const authApi = createApi({
   baseQuery: baseQueryWithReAuth,
   endpoints: () => ({}),
});

export default authApi;