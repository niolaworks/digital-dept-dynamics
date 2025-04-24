
import { useState, useEffect } from 'react';

type Item = {
  id: number;
  itemCode: string;
  description: string;
  unit: string;
  orderQty: number;
  pickQty: number;
  backOrderQty: number;
  pickMass: number;
};

type TransportDetails = {
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
};

type PickingListData = {
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
};

const STORAGE_KEY = 'picking-list-draft';

export const usePickingListStorage = () => {
  const [formData, setFormData] = useState<PickingListData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      pln: '',
      orderNumber: '',
      customerCode: '',
      customerName: '',
      customerAddress: '',
      orderDate: '',
      deliveryDate: '',
      deliveryMode: '',
      warehouse: '',
      purchaseOrderNo: '',
      items: [{
        id: 1,
        itemCode: '',
        description: '',
        unit: 'CS',
        orderQty: 0,
        pickQty: 0,
        backOrderQty: 0,
        pickMass: 0
      }],
      transportDetails: {
        transporter: '',
        vehicleRegNumber: '',
        vehicleType: '',
        vehicleCapacity: '',
        driverName: '',
        driverSignature: '',
        datePicked: '',
        pickedBy: '',
        checkedBy: '',
        comments: ''
      }
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const savePickingList = () => {
    if (formData.orderNumber) {
      const now = new Date();
      const dataWithTimestamp = {
        ...formData,
        printDate: now.toLocaleDateString(),
        printTime: now.toLocaleTimeString()
      };
      localStorage.setItem(`picking-list-${formData.orderNumber}`, JSON.stringify(dataWithTimestamp));
      localStorage.removeItem(STORAGE_KEY);
      return dataWithTimestamp;
    }
  };

  const getAllPickingLists = () => {
    const lists: PickingListData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('picking-list-')) {
        const list = JSON.parse(localStorage.getItem(key) || '');
        lists.push(list);
      }
    }
    return lists;
  };

  const clearStoredData = () => {
    const savedData = savePickingList();
    setFormData({
      pln: '',
      orderNumber: '',
      customerCode: '',
      customerName: '',
      customerAddress: '',
      orderDate: '',
      deliveryDate: '',
      deliveryMode: '',
      warehouse: '',
      purchaseOrderNo: '',
      items: [{
        id: 1,
        itemCode: '',
        description: '',
        unit: 'CS',
        orderQty: 0,
        pickQty: 0,
        backOrderQty: 0,
        pickMass: 0
      }],
      transportDetails: {
        transporter: '',
        vehicleRegNumber: '',
        vehicleType: '',
        vehicleCapacity: '',
        driverName: '',
        driverSignature: '',
        datePicked: '',
        pickedBy: '',
        checkedBy: '',
        comments: ''
      }
    });
    return savedData;
  };

  return { formData, setFormData, clearStoredData, getAllPickingLists };
};
