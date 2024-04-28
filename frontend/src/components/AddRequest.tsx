import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Dialog, DialogContent, Toaster } from "@/app/styles";
import { toggleLoginModal, toggleRequestModal } from "@/app/redux/slices/modalSlice";
import { selectOpenRequest, useAppDispatch, useAppSelector } from "@/app/redux";
import { ButtonLoading } from "@/components/ButtonLoading";
import { UseFormReturn, useForm } from "react-hook-form";
import AddRequestForm from "@/components/AddRequestForm";
import { IAddRequest } from "@/types/request.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddRequestSchema } from "@/utils/schema";
import { useAddRequestMutation } from "@/api";
import { toast } from "sonner";

const AddRequest = () => {
   const form: UseFormReturn<IAddRequest> = useForm<IAddRequest>({
      resolver: zodResolver(AddRequestSchema),
      defaultValues: {
         title: "",
         description: "",
         city: "",
         priority: "",
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
   const buttonLabel = role.includes(2001) ? "Додати пропозицію" : "Додати запит";
   const message = role.includes(2001)
      ? "В увійшли як волонтер та можете додати пропозицію про допомогу іншим"
      : "Ви увійшли як потребуючий та можете додати запит за допомогою";

   async function onSubmit(data: IAddRequest) {
      console.log("submit");

      try {
         await addRequest(data).unwrap();
         toast("Успішно опубліковано");
         dispatch(toggleRequestModal());
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
         <Button onClick={onAddClick}>{buttonLabel}</Button>
         <DialogContent className="sm:max-w-[500px] flex flex-col p-0">
            <Card className="bg-background">
               <CardHeader>
                  <CardTitle>{buttonLabel}</CardTitle>
                  <CardDescription>{message}</CardDescription>
               </CardHeader>
               <CardContent>
                  <AddRequestForm form={form} onSubmit={onSubmit} />
               </CardContent>
               <CardFooter className="grid">
                  {isLoading ? (
                     <ButtonLoading />
                  ) : (
                     <Button onClick={() => onSubmit(form.getValues())} className="w-full">
                        Опублікувати
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
