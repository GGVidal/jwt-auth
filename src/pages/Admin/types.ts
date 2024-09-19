interface Report {
  id: number;
  title: string;
  status: string;
}

export interface AdminData {
  name: string;
  email: string;
  reports: Report[];
}
