import * as z from 'zod'

export const RegisterSchema = z
   .object({
      name: z.string().min(2, {
         message: "Введіть коректне ім'я"
      }).max(15, {
         message: "Введіть коректне ім'я"
      }),
      surname: z.string().min(2, {
         message: "Введіть коректне прізвище"
      }).max(15, {
         message: "Введіть коректне прізвище"
      }),
      email: z.string().email({
         message: "Введіть дійсну адресу електронної пошти"
      }),
      phone: z.string().length(10, {
         message: "Введіть коректний номер телефону"
      }).startsWith("0", {
         message: "Введіть коректний номер телефону"
      }),
      password: z.string().min(6, {
         message: "Пароль має складатись мінімум із 6 символів"
      }),
      confirmPassword: z.string().min(6, {
         message: "Пароль має складатись мінімум із 6 символів" 
      })
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Паролі не співпадають",
      path: ["confirmPassword"],
   });