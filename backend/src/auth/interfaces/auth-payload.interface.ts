export interface AuthPayload {
  token: string;
  user: {
    username: string;
    role: string;
    email: string;
  };
}
