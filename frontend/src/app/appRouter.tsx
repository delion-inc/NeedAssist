import { Route, Routes } from "react-router-dom";
import Layout from "@/app/appLayout";
import Home from "@/pages/Home";
import PersistLogin from "@/utils/auth/PersistLogin";

const AppRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route element={<PersistLogin />}>
               <Route path="/" element={<Home />} />
               {/* Protected routes */}
            </Route>
            {/* Missing page */}
            <Route path="*" element={<Home />} />
         </Route>
      </Routes>
   );
};

export default AppRouter;
