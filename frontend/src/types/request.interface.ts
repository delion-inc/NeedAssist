
export interface IRequest {
   id: number;
   title: string;
   description: string;
   priority: PriorityType;
   createdAt: string;
   city: string;
   user: User;
}

export type PriorityType = "LOW" | "MEDIUM" | "HIGH";

interface User {
   name: string;
   surname: string;
   email: string;
   phone: string;
} 

export interface IAddRequest {
   title: string;
   description: string;
   city: string;
   priority: PriorityType;
}