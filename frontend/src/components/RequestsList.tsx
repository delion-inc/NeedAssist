import { useGetAllRequestsQuery } from "@/api/endpoints/request.api";
import Card from "./Card"; 
import { Loader2 } from "lucide-react";

const RequestsList = () => {
   const {data, isLoading} = useGetAllRequestsQuery();

  return (
   <section className="space-y-3 my-5">
      {isLoading ? ( 
         <Loader2 color="#176B87" className="absolute top-[45%] left-[49%] h-10 w-10 animate-spin" /> 
      ) : (
         data?.map((request) => (
            <Card key={request.id} {...request} />
         )) 
      )}
   </section>
  )
}

export default RequestsList;