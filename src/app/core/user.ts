export interface User {
  id: number;
  username: string;
  password: string;
  role: 'SUPER_ADMIN' | 'HR_USER';
}
