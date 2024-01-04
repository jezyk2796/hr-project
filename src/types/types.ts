export type Status = 'CLOSED' | 'OPEN';

export type Job = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  logo: string;
  companyName: string;
  status: Status;
};

export type JobPart = Omit<Job, 'createdAt' | 'updatedAt' | 'status'>;
