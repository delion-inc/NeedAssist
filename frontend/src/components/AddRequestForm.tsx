import { SubmitHandler, UseFormReturn } from "react-hook-form";
import InputField from "./InputField";
import { Form } from "@/app/styles/ui/form";
import { IAddRequest } from "@/types/request.interface";

type LoginFormProps = {
   form: UseFormReturn<IAddRequest>;
   onSubmit: SubmitHandler<IAddRequest>;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, onSubmit }) => {
   return (
      <Form {...form}>
         <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
               <div className="flex flex-col space-y-1.5">
                  <div>
                     <InputField<IAddRequest>
                        control={form.control}
                        name="title"
                        label="Заголовок"
                        type="text"
                        placeholder="Допомога з медикаментами"
                     />
                  </div>
                  <div>
                     <InputField<IAddRequest> control={form.control} name="city" label="Місто" type="password" placeholder="Львів" />
                  </div>
               </div>
            </div>
         </form>
      </Form>
   );
};

export default LoginForm;
