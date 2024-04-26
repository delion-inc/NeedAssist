import { Button } from "@/app/styles/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/app/styles/ui/dialog";
import { RegisterSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RegistrationForm from "./RegistrationForm";
import { RegisterFormData } from "@/types/auth.interface";
import { useRegisterMutation } from "@/api";
import { ButtonLoading } from "./ButtonLoading";
import { Toaster } from "@/app/styles/ui/sonner";
import { toast } from "sonner"


const Registration = () => {
   const form = useForm<RegisterFormData>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         name: "",
         surname: "",
         email: "",
         phone: "",
         password: "",
         confirmPassword: "",
      },
   });

   const [register, { isLoading }] = useRegisterMutation();

   async function onSubmit(data: z.infer<typeof RegisterSchema>) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...dataToSend } = data;
      try {
         await register(dataToSend).unwrap();
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            toast("Сервер не відповідає( Спробуйте ще раз") 
         } else if (err.originalStatus === 400) {
            toast("Будь ласка, заповніть всі поля")
         } else if (err.originalStatus === 401) {
            toast("Такий користувач вже зареєстрований") 
         } else {
            toast("Виникла помилка( Спробуйте пізніше") 
         }
      }
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button>Зареєструватись</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[500px] flex flex-col p-0">
            <Card className="bg-background">
               <CardHeader>
                  <CardTitle>Реєстрація</CardTitle>
                  <CardDescription>Зареєструйтесь на сайті, щоб мати змогу робити запити та допомагати.</CardDescription>
               </CardHeader>
               <CardContent>
                  <RegistrationForm form={form} onSubmit={onSubmit} />
               </CardContent>
               <CardFooter className="grid">
                  {isLoading ? (
                     <ButtonLoading />
                  ) : (
                     <Button form="register-form" type="submit" className="w-full">
                        Зареєструватись
                     </Button>
                  )}
               </CardFooter>
            </Card>
         </DialogContent>
         <Toaster />
      </Dialog>
   );
};

export default Registration;
