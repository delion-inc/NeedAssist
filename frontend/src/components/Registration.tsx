import { Button } from "@/app/styles/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/styles/ui/dialog";

const Registration = () => {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button>Зареєструватись</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Edit profile</DialogTitle>
               <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <input type="text" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <input type="text" />
               </div>
            </div>
            <DialogFooter>
               <Button type="submit">Save changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default Registration;
