import { useRegisterMutation } from "@/api";
import { Button } from "@/app/styles/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/styles/ui/dialog";
import { initialState } from "@/utils/reducers/registerInitState";
import { reducer } from "@/utils/reducers/registerReducer";
import { useEffect, useReducer, useRef, useState } from "react";

const Registration = () => {
   const userRef = useRef<HTMLInputElement>(null);
   const errRef = useRef<HTMLInputElement>(null);
   const [agree, setAgree] = useState(false);

   const [state, dispatch] = useReducer(reducer, initialState);

   const [register, { isLoading }] = useRegisterMutation();

   useEffect(() => {
      userRef.current?.focus();
   }, []);

   useEffect(() => {
      dispatch({ type: "SET_NAME", payload: state.name });
   }, [state.name]);

   useEffect(() => {
      dispatch({ type: "SET_PASSWORD", payload: state.password });
      dispatch({ type: "SET_MATCH_PASSWORD", payload: state.matchPassword});
   }, [state.password, state.matchPassword]);

   useEffect(() => {
      dispatch({ type: "SET_ERR_MSG", payload: "" });
   }, [state.name, state.password, state.matchPassword]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         console.log("state", state); 
         await register({ name: state.name, password: state.password }).unwrap();
         dispatch({ type: "SET_SUCCESS", payload: true });
         dispatch({ type: "SET_NAME", payload: "" });
         dispatch({ type: "SET_PASSWORD", payload: "" });
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
         if (!err?.originalStatus) {
            dispatch({ type: "SET_ERR_MSG", payload: "No Server Response" });
         } else if (err.originalStatus === 400) {
            dispatch({ type: "SET_ERR_MSG", payload: "Missing Username or Password" });
         } else if (err.originalStatus === 401) {
            dispatch({ type: "SET_ERR_MSG", payload: "User already exists" });
         } else {
            dispatch({ type: "SET_ERR_MSG", payload: "Registration Failed" });
         }
         errRef.current?.focus();
      }
   };

   
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
