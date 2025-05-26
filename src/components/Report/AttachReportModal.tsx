import React, { useState } from 'react';
import { FiPaperclip, FiX, FiUpload } from 'react-icons/fi';

interface AttachReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: ReportData) => void;
}

export interface ReportData {
  testName: string;
  result: string;
  image?: File | null;
}

export const AttachReportModal: React.FC<AttachReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [testName, setTestName] = useState('');
  const [result, setResult] = useState('');
  const [reportImage, setReportImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReportImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setReportImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !result) {
        // Basic validation
        alert('Test Name and Result are required.');
        return;
    }
    onSubmit({ testName, result, image: reportImage });
    // Reset form and close modal
    setTestName('');
    setResult('');
    setReportImage(null);
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-out scale-95 hover:scale-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#0A0F56] flex items-center">
            <FiPaperclip className="mr-2" /> Attach Report
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="testName" className="block text-sm font-semibold text-gray-700 mb-1">Test Name</label>
            <input
              id="testName"
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="e.g., Blood Sugar Test"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              required
            />
          </div>

          <div>
            <label htmlFor="result" className="block text-sm font-semibold text-gray-700 mb-1">Result / Findings</label>
            <textarea
              id="result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="Enter test results or findings..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Image (Optional)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#0A0F56] transition-colors bg-gray-50">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative group">
                    <img src={imagePreview} alt="Report preview" className="mx-auto h-32 w-auto rounded-md object-contain" />
                    <button 
                      type="button"
                      onClick={() => { setReportImage(null); setImagePreview(null); const fileInput = document.getElementById('report-image-upload') as HTMLInputElement; if(fileInput) fileInput.value = ''; }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX size={14}/>
                    </button>
                  </div>
                ) : (
                  <FiUpload className="mx-auto h-10 w-10 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="report-image-upload"
                    className="relative cursor-pointer font-semibold text-[#0A0F56] hover:text-[#232a7c] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#0A0F56] px-1"
                  >
                    <span>Upload a file</span>
                    <input id="report-image-upload" name="report-image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
            {reportImage && (
              <p className="text-xs text-gray-500 mt-1">Selected: {reportImage.name}</p>
            )}
          </div>

          <div className="flex justify-end pt-3 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0A0F56] hover:bg-[#232a7c] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A0F56] shadow-md hover:shadow-lg"
            >
              Attach Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 