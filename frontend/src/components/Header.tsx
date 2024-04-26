import { Button } from "@/app/styles/ui/button";
import Registration from "./Registration"; 
import { useDispatch } from "react-redux";
import { toggleRegisterModal } from "@/app/redux/slices/modalSlice";

const Header = () => { 
   const dispatch = useDispatch();
   
   return (
      <header className="h-[100px] flex items-center justify-between container mx-auto xl:px-1">
         <div>
            <img className="w-[250px]" src="/logo.svg" alt="NeedAssist" />
         </div>
         <nav> 
               <ul className="flex gap-x-5">
                  <li>
                     <Button onClick={() => dispatch(toggleRegisterModal())} className="text-primary" variant="outline">
                        Створити запит
                     </Button>
                  </li>
                  <li>
                     <Registration/>
                  </li>
               </ul> 
         </nav>
      </header>
   );
};

export default Header;
