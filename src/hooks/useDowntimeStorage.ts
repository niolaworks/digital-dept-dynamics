
import { useState, useEffect } from 'react';
import { DowntimeData } from '../pages/production/types';

const STORAGE_KEY = 'downtime-draft';

export const useDowntimeStorage = () => {
  const [formData, setFormData] = useState<DowntimeData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      date: new Date().toISOString().split('T')[0],
      productionLine: '',
      downtimeCategory: 'Machine Downtime',
      equipmentName: '',
      startTime: '',
      endTime: '',
      totalDuration: '',
      rootCause: '',
      actionTaken: '',
      reportedBy: '',
      approvedBy: ''
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const saveDowntimeRecord = () => {
    const now = new Date();
    const id = `downtime-${now.getTime()}`;
    const dataWithMetadata = {
      ...formData,
      id,
      createdAt: now.toISOString()
    };
    localStorage.setItem(id, JSON.stringify(dataWithMetadata));
    localStorage.removeItem(STORAGE_KEY);
    return dataWithMetadata;
  };

  const getAllDowntimeRecords = () => {
    const records: DowntimeData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('downtime-') && key !== STORAGE_KEY) {
        const record = JSON.parse(localStorage.getItem(key) || '');
        records.push(record);
      }
    }
    return records.sort((a, b) => {
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    });
  };

  const clearStoredData = () => {
    const savedData = saveDowntimeRecord();
    setFormData({
      date: new Date().toISOString().split('T')[0],
      productionLine: '',
      downtimeCategory: 'Machine Downtime',
      equipmentName: '',
      startTime: '',
      endTime: '',
      totalDuration: '',
      rootCause: '',
      actionTaken: '',
      reportedBy: '',
      approvedBy: ''
    });
    return savedData;
  };

  return { formData, setFormData, clearStoredData, getAllDowntimeRecords };
};
