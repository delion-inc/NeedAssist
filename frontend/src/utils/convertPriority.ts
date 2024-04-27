import { PriorityType } from "@/types/request.interface";

export default function convertPriority(priority: PriorityType): string {
   switch (priority) {
      case "LOW":
         return "Мала важливість";
      case "MEDIUM":
         return "Помірна важливість";
      case "HIGH":
         return "Висока важливість";
      default:
         return "Низька";
   }
}