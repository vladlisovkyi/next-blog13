import { Timestamp } from "mongodb";

interface ICat {
  _id: string;
  name: string;
  posts: string[];
}

interface IPost {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface IUser {
  username: string;
  email: string;
  id: string;
}
