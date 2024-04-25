const Footer = () => {
   return (
      <footer className="bg-primary">
         <div className="h-[100px] flex items-center justify-between container mx-auto xl:px-1">
            <div>
               <img className="w-[150px]" src="/logo-light.svg" alt="NeedAssist" />
            </div>
            <p className="text-background">© Всі права захищено</p>
         </div>
      </footer>
   );
};

export default Footer;
