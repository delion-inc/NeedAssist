import { Button } from "@/app/styles/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/styles/ui/dialog"; 
import { toggleInfoModal } from "@/app/redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { selectOpenInfo } from "@/app/redux/selectors";

const InfoModal = () => {
   const dispatch = useAppDispatch();
   const open = useAppSelector(selectOpenInfo);

   return (
      <Dialog open={open} onOpenChange={() => dispatch(toggleInfoModal())}>
         <DialogTrigger asChild>
            <Button>Допомога</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[500px] flex flex-col p-0">
            Поможи
         </DialogContent>
      </Dialog>
   );
};

export default InfoModal;
