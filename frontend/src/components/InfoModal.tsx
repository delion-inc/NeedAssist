import { useGetRequestQuery } from "@/api/endpoints/request.api";
import { Badge } from "@/app/styles/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { DialogContent } from "@/app/styles/ui/dialog";
import convertPriority from "@/utils/convertPriority";
import formatDate from "@/utils/formatDate";

const InfoModal = ({ id }: { id: number }) => {
   const { data, isLoading } = useGetRequestQuery(id);

   return (
      <DialogContent className="sm:max-w-[500px] flex flex-col p-0">
         {isLoading ? (
            <p className="mx-auto my-[150px] ">Завантаження...</p>
         ) : (
            <Card key={id}>
               <CardHeader >
                  <CardTitle className="flex items-center justify-between">
                     <span>{data?.title}</span>
                  </CardTitle>
                  <CardDescription className="max-w-[750px]">{data?.description}</CardDescription>
               </CardHeader>
               <CardContent>
                  {data?.user.name} {data?.user.surname} <br />
                  Місто: {data?.city} <br />
                  Email: {data?.user.email} <br />
                  Контактний номер телефону: {data?.user.phone}
               </CardContent>
               <CardFooter className="flex items-center justify-between">
                  <p className="text-muted-foreground">{formatDate(data?.createdAt || "")}</p>
                  <Badge className="font-light">{convertPriority(data?.priority || "LOW")}</Badge>
               </CardFooter>
            </Card>
         )}
      </DialogContent>
   );
};

export default InfoModal;
