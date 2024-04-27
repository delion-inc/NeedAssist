/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/styles/ui/form";
import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import InputField from "./InputField";
import { RegisterFormData } from "@/types/auth.interface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/styles/ui/select";

type RegistrationFormProps = {
   form: UseFormReturn<RegisterFormData>;
   onSubmit: SubmitHandler<RegisterFormData>;
};

const RegistrationForm: FC<RegistrationFormProps> = ({ form, onSubmit }) => (
   <Form {...form}>
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
         <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
               <div className="flex justify-between items-center gap-x-3">
                  <div className="w-full">
                     <InputField control={form.control} name="name" label="Ім'я" type="text" placeholder="Введіть ваше ім'я" />
                  </div>
                  <div className="w-full">
                     <InputField control={form.control} name="surname" label="Прізвище" type="text" placeholder="Введіть ваше прізвище" />
                  </div>
               </div>
               <div>
                  <InputField control={form.control} name="email" label="Email" type="text" placeholder="Введіть адресу електронної пошти" />
               </div>
               <div>
                  <InputField
                     control={form.control}
                     name="phone"
                     label="Номер телефону"
                     type="text"
                     placeholder="Введіть Ваш номер мобільного телефону (0XX-XXX-XX-XX)"
                  />
               </div>
               <div>
                  <InputField control={form.control} name="password" label="Пароль" type="password" placeholder="Введіть пароль для входу в акаунт" />
               </div>
               <div>
                  <InputField control={form.control} name="confirmPassword" label="Підтвердити пароль" type="password" placeholder="Введіть пароль" />
               </div>
               <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Роль</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                           <FormControl>
                              <SelectTrigger>
                                 <SelectValue placeholder="Будь ласка, оберіть вашу роль." />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              <SelectItem value="2001">Волонтер</SelectItem>
                              <SelectItem value="5320">Потребуючий</SelectItem>
                           </SelectContent>
                        </Select> 
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
         </div>
      </form>
   </Form>
);

export default RegistrationForm;
