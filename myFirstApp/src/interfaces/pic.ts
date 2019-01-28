

export interface Media {
  file_id: number;
  filename: string;
  filesize: string;
  title: string;
  description: string;
  user_id: number;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnail;
}
export interface Thumbnail {
  w160: string;
  w320?: string;
  w640?: string;

}

export interface User {
  username: string;
  password?: string;
  email?: string;
  time_created?: Date;
  user_id?: number;
  full_name?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
