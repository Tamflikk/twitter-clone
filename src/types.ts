export interface User {
  name: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
}

export interface Tweet {
  id: number;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  comments: Comment[];
}