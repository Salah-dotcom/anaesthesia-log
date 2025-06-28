import React, { useState } from 'react';
import { Save, Download, CheckCircle } from 'lucide-react';
import { TextInput, TextareaField } from './FormInput';
import { FormData, CaseRecord } from '../types';

interface CaseFormProps {
  onSave: (data: CaseRecord) => void;
  onExport: () => void;
}

const initialFormData: FormData = {
  patientName: '',
  patientId: '',
  surgeryName: '',
  anaesthesiaName: '',
  drugDoses: '',
  incidents: '',
  monitoring: '',
  bloodLoss: '',
  fluidManagement: '',
  regionalAnesthesia: '',
  extubation: '',
  postoperativeRecovery: '',
};

export function CaseForm({ onSave, onExport }: CaseFormProps) {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: CaseRecord = {
      ...form,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    onSave(newRecord);
    setSaved(true);
    setForm(initialFormData);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Anaesthesia Case Log</h1>
        <p className="text-gray-600">Record and manage your anaesthetic cases</p>
      </div>

      {/* Patient Demographics and Procedure Information */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Patient & Procedure Details
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            label="Patient Name"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            required
            placeholder="Enter patient name"
          />
          <TextInput
            label="Patient ID"
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            required
            placeholder="Enter patient ID/MRN"
          />
          <TextInput
            label="Surgery/Procedure"
            name="surgeryName"
            value={form.surgeryName}
            onChange={handleChange}
            placeholder="e.g., Laparoscopic cholecystectomy"
          />
          <TextInput
            label="Anaesthesia Technique"
            name="anaesthesiaName"
            value={form.anaesthesiaName}
            onChange={handleChange}
            placeholder="e.g., General anaesthesia with ETT"
          />
        </div>
      </div>

      {/* Clinical Details */}
      <div className="bg-blue-50 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Anaesthetic Management
        </h2>
        <div className="space-y-4">
          <TextareaField
            label="Drug Doses (Induction & Maintenance)"
            name="drugDoses"
            value={form.drugDoses}
            onChange={handleChange}
            placeholder="e.g., Propofol 150mg, Fentanyl 100µg, Sevoflurane 2%"
            rows={2}
          />
          <TextareaField
            label="Monitoring & Notable Readings"
            name="monitoring"
            value={form.monitoring}
            onChange={handleChange}
            placeholder="e.g., ASA standard + BIS 45-60, TOF >0.9 at closure"
            rows={2}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <TextareaField
              label="Estimated Blood Loss"
              name="bloodLoss"
              value={form.bloodLoss}
              onChange={handleChange}
              placeholder="e.g., 300mL"
              rows={2}
            />
            <TextareaField
              label="Fluid Management"
              name="fluidManagement"
              value={form.fluidManagement}
              onChange={handleChange}
              placeholder="e.g., Hartmann's 1500mL, Gelofusine 500mL"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Additional Clinical Information */}
      <div className="bg-teal-50 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Additional Clinical Details
        </h2>
        <div className="space-y-4">
          <TextareaField
            label="Regional Anaesthesia"
            name="regionalAnesthesia"
            value={form.regionalAnesthesia}
            onChange={handleChange}
            placeholder="e.g., US-guided interscalene block, 20mL 0.5% ropivacaine"
            rows={2}
          />
          <TextareaField
            label="Intraoperative Incidents/Events"
            name="incidents"
            value={form.incidents}
            onChange={handleChange}
            placeholder="e.g., Hypotension managed with phenylephrine 100µg"
            rows={2}
          />
          <TextareaField
            label="Extubation & Airway Management"
            name="extubation"
            value={form.extubation}
            onChange={handleChange}
            placeholder="e.g., Smooth extubation at MAC ≤0.2"
            rows={2}
          />
          <TextareaField
            label="Postoperative Recovery"
            name="postoperativeRecovery"
            value={form.postoperativeRecovery}
            onChange={handleChange}
            placeholder="e.g., Aldrete 9 at 15 min, pain 2/10, no PONV"
            rows={2}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
        >
          <Save size={20} />
          Save Case Record
        </button>
        <button
          type="button"
          onClick={onExport}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {saved && (
        <div className="flex items-center justify-center gap-2 text-green-600 font-medium bg-green-50 py-3 px-4 rounded-lg">
          <CheckCircle size={20} />
          Case record saved successfully
        </div>
      )}
    </form>
  );
}