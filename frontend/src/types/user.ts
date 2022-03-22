export type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type Users = User[];

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};
