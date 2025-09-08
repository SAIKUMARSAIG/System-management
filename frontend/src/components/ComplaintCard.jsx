import { useState } from 'react';
import { complaintService } from '../services/api';

const ComplaintCard = ({ complaint, userRole, currentUser }) => {
  const [currentComplaint, setCurrentComplaint] = useState(complaint);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      const response = await complaintService.updateComplaint(currentComplaint.id, {
        ...currentComplaint,
        status: newStatus,
        assignedWorker: newStatus === 'IN_PROGRESS' ? currentUser : currentComplaint.assignedWorker
      });
      setCurrentComplaint(response.data);
    } catch (error) {
      console.error('Error updating complaint:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const statusColors = {
    PENDING: 'bg-yellow-700 text-white',
    IN_PROGRESS: 'bg-cyan-600 text-white',
    RESOLVED: 'bg-green-700 text-white'
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg"> {/* Dark blue background */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-cyan-200">{currentComplaint.title}</h3> {/* Cyan text */}
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[currentComplaint.status]}`}>
          {currentComplaint.status}
        </span>
      </div>
      
      <p className="text-cyan-400 text-sm mb-2"> {/* Cyan text */}
        <span className="font-medium">Location:</span> {currentComplaint.location}
      </p>
      
      <p className="text-gray-300 mb-3">{currentComplaint.description}</p> {/* Lighter gray text */}
      
      <div className="text-xs text-gray-400 space-y-1 mb-3"> {/* Gray text */}
        <p>Reported by: {currentComplaint.createdBy}</p>
        {currentComplaint.assignedWorker && (
          <p>Assigned to: {currentComplaint.assignedWorker}</p>
        )}
        <p>Created: {new Date(currentComplaint.createdAt).toLocaleDateString()}</p>
      </div>
      
      {(userRole === 'worker' || userRole === 'admin') && (
        <div className="flex gap-2">
          {currentComplaint.status === 'PENDING' && (
            <button 
              onClick={() => handleStatusChange('IN_PROGRESS')}
              disabled={isUpdating}
              className="bg-cyan-600 text-white px-3 py-1 rounded text-sm hover:bg-cyan-700 disabled:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            >
              {isUpdating ? '...' : 'Start Work'}
            </button>
          )}
          
          {currentComplaint.status === 'IN_PROGRESS' && (
            <button 
              onClick={() => handleStatusChange('RESOLVED')}
              disabled={isUpdating}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {isUpdating ? '...' : 'Mark Resolved'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplaintCard;