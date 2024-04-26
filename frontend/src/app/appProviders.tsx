import { BrowserRouter, Routes } from "react-router-dom";

interface ProvidersProps {
   children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
   return (
      <BrowserRouter>
         <Routes>
            {children}
         </Routes>
      </BrowserRouter>
   );
};

export default Providers;
