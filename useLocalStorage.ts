import { useState, useEffect } from 'react';
import { CaseRecord } from '../types';

export function useLocalStorage() {
  const [cases, setCases] = useState<CaseRecord[]>([]);

  useEffect(() => {
    const savedCases = localStorage.getItem('anaesthesiaCases');
    if (savedCases) {
      try {
        setCases(JSON.parse(savedCases));
      } catch (error) {
        console.error('Error parsing saved cases:', error);
      }
    }
  }, []);

  const saveCase = (newCase: CaseRecord) => {
    const updatedCases = [newCase, ...cases];
    setCases(updatedCases);
    localStorage.setItem('anaesthesiaCases', JSON.stringify(updatedCases));
  };

  const exportToCSV = () => {
    if (cases.length === 0) {
      alert('No records to export');
      return;
    }

    const headers = [
      'Patient Name',
      'Patient ID',
      'Surgery/Procedure',
      'Anaesthesia Technique',
      'Drug Doses',
      'Monitoring',
      'Blood Loss',
      'Fluid Management',
      'Regional Anaesthesia',
      'Incidents',
      'Extubation',
      'Postoperative Recovery',
      'Date & Time'
    ];

    const csvRows = cases.map(caseRecord => [
      caseRecord.patientName,
      caseRecord.patientId,
      caseRecord.surgeryName,
      caseRecord.anaesthesiaName,
      caseRecord.drugDoses,
      caseRecord.monitoring,
      caseRecord.bloodLoss,
      caseRecord.fluidManagement,
      caseRecord.regionalAnesthesia,
      caseRecord.incidents,
      caseRecord.extubation,
      caseRecord.postoperativeRecovery,
      new Date(caseRecord.timestamp).toISOString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => 
        row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `anaesthesia_case_log_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    cases,
    saveCase,
    exportToCSV
  };
}