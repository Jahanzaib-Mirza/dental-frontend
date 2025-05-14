import React, { useState } from 'react';

const AddPatient = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
  });

  const [image, setImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted patient:', form, image);
    // Send to backend
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#0A0F56]">Add Patient</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md">

          {/* Left Section: Form */}
          <div className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              />
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Age</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#0A0F56] text-white px-4 py-2 rounded-md hover:bg-[#060b3e] transition"
            >
              Add Patient
            </button>
          </div>

          {/* Right Section: Image Upload */}
          <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-4 h-full">
            <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
              {image ? (
                <img src={image} alt="Patient" className="w-40 h-40 rounded-full object-cover mb-3" />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                  No Image
                </div>
              )}
              <span className="text-sm text-[#0A0F56] hover:underline">Click to upload image</span>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddPatient;
