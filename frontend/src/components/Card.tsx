import { Button } from "@/app/styles/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card as CardWrapper } from "@/app/styles/ui/card";
import { IRequest } from "@/types/request.interface";

const Card = ({title, description, id, createdAt, city, user, priority}: IRequest) => {
   return (
      <CardWrapper key={id}>
         <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
         </CardHeader>
         <CardContent>
            <p>{createdAt}</p>
            <p>{city}</p>
            <p>{user.email}</p>
            <p>{user.name}</p>
            <p>{user.surname}</p>
         </CardContent>
         <CardFooter className="space-between">
            <Button>Допомогти</Button>
            <p>{priority}</p>
         </CardFooter>
      </CardWrapper>
   );
};

export default Card;
