
import { useState, useEffect } from 'react';

type Item = {
  id: number;
  sku: string;
  description: string;
  location: string;
  quantity: number;
};

type PickingListData = {
  orderNumber: string;
  customerName: string;
  pickDate: string;
  warehouse: string;
  priority: string;
  items: Item[];
};

const STORAGE_KEY = 'picking-list-draft';

export const usePickingListStorage = () => {
  const [formData, setFormData] = useState<PickingListData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      orderNumber: '',
      customerName: '',
      pickDate: '',
      warehouse: '',
      priority: '',
      items: [{ id: 1, sku: '', description: '', location: '', quantity: 1 }]
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const savePickingList = () => {
    if (formData.orderNumber) {
      localStorage.setItem(`picking-list-${formData.orderNumber}`, JSON.stringify(formData));
      localStorage.removeItem(STORAGE_KEY);
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
    savePickingList();
    setFormData({
      orderNumber: '',
      customerName: '',
      pickDate: '',
      warehouse: '',
      priority: '',
      items: [{ id: 1, sku: '', description: '', location: '', quantity: 1 }]
    });
  };

  return { formData, setFormData, clearStoredData, getAllPickingLists };
};
