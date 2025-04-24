
export type DowntimeCategory = 'Machine Downtime' | 'Material Downtime' | 'Quality Issue';

export interface DowntimeData {
  id?: string;
  date: string;
  productionLine: string;
  downtimeCategory: DowntimeCategory;
  equipmentName: string;
  startTime: string;
  endTime: string;
  totalDuration: string;
  rootCause: string;
  actionTaken: string;
  reportedBy: string;
  approvedBy: string;
  createdAt?: string;
}

export interface DowntimeFormData {
  currentDowntime: DowntimeData;
}
