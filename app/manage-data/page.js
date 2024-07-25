"use client";

// app/manage-data/page.js

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const ManageData = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ Year: '', StorageType: '', Cost: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadCSV();
  }, []);

  const loadCSV = async () => {
    const response = await fetch('/data.csv'); // Corrected path
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(result.value);
    const parsedData = Papa.parse(csvData, { header: true }).data;
    setData(parsedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUpdateEntry = () => {
    if (editingIndex !== null) {
      // Update existing entry
      const updatedData = [...data];
      updatedData[editingIndex] = formData;
      setData(updatedData);
    } else {
      // Add new entry
      setData([...data, formData]);
    }
    setFormData({ Year: '', StorageType: '', Cost: '' });
    setEditingIndex(null);
  };

  const handleEditEntry = (index) => {
    setFormData(data[index]);
    setEditingIndex(index);
  };

  const handleDeleteEntry = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleResetData = () => {
    fetch('/defaultData.csv') // Corrected path
      .then((response) => response.text())
      .then((csvData) => {
        const parsedData = Papa.parse(csvData, { header: true }).data;
        setData(parsedData);
      });
  };

  const handleSaveData = async () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Manage Storage Data</h1>
      <form>
        <input
          type="number"
          name="Year"
          value={formData.Year}
          onChange={handleInputChange}
          placeholder="Year"
        />
        <input
          type="text"
          name="StorageType"
          value={formData.StorageType}
          onChange={handleInputChange}
          placeholder="Storage Type"
        />
        <input
          type="number"
          name="Cost"
          value={formData.Cost}
          onChange={handleInputChange}
          placeholder="Cost"
        />
        <button type="button" onClick={handleAddUpdateEntry}>
          {editingIndex !== null ? 'Update Entry' : 'Add Entry'}
        </button>
      </form>
      <button onClick={handleResetData}>Reset to Default Data</button>
      <button onClick={handleSaveData}>Save Data</button>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Storage Type</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.Year}</td>
              <td>{entry.StorageType}</td>
              <td>{entry.Cost}</td>
              <td>
                <button onClick={() => handleEditEntry(index)}>Edit</button>
                <button onClick={() => handleDeleteEntry(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageData;
