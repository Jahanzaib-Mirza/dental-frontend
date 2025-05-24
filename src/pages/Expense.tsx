import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

interface ExpenseStats {
  label: string;
  amount: string;
  count: number;
}

interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Completed';
  paymentMethod?: string;
  receiptFileUrl?: string;
}

// Add Expense Modal Component
function AddExpenseModal({ isOpen, onClose, onSubmit }: { 
  isOpen: boolean; 
  onClose: () => void;
  onSubmit: (data: Omit<Expense, 'id'>) => void;
}) {
  const initialFormData = {
    date: '',
    description: '',
    category: '',
    amount: '',
    status: 'Pending',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setReceiptFile(null);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      status: 'Pending' as const,
      receiptFileUrl: receiptFile ? URL.createObjectURL(receiptFile) : undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-gray-100 relative animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Expense</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold px-2 py-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0F56] bg-gray-50"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0F56] bg-gray-50"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0F56] bg-gray-50"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="">Select category</option>
              <option value="Insurance">Insurance</option>
              <option value="Advertising">Advertising</option>
              <option value="Fees">Fees</option>
              <option value="Tool">Tool</option>
              <option value="Meal">Meal</option>
              <option value="Office Expense">Office Expense</option>
              <option value="Taxes">Taxes</option>
              <option value="License">License</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Payroll">Payroll</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0F56] bg-gray-50"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Receipt/Slip</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
            />
            {receiptFile && (
              <div className="mt-2 text-xs text-gray-600">Selected: {receiptFile.name}</div>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0A0F56] text-white rounded-lg font-semibold shadow hover:bg-[#232a7c] transition"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Expense() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('Year 2025');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '681e9711d8f0dd001c98b024',
      date: '05/10/2025',
      description: 'Office Supplies',
      category: 'Other',
      amount: 3.00,
      status: 'Pending',
      paymentMethod: 'Credit Card'
    },
    {
      id: '681e9710d8f0dd001c98b021',
      date: '05/10/2025',
      description: 'Dental Equipment',
      category: 'Other',
      amount: 2.60,
      status: 'Processing',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '681aa293d8f0dd001c98af93',
      date: '05/07/2025',
      description: 'Utilities Payment',
      category: 'Other',
      amount: 56.00,
      status: 'Completed',
      paymentMethod: 'Check'
    },
    {
      id: '68155c93d8f0dd001c98af84',
      date: '05/03/2025',
      description: 'Cleaning Services',
      category: 'Other',
      amount: 3.00,
      status: 'Pending',
      paymentMethod: 'Cash'
    },
    {
      id: '68155c92d8f0dd001c98af81',
      date: '05/03/2025',
      description: 'Marketing Materials',
      category: 'Other',
      amount: 2.60,
      status: 'Processing',
      paymentMethod: 'Credit Card'
    }
  ]);

  // List of categories for filter dropdown
  const categories = [
    'Insurance',
    'Advertising',
    'Fees',
    'Tools',
    'Meals',
    'Office Expense',
    'Taxes',
    'License',
    'Vehicle',
    'Payroll',
    'Other',
  ];

  // Filtered expenses based on search and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !categoryFilter || expense.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const stats: ExpenseStats[] = [
    { label: 'Total Expense', amount: '$1220.02', count: 49 },
    { label: 'This Year', amount: '$1220.02', count: 49 },
    { label: 'This Month', amount: '$67.20', count: 5 },
    { label: 'This Week', amount: '$0.00', count: 0 },
  ];

  const handleAddExpense = (data: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...data,
      id: `EXP-${(expenses.length + 1).toString().padStart(3, '0')}`
    };
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#0A0F56] text-base">{stat.label}</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500 text-white">
                  {stat.count}
                </span>
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.amount}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 text-sm border rounded-lg px-4 py-2 hover:bg-gray-50">
            <span>{selectedYear}</span>
            <FiFilter className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Category Filter Dropdown */}
          <select
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0F56] bg-white"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="flex items-center space-x-1 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">
            <FiFilter className="w-4 h-4" />
            <span>All</span>
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 bg-[#0A0F56] text-white text-sm rounded-lg px-4 py-2 hover:bg-[#090D45]"
          >
            <span>Add Expense</span>
            <FiPlus className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 border border-[#0A0F56] text-[#0A0F56] text-sm rounded-lg px-4 py-2 hover:bg-gray-50">
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline">{expense.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">General</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">N/A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Weekly</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 bg-blue-100 p-2 rounded-lg">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-lg">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
} 