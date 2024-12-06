import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { IDMASTER, ID_FI, NAMA_FI, ID_FF, NAMA_FF, LINE, MODEL } = location.state;

  const [formData, setFormData] = useState({
    IDMASTER,
    ID_FI,
    NAMA_FI,
    ID_FF,
    NAMA_FF,
    LINE,
    MODEL,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://172.16.206.4:2001/updateMasterdatafi', formData);
      if (response.data.message) {
        navigate('/MasterData'); // After successful update, navigate back to the home page or any route you want
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
<div className="p-6 max-w-7xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-6">Update Data</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-300 mb-2">ID FI</label>
      <input
        type="text"
        name="ID_FI"
        value={formData.ID_FI}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-300 mb-2">Nama FI</label>
      <input
        type="text"
        name="NAMA_FI"
        value={formData.NAMA_FI}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-300 mb-2">ID FF</label>
      <input
        type="text"
        name="ID_FF"
        value={formData.ID_FF}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-300 mb-2">Nama FF</label>
      <input
        type="text"
        name="NAMA_FF"
        value={formData.NAMA_FF}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-300 mb-2">Line</label>
      <input
        type="text"
        name="LINE"
        value={formData.LINE}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-300 mb-2">Model</label>
      <input
        type="text"
        name="MODEL"
        value={formData.MODEL}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
    </div>
    <button
      type="submit"
      className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full shadow-md text-white font-semibold"
    >
      Update
    </button>
  </form>
</div>

  );
};

export default UpdateForm;
