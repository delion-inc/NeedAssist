import { Badge } from "@/app/styles/ui/badge";
import { CardDescription, CardFooter, CardHeader, CardTitle, Card as CardWrapper } from "@/app/styles/ui/card";
import { IRequest } from "@/types/request.interface";
import convertPriority from "@/utils/convertPriority";
import formatDate from "@/utils/formatDate";
import { Dialog, DialogTrigger } from "@/app/styles/ui/dialog";
import { Button } from "@/app/styles/ui/button";
import InfoModal from "./InfoModal"; 
import { useState } from "react";

const Card = ({ title, description, id, createdAt, city, user, priority }: IRequest) => { 
   const [isModalOpen, setIsModalOpen] = useState(false);

   return (
      <>
         <Dialog>
            <CardWrapper>
               <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                     <span>{title}</span> <Badge className="font-light">{convertPriority(priority)}</Badge>
                  </CardTitle>
                  <CardDescription className="max-w-[750px]">
                     {description} <br />
                     <span className="text-muted-foreground">
                        {user.name} {user.surname}, {city}
                     </span>
                  </CardDescription>
               </CardHeader>
               <CardFooter className="flex items-center justify-between">
                  <DialogTrigger asChild>
                     <Button onClick={() => setIsModalOpen(true)}>Допомога</Button>
                  </DialogTrigger>
                  {isModalOpen && <InfoModal id={id} />}
                  {/* <Button>Допомогти</Button> */}
                  <p className="text-muted-foreground">{formatDate(createdAt)}</p>
               </CardFooter>
            </CardWrapper>
         </Dialog>
      </>
   );
};

export default Card;
