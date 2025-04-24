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

export type DefectSeverity = 'Minor' | 'Moderate' | 'Critical';
export type InspectionResult = 'Passed' | 'Failed';
export type RecommendedAction = 'Accept' | 'Reject' | 'Conditional Use';

export interface QualityControlData {
  id?: string;
  inspectionDate: string;
  materialName: string;
  batchReference: string;
  vendorName: string;
  inspectionResult: InspectionResult;
  defectType: string;
  severityLevel: DefectSeverity;
  vendorRating: number;
  recommendedAction: RecommendedAction;
  inspectorName: string;
  remarks: string;
  createdAt?: string;
}
