import { Category } from "./category";
import { Customer } from "./customer";


export type Pet = {
  id: number;
  name: string;
  category_id: Category['id'];
  category: Category;
  customer_id: Customer['id'];
  customer: Customer;
  created_at: string;
  updated_at: string;
};
