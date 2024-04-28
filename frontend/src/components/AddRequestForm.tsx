import { SubmitHandler, UseFormReturn } from "react-hook-form";
import InputField from "./InputField";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/styles/ui/form";
import { IAddRequest } from "@/types/request.interface";
import { Textarea } from "@/app/styles/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/styles/ui/select";

type LoginFormProps = {
   form: UseFormReturn<IAddRequest>;
   onSubmit: SubmitHandler<IAddRequest>;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, onSubmit }) => {
   return (
      <Form {...form}>
         <form id="request-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Опис</FormLabel>
                              <FormControl>
                                 <Textarea 
                                    className="transition max-h-[250px]"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Мені потрібні ліки для лікування моєї хвороби. Я не можу собі дозволити купити їх через високу вартість."
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     ></FormField>
                  </div>
                  <div>
                     <InputField<IAddRequest> control={form.control} name="city" label="Місто" type="text" placeholder="Львів" />
                  </div>
                  <div>
                     <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Важливість</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Оберіть пріоритетність" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="LOW">Мала важливість</SelectItem>
                                    <SelectItem value="MEDIUM">Помірна важливість</SelectItem>
                                    <SelectItem value="HIGH">Висока важливість</SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
            </div>
         </form>
      </Form>
   );
};

export default LoginForm;
