import { Badge } from "@/app/styles/ui/badge";
import { CardDescription, CardFooter, CardHeader, CardTitle, Card as CardWrapper } from "@/app/styles/ui/card";
import { IRequest } from "@/types/request.interface";
import convertPriority from "@/utils/convertPriority";
import formatDate from "@/utils/formatDate";
import { Dialog, DialogContent, DialogTrigger } from "@/app/styles/ui/dialog";
import { Button } from "@/app/styles/ui/button";
// import { toggleInfoModal } from "@/app/redux/slices/modalSlice";
// import { selectOpenInfo } from "@/app/redux/selectors";
// import { useAppDispatch, useAppSelector } from "@/app/redux/store";

const Card = ({ title, description, id, createdAt, city, user, priority }: IRequest) => {
   // const dispatch = useAppDispatch();
   // const open = useAppSelector(selectOpenInfo); 

   return (
      <>
         <Dialog>
            <CardWrapper key={id}>
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
                     <Button>Допомога</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] flex flex-col p-0">Поможи</DialogContent>
                  {/* <Button>Допомогти</Button> */}
                  <p className="text-muted-foreground">{formatDate(createdAt)}</p>
               </CardFooter>
            </CardWrapper>
         </Dialog>
      </>
   );
};

export default Card;
