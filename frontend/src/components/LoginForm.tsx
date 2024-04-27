import { LoginFormData } from "@/types/auth.interface";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import InputField from "./InputField";
import { Form } from "@/app/styles/ui/form";

type LoginFormProps = {
   form: UseFormReturn<LoginFormData>;
   onSubmit: SubmitHandler<LoginFormData>;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, onSubmit }) => {
   return (
      <Form {...form}>
         <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
               <div className="flex flex-col space-y-1.5">
                  <div>
                     <InputField<LoginFormData> control={form.control} name="email" label="Email" type="text" placeholder="Введіть адресу електронної пошти" />
                  </div>
                  <div>
                     <InputField<LoginFormData>
                        control={form.control}
                        name="password"
                        label="Пароль"
                        type="password"
                        placeholder="Введіть пароль для входу в акаунт"
                     />
                  </div>
               </div>
            </div>
         </form>
      </Form>
   );
};

export default LoginForm;
