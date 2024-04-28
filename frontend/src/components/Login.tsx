import { selectOpenLogin, setCredentials, toggleLoginModal, toggleRegisterModal, useAppDispatch, useAppSelector } from "@/app/redux";
import { ButtonLoading } from "@/components/ButtonLoading";
import { UseFormReturn, useForm } from "react-hook-form";
import { LoginFormData } from "@/types/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginForm from "@/components/LoginForm";
import { LoginSchema } from "@/utils/schema";
import { useLoginMutation } from "@/api";
import { toast } from "sonner";
import { z } from "zod";
import {
   Button,
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
   Dialog,
   DialogContent,
   DialogTrigger,
   Toaster,
} from "@/app/styles";

const Login = () => {
   const form: UseFormReturn<LoginFormData> = useForm<LoginFormData>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const dispatch = useAppDispatch();
   const open = useAppSelector(selectOpenLogin);

   const [login, { isLoading }] = useLoginMutation();

   async function onSubmit(data: z.infer<typeof LoginSchema>) {
      try {
         const userData = await login(data).unwrap();
         dispatch(setCredentials({ ...userData }));
         dispatch(toggleLoginModal());
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            toast("Сервер не відповідає( Спробуйте ще раз");
         } else if (err.originalStatus === 400) {
            toast("Будь ласка, заповніть всі поля");
         } else if (err.originalStatus === 401) {
            toast("Неправильний логін або пароль");
         } else {
            toast("Виникла помилка( Спробуйте пізніше");
         }
      }
   }

   return (
      <Dialog open={open} onOpenChange={() => dispatch(toggleLoginModal())}>
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
                  <LoginForm form={form} onSubmit={onSubmit} />
               </CardContent>
               <CardFooter className="grid">
                  {isLoading ? (
                     <ButtonLoading />
                  ) : (
                     <Button form="login-form" type="submit" className="w-full">
                        Увійти
                     </Button>
                  )}
                  <Button
                     variant="link"
                     className="mx-auto"
                     onClick={() => {
                        dispatch(toggleLoginModal());
                        dispatch(toggleRegisterModal());
                     }}
                  >
                     Зареєструватись
                  </Button>
               </CardFooter>
            </Card>
         </DialogContent>
         <Toaster />
      </Dialog>
   );
};

export default Login;
