import { Route, Routes } from "react-router-dom";
import Layout from "@/app/appLayout";
import Home from "@/pages/Home";

const AppRouter = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            {/* Public routes */}
               <Route path="/" element={<Home />} /> 
               {/* <Route path="register" element={<Registration />} />
               <Route path="login" element={<Login />} />
               <Route path="linkpage" element={<LinkPage />} />
               <Route path="unauthorized" element={<Unauthorized />} /> */}

            {/* <Route element={<PersistLogin />}>
               Protected routes
               <Route element={<RequireAuth allowedRoles={[Role.User]} />}>
                  <Route path="/" element={<Home />} />
               </Route>
               <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
                  <Route path="admin" element={<Admin />} />
               </Route>
               <Route element={<RequireAuth allowedRoles={[Role.Editor]} />}>
                  <Route path="editor" element={<Editor />} />
               </Route>
               <Route element={<RequireAuth allowedRoles={[Role.Admin, Role.Editor]} />}>
                  <Route path="lounge" element={<Lounge />} />
               </Route>
            </Route> */}

            {/* Missing page */}
            {/* <Route path="*" element={<Missing />} /> */}
         </Route>
      </Routes>
   );
}

export default AppRouter;