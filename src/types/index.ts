export type UserRole = "ADMIN" | "FAN";

export interface SafeUser {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: string;
}

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  category: "SINGLE" | "ALBUM" | "CONCERT" | "NEWS" | "BEHIND_THE_SCENES";
  content: string;
  summary: string | null;
  coverImage: string | null;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
  releaseDate: string | null;
  location: string | null;
  ticketUrl: string | null;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  comments?: CommentItem[];
  _count?: {
    comments: number;
  };
}

export interface CommentItem {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  userId: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string | null;
    role: string;
  };
}