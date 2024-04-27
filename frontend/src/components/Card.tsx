import { Badge } from "@/app/styles/ui/badge";
import { CardDescription, CardFooter, CardHeader, CardTitle, Card as CardWrapper } from "@/app/styles/ui/card";
import { IRequest } from "@/types/request.interface";
import convertPriority from "@/utils/convertPriority";
import formatDate from "@/utils/formatDate";
import InfoModal from "./InfoModal";

const Card = ({ title, description, id, createdAt, city, user, priority }: IRequest) => {
   return (
      <>
         <CardWrapper key={id}>
            <CardHeader>
               <CardTitle className="flex items-center justify-between"><span>{title}</span> <Badge className="font-light">{convertPriority(priority)}</Badge></CardTitle>
               <CardDescription className="max-w-[750px]">
                  {description} <br />
                  <span className="text-muted-foreground">
                     {user.name} {user.surname}, {city}
                  </span>
               </CardDescription>
            </CardHeader> 
            <CardFooter className="flex items-center justify-between">
               <InfoModal />
               {/* <Button>Допомогти</Button> */}
               <p className="text-muted-foreground">{formatDate(createdAt)}</p>
            </CardFooter>
         </CardWrapper>
      </>
   );
};

export default Card;
