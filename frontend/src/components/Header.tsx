import { Button } from "@/app/styles/ui/button";
import Registration from "./Registration";
import Login from "./Login";
import { useAppSelector } from "@/app/redux/store";
import { selectCurrentToken } from "@/app/redux/selectors";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "@/api";

const Header = () => {
   const auth = useAppSelector(selectCurrentToken);
   const [logout] = useLogoutMutation();

   async function onExit() {
      try {
         await logout().unwrap();
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <header className="h-[100px] flex items-center justify-between container mx-auto xl:px-1">
         <div>
            <img className="w-[250px]" src="/logo.svg" alt="NeedAssist" />
         </div>
         <nav>
            <ul className="flex gap-x-5">
               <li>
                  <Button className="text-primary" variant="outline">
                     Створити запит
                  </Button>
               </li>
               {!auth ? (
                  <>
                     <li>
                        <Registration />
                     </li>
                     <li>
                        <Login />
                     </li>
                  </>
               ) : (
                  <Button onClick={onExit} variant="default" size="icon">
                     <LogOut />
                  </Button>
               )}
            </ul>
         </nav>
      </header>
   );
};

export default Header;
