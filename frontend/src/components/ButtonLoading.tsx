import { Button } from "@/app/styles";
import { Loader2 } from "lucide-react";

export function ButtonLoading() {
   return (
      <Button disabled>
         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
         Будь ласка, зачекайте
      </Button>
   );
}
