export interface CaseRecord {
  id: string;
  patientName: string;
  patientId: string;
  surgeryName: string;
  anaesthesiaName: string;
  drugDoses: string;
  incidents: string;
  monitoring: string;
  bloodLoss: string;
  fluidManagement: string;
  regionalAnesthesia: string;
  extubation: string;
  postoperativeRecovery: string;
  timestamp: number;
}

export interface FormData extends Omit<CaseRecord, 'id' | 'timestamp'> {}