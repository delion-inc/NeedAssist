import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { RootState, useAppDispatch } from "@/app/redux/store";
import { toggleLoginModal } from "@/app/redux/slices/modalSlice";

const RequireAuth: FC<{ allowedRoles: number[] }> = ({ allowedRoles }) => {
   const auth = useSelector((state: RootState) => state.auth);
   console.log(auth?.roles?.find((role) => allowedRoles?.includes(role)));

   const location = useLocation();
   const dispatch = useAppDispatch();

   return (
      <>
         {!auth.accessToken ? (
            dispatch(toggleLoginModal())
         ) : !auth.roles ? (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
         ) : auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
            <Outlet />
         ) : auth?.accessToken ? (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
         ) : (
            dispatch(toggleLoginModal())
         )}
      </>
   );
};

export default RequireAuth;
