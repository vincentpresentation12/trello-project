import { CardInterface } from "./cardInterface";

export interface ColoneInterface {
  name: string;
  cards?: CardInterface[];
  picture?: string;
  userId?: string;
}
