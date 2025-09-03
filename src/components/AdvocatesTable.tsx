import React from 'react';

interface Advocate {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

interface AdvocatesTableProps {
  advocates: Advocate[];
}

function formatPhoneNumber(phone: string | number): string {
  const phoneStr = phone.toString().replace(/\D/g, '');
  if (phoneStr.length === 10) {
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  }
  return phoneStr;
}

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  if (advocates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-12 text-center">
        <div className="text-blue-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No advocates found</h3>
        <p className="text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Credentials</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Specialties</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Experience</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Contact</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            {advocates.map((advocate, index) => (
              <tr key={advocate.id} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-25'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {advocate.firstName} {advocate.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{advocate.city}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {advocate.degree}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {advocate.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">
                    {advocate.yearsOfExperience} {advocate.yearsOfExperience === 1 ? 'year' : 'years'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={`tel:${advocate.phoneNumber}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {formatPhoneNumber(advocate.phoneNumber)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}