
export interface Item {
  id: number;
  itemCode: string;
  description: string;
  unit: string;
  orderQty: number;
  pickQty: number;
  backOrderQty: number;
  pickMass: number;
}

export interface TransportDetails {
  transporter: string;
  vehicleRegNumber: string;
  vehicleType: string;
  vehicleCapacity: string;
  driverName: string;
  driverSignature?: string;
  datePicked?: string;
  pickedBy: string;
  checkedBy: string;
  comments: string;
}

export interface PickingListData {
  pln: string;
  orderNumber: string;
  customerCode: string;
  customerName: string;
  customerAddress: string;
  orderDate: string;
  deliveryDate: string;
  deliveryMode: string;
  warehouse: string;
  purchaseOrderNo: string;
  items: Item[];
  transportDetails: TransportDetails;
  printDate?: string;
  printTime?: string;
}
