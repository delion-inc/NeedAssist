import { Button } from "@/app/styles/ui/button";
import { ButtonLoading } from "./ButtonLoading";
import { Dialog, DialogContent } from "@/app/styles/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddRequestSchema } from "@/utils/schema";
import { IAddRequest } from "@/types/request.interface";
import { useAddRequestMutation } from "@/api/endpoints/request.api";
import { toast } from "sonner";
import AddRequestForm from "./AddRequestForm";
import { Toaster } from "@/app/styles/ui/sonner";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { toggleLoginModal, toggleRequestModal } from "@/app/redux/slices/modalSlice";
import { selectOpenRequest } from "@/app/redux/selectors";

const AddRequest = () => {
   const form: UseFormReturn<IAddRequest> = useForm<IAddRequest>({
      resolver: zodResolver(AddRequestSchema),
      defaultValues: {
         title: "",
         description: "",
         city: "",
         priority: undefined,
      },
   });

   function onAddClick() {
      if (!role.length) {
         dispatch(toggleLoginModal());
      } else {
         dispatch(toggleRequestModal());
      }
   }

   const role = useAppSelector((state) => state.auth.roles);
   const dispatch = useAppDispatch();
   const open = useAppSelector(selectOpenRequest);
   const [addRequest, { isLoading }] = useAddRequestMutation();

   async function onSubmit(data: IAddRequest) {
      try {
         await addRequest(data).unwrap();
         toast("додано");
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            toast("Сервер не відповідає( Спробуйте ще раз");
         } else if (err.originalStatus === 400) {
            toast("Будь ласка, заповніть всі поля");
         } else if (err.originalStatus === 401) {
            toast("Виникла помилка( Спробуйте пізніше");
         } else {
            toast("Виникла помилка( Спробуйте пізніше");
         }
      }
   }

   return (
      <Dialog open={open} onOpenChange={() => dispatch(toggleRequestModal())}>
         <Button onClick={onAddClick}>Додати запит</Button> 
         <DialogContent className="sm:max-w-[500px] flex flex-col p-0">
            <Card className="bg-background">
               <CardHeader>
                  <CardTitle>Додати запит</CardTitle>
                  <CardDescription>Увійдіть на сайт, щоб мати змогу робити запити та допомагати.</CardDescription>
               </CardHeader>
               <CardContent>
                  <AddRequestForm form={form} onSubmit={onSubmit} />
               </CardContent>
               <CardFooter className="grid">
                  {isLoading ? (
                     <ButtonLoading />
                  ) : (
                     <Button form="login-form" type="submit" className="w-full">
                        Увійти
                     </Button>
                  )}
               </CardFooter>
            </Card>
         </DialogContent>
         <Toaster />
      </Dialog>
   );
};

export default AddRequest;
