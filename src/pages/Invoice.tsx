import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface Invoice {
  id: string;
  inspectionId: string;
  client: string;
  address: string;
  serviceName: string;
  serviceProvider: string;
  created: string;
  amount: number;
  status: 'Unsent' | 'Due' | 'Past Due' | 'Paid';
}

export default function Invoice() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('May 11, 2025 - May 24, 2025');
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '#000812',
      inspectionId: 'INS-0000002878',
      client: 'gongu gulbai',
      address: 'Biryani City, North Bethesda, Maryland, 20852',
      serviceName: 'Service Name',
      serviceProvider: 'Muhammad Jahanzaib',
      created: '05/13/2025',
      amount: 868.00,
      status: 'Past Due'
    },
    {
      id: '#000815',
      inspectionId: 'INS-0000002881',
      client: 'jalebi bai',
      address: 'Ladue Horton Watkins High School, St. Louis, Missouri, 63124',
      serviceName: 'Service Name',
      serviceProvider: 'Muhammad Jahanzaib',
      created: '05/14/2025',
      amount: 768.00,
      status: 'Past Due'
    }
  ]);

  const stats = [
    { label: 'Total Invoices', count: 13, amount: '$10684.00', bgColor: 'bg-blue-50' },
    // { label: 'Unsent', count: 0, amount: '$0.00', bgColor: 'bg-gray-50' },
    { label: 'Due', count: 0, amount: '$0.00', bgColor: 'bg-orange-50' },
    // { label: 'Past Due', count: 13, amount: '$10684.00', bgColor: 'bg-red-50' },
    { label: 'Paid', count: 0, amount: '$0.00', bgColor: 'bg-green-50' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Past Due':
        return 'bg-red-100 text-red-800';
      case 'Due':
        return 'bg-orange-100 text-orange-800';
      case 'Paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gradient-to-br min-h-screen from-[#f4f6fb] to-[#e9eaf7] flex flex-col items-center p-4">
      <div className="flex flex-col mb-6">
        {/* Stats Grid */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-6 shadow border border-gray-100 flex flex-col justify-center items-start min-w-[170px] max-w-[240px] w-full`}
            >
              <div className="flex items-center justify-between w-full mb-">
                <span className="text-[#0A0F56] text-xs font-semibold truncate">{stat.label}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500 text-white">
                  {stat.count}
                </span>
              </div>
              <span className="text-xl font-bold text-gray-900 truncate">{stat.amount}</span>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex sm:flex-row justify-end mb-6">
          
          <div className="flex items-center space-x-4 sm:w-auto">
            <div className="relative sm:flex-initial">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="sm:w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0F56] bg-white shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center bg-[#0A0F56] text-white text-sm rounded-lg px-4 py-2 hover:bg-[#090D45] shadow">
              <span>All</span>
              <FiFilter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 ">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  {/* <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection ID</th> */}
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  {/* <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th> */}
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Amount</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-blue-600">{invoice.id}</td>
                    {/* <td className="px-5 py-4 whitespace-nowrap text-sm text-blue-600">{invoice.inspectionId}</td> */}
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.client}</td>
                    {/* <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.address}</td> */}
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.serviceName}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-blue-600">{invoice.serviceProvider}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.created}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 002-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 