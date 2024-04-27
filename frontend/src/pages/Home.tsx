// import { Loader2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/styles/ui/tabs";
import RequestsList from "@/components/RequestsList";

const Home = () => {
   return (
      <section className="container my-5">
         <Tabs defaultValue="requests">
            <TabsList className="grid w-full grid-cols-2 bg-primary text-white">
               <TabsTrigger className="data-[state=active]:bg-background" value="requests">Допомога</TabsTrigger>
               <TabsTrigger value="proposes">Пропозиції</TabsTrigger>
            </TabsList>
            <TabsContent value="requests">
               <RequestsList />
            </TabsContent>
            <TabsContent value="proposes">
               
            </TabsContent>
         </Tabs>
         {/* <Loader2 color="#176B87" className="absolute top-[45%] left-[49%] h-10 w-10 animate-spin" /> */}
      </section>
   );
};

export default Home;
