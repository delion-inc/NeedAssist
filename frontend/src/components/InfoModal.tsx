import { useGetRequestQuery } from "@/api/endpoints/request.api";
import { Badge } from "@/app/styles/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { DialogContent } from "@/app/styles/ui/dialog";
import convertPriority from "@/utils/convertPriority";
import formatDate from "@/utils/formatDate";
import { Loader2 } from "lucide-react";

const InfoModal = ({ id }: { id: number }) => {
   const { data, isLoading } = useGetRequestQuery(id);

   return (
      <>
         {isLoading ? (
            <Loader2 color="#176B87" className="absolute top-[45%] left-[49%] h-5 w-5 animate-spin" />
         ) : (
            <DialogContent className="sm:max-w-[500px] flex flex-col p-0">
               <Card key={id}>
                  <CardHeader>
                     <CardTitle className="flex items-center justify-between">
                        <span>{data?.title}</span> <Badge className="font-light">{convertPriority(data?.priority || "LOW")}</Badge>
                     </CardTitle>
                     <CardDescription className="max-w-[750px]">
                        {data?.description} <br />
                        <span className="text-muted-foreground">
                           {data?.user.name} {data?.user.surname}, {data?.city}
                        </span>
                     </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                     {/* <Button>Допомогти</Button> */}
                     <p className="text-muted-foreground">{formatDate(data?.createdAt || "")}</p>
                  </CardFooter>
               </Card>
            </DialogContent>
         )}
      </>
   );
};

export default InfoModal;
