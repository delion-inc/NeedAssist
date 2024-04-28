import { useGetAllRequestsQuery, useGetAllProposesQuery } from "@/api";
import { Loader2 } from "lucide-react";
import Card from "@/components/Card";

export type ListType = "requests" | "proposes";

interface ListComponentProps {
   type: ListType;
}

const ListComponent: React.FC<ListComponentProps> = ({ type }) => {
   const requestsQuery = useGetAllRequestsQuery();
   const proposesQuery = useGetAllProposesQuery();

   const { data, isLoading } = type === "requests" ? requestsQuery : proposesQuery;

   return (
      <section className="space-y-3 my-5">
         {isLoading ? (
            <Loader2 color="#176B87" className="absolute top-[45%] left-[49%] h-10 w-10 animate-spin" />
         ) : (
            data
               ?.slice()
               .reverse()
               .map((item) => <Card key={item.id} {...item} type={type} />)
         )}
      </section>
   );
};

export default ListComponent;
