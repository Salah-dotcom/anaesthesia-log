import React, { useState } from 'react';
import { Search, FileText, Calendar, User } from 'lucide-react';
import { CaseRecord } from '../types';

interface CaseListProps {
  cases: CaseRecord[];
}

export function CaseList({ cases }: CaseListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter(
    (caseRecord) =>
      caseRecord.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseRecord.surgeryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseRecord.anaesthesiaName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (cases.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No cases recorded yet</h3>
        <p className="text-gray-500">Start by adding your first anaesthesia case above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recent Cases ({cases.length})</h2>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredCases.map((caseRecord) => (
          <div
            key={caseRecord.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <User size={18} className="text-blue-600" />
                <h3 className="font-semibold text-gray-900">{caseRecord.patientName}</h3>
                <span className="text-sm text-gray-500">({caseRecord.patientId})</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar size={14} />
                {new Date(caseRecord.timestamp).toLocaleDateString()}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Procedure:</span>
                <span className="ml-2 text-gray-600">{caseRecord.surgeryName || 'Not specified'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Anaesthesia:</span>
                <span className="ml-2 text-gray-600">{caseRecord.anaesthesiaName || 'Not specified'}</span>
              </div>
            </div>
            
            {caseRecord.incidents && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-yellow-800">Incidents: </span>
                <span className="text-yellow-700">{caseRecord.incidents}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}