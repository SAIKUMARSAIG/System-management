import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintService } from '../services/api';

const CreateComplaint = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      if (!formData.title.trim() || !formData.location.trim() || !formData.description.trim()) {
        setError('All fields are required');
        setIsSubmitting(false);
        return;
      }

      const response = await complaintService.createComplaint({
        ...formData,
        createdBy: currentUser
      });
      
      if (response.status === 200 || response.status === 201) {
        navigate('/complaints');
      } else {
        setError('Failed to create complaint. Please try again.');
      }
    } catch (error) {
      console.error('Error creating complaint:', error);
      if (error.code === 'ECONNABORTED') {
        setError('Request timeout. Please check if the backend server is running.');
      } else if (error.response) {
        setError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        setError('No response from server. Please make sure the backend is running on http://localhost:8080');
      } else {
        setError('Failed to create complaint. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

 
  const inputClass = "w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500";

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 border-b border-gray-700 pb-3">Report a New Issue</h1>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6" role="alert">
          <p className="font-bold">Error Occurred</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2 text-red-400">
            Make sure your Spring Boot backend is running on http://localhost:8080
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="e.g., Overflowing dumpster"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="e.g., Corner of Main St & Park Ave"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
            className={inputClass}
            placeholder="Provide a detailed description of the issue..."
          ></textarea>
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-cyan-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 disabled:bg-cyan-800 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/complaints')}
            className="bg-gray-600 text-gray-200 py-2 px-6 rounded-md font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComplaint;
