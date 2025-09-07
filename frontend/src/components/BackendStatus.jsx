// components/BackendStatus.jsx
import { useState, useEffect } from 'react';
import { testConnection } from '../services/api';

const BackendStatus = () => {
  const [isBackendRunning, setIsBackendRunning] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      const status = await testConnection();
      setIsBackendRunning(status);
    };

    checkBackend();
  }, []);

  if (isBackendRunning === null) {
    return (
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
        Checking backend connection...
      </div>
    );
  }

  if (!isBackendRunning) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p className="font-bold">Backend Server Not Connected</p>
        <p>Please make sure your Spring Boot backend is running on http://localhost:8080</p>
        <p className="text-sm mt-2">
          Run your Spring Boot application and refresh this page.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      Backend server connected successfully!
    </div>
  );
};

export default BackendStatus;