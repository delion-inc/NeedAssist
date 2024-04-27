import { Button } from "@/app/styles/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/app/styles/ui/dialog"; 
import { toggleInfoModal } from "@/app/redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { selectOpenInfo } from "@/app/redux/selectors";

const InfoModal = () => {
   const dispatch = useAppDispatch();
   const open = useAppSelector(selectOpenInfo);

   return (
      <Dialog open={open} onOpenChange={() => dispatch(toggleInfoModal())}>
         <DialogTrigger asChild>
            <Button>Увійти</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[500px] flex flex-col p-0">
            <Card className="bg-background">
               <CardHeader>
                  <CardTitle>Вхід</CardTitle>
                  <CardDescription>Увійдіть на сайт, щоб мати змогу робити запити та допомагати.</CardDescription>
               </CardHeader>
               <CardContent>
                  <p>some text</p>
               </CardContent>
               <CardFooter className="grid">
                  <Button form="login-form" type="submit" className="w-full">
                     Увійти
                  </Button> 
               </CardFooter>
            </Card>
         </DialogContent>
      </Dialog>
   );
};

export default InfoModal;
