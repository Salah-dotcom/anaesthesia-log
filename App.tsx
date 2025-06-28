import React from 'react';
import { Activity } from 'lucide-react';
import { CaseForm } from './components/CaseForm';
import { CaseList } from './components/CaseList';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const { cases, saveCase, exportToCSV } = useLocalStorage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity size={32} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Anaesthesia Case Management
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional case logging system for anaesthetic procedures. 
            Record, manage, and export your clinical cases with confidence.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Case Entry Form */}
          <div className="max-w-4xl mx-auto">
            <CaseForm onSave={saveCase} onExport={exportToCSV} />
          </div>

          {/* Case History */}
          <div className="max-w-6xl mx-auto">
            <CaseList cases={cases} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Designed for healthcare professionals. Data stored locally for privacy and security.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;