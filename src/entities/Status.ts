import { Story } from "./Story";

export type Status = {
  boardId: string;
  name: string;
  stories: Story[];
  colorHex:
    | "#FF3300"
    | "#FFB300"
    | "#95FF00"
    | "#EA00FF"
    | "#FF7300"
    | "#777777";
};
