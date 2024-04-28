import { Dialog, Card as CardWrapper, CardHeader, CardTitle, CardDescription, CardFooter, DialogTrigger, Button, Badge } from "@/app/styles";
import { toggleLoginModal, selectCurrentToken, useAppSelector, useAppDispatch } from "@/app/redux";
import { PriorityType, User } from "@/types/request.interface";
import convertPriority from "@/utils/convertPriority";
import { ListType } from "@/components/ListComponent";
import InfoModal from "@/components/InfoModal";
import formatDate from "@/utils/formatDate";
import { useState } from "react";

interface CardProps {
   id: number;
   title: string;
   description: string;
   priority: PriorityType;
   createdAt: string;
   city: string;
   user: User;
   type: ListType;
}

const Card = ({ title, description, id, createdAt, city, user, priority, type }: CardProps) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const auth = useAppSelector(selectCurrentToken);
   const dispatch = useAppDispatch();

   function onHelpClick() {
      if (!auth) {
         dispatch(toggleLoginModal());
      } else {
         setIsModalOpen(true);
      }
   }

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
                     <Button onClick={onHelpClick}>{type === "requests" ? "Допомогти" : "Відгукнутись"}</Button>
                  </DialogTrigger>
                  {isModalOpen && <InfoModal id={id} />}
                  <p className="text-muted-foreground">{formatDate(createdAt)}</p>
               </CardFooter>
            </CardWrapper>
         </Dialog>
      </>
   );
};

export default Card;
