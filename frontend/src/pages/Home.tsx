import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/styles";
import ListComponent from "@/components/ListComponent";

const Home = () => {
   return (
      <section className="container my-5">
         <Tabs defaultValue="requests">
            <TabsList className="grid w-full grid-cols-2 bg-primary text-white">
               <TabsTrigger className="data-[state=active]:bg-background" value="requests">
                  Допомога
               </TabsTrigger>
               <TabsTrigger value="proposes">Пропозиції</TabsTrigger>
            </TabsList>
            <TabsContent value="requests">
               <ListComponent type="requests" />
            </TabsContent>
            <TabsContent value="proposes">
               <ListComponent type="proposes" />
            </TabsContent>
         </Tabs>
      </section>
   );
};

export default Home;
