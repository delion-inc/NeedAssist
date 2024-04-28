import { Button } from "@/app/styles/ui/button";
import Registration from "./Registration";
import Login from "./Login";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { selectCurrentToken } from "@/app/redux/selectors";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "@/api";
import { setCredentials } from "@/app/redux/slices/authSlice";
import AddRequest from "./AddRequest";

const Header = () => {
   const auth = useAppSelector(selectCurrentToken);
   const [logout] = useLogoutMutation();
   const dispatch = useAppDispatch();

   async function onExit() {
      try {
         await logout().unwrap();
         dispatch(setCredentials({ roles: [], accessToken: null }));
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
                  <AddRequest />
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
