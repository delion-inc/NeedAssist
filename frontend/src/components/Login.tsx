import { Button } from "@/app/styles/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/styles/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/app/styles/ui/dialog";
import { LoginFormData } from "@/types/auth.interface";
import { LoginSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import LoginForm from "./LoginForm";
import { toggleLoginModal, toggleRegisterModal } from "@/app/redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { selectOpenLogin } from "@/app/redux/selectors";
import { ButtonLoading } from "./ButtonLoading";
import { useLoginMutation } from "@/api";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/app/styles/ui/sonner";
import { setCredentials } from "@/app/redux/slices/authSlice"; 

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
         // const userData = {accessToken: '1', roles: 2001}
         dispatch(setCredentials({ ...userData })); 
         dispatch(toggleLoginModal());
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            toast("Сервер не відповідає( Спробуйте ще раз");
         } else if (err.originalStatus === 400) {
            toast("Будь ласка, заповніть всі поля");
         } else if (err.originalStatus === 401) {
            toast("Такий користувач вже зареєстрований");
         } else {
            toast("Виникла помилка( Спробуйте пізніше");
         }
      }
   }

   return (
      <Dialog open={open} onOpenChange={() => dispatch(toggleLoginModal())}>
         <DialogTrigger asChild>
            <Button>Допомогти</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[500px] flex flex-col p-0">
            поможи
         </DialogContent>
         <Toaster />
      </Dialog>
   );
};

export default Login;
