export type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type Users = User[];
