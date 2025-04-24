
import { useState, useEffect } from 'react';
import { PickingListData } from '../pages/logistics/types';

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
