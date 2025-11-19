export interface Employee {
  _id?: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joiningDate?: string; // ISO string
  status?: 'active' | 'inactive' | 'on-leave';
  documents?: { filename: string; originalname: string; uploadedAt: string }[];
}