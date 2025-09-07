// import { useState, useEffect } from 'react';
// import { complaintService } from '../services/api';
// import ComplaintCard from '../components/ComplaintCard';

// const ComplaintList = ({ userRole, currentUser }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         let response;
//         if (filter === 'all') {
//           response = await complaintService.getAllComplaints();
//         } else if (filter === 'my' && userRole === 'citizen') {
//           response = await complaintService.getComplaintsByUser(currentUser);
//         } else if (filter === 'assigned' && userRole === 'worker') {
//           response = await complaintService.getComplaintsByWorker(currentUser);
//         } else {
//           response = await complaintService.getComplaintsByStatus(filter);
//         }
//         setComplaints(response.data);
//       } catch (error) {
//         console.error('Error fetching complaints:', error);
//       }
//     };

//     fetchComplaints();
//   }, [filter, userRole, currentUser]);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-gray-800">Complaints</h1>
      
//       <div className="flex flex-wrap gap-2">
//         <button 
//           className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//           onClick={() => setFilter('all')}
//         >
//           All
//         </button>
//         <button 
//           className={`px-3 py-1 rounded ${filter === 'PENDING' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//           onClick={() => setFilter('PENDING')}
//         >
//           Pending
//         </button>
//         <button 
//           className={`px-3 py-1 rounded ${filter === 'IN_PROGRESS' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
//           onClick={() => setFilter('IN_PROGRESS')}
//         >
//           In Progress
//         </button>
//         <button 
//           className={`px-3 py-1 rounded ${filter === 'RESOLVED' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//           onClick={() => setFilter('RESOLVED')}
//         >
//           Resolved
//         </button>
        
//         {userRole === 'citizen' && (
//           <button 
//             className={`px-3 py-1 rounded ${filter === 'my' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//             onClick={() => setFilter('my')}
//           >
//             My Complaints
//           </button>
//         )}
        
//         {userRole === 'worker' && (
//           <button 
//             className={`px-3 py-1 rounded ${filter === 'assigned' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//             onClick={() => setFilter('assigned')}
//           >
//             Assigned to Me
//           </button>
//         )}
//       </div>
      
//       {complaints.length === 0 ? (
//         <div className="bg-white p-6 rounded-lg shadow text-center">
//           <p className="text-gray-600">No complaints found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {complaints.map(complaint => (
//             <ComplaintCard 
//               key={complaint.id} 
//               complaint={complaint} 
//               userRole={userRole}
//               currentUser={currentUser}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ComplaintList;












import { useState, useEffect } from 'react';
import { complaintService } from '../services/api';
import ComplaintCard from '../components/ComplaintCard';

const ComplaintList = ({ userRole, currentUser }) => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        let response;
        // This logic remains the same, just fetching data.
        if (filter === 'all') {
          response = await complaintService.getAllComplaints();
        } else if (filter === 'my' && userRole === 'citizen') {
          response = await complaintService.getComplaintsByUser(currentUser);
        } else if (filter === 'assigned' && userRole === 'worker') {
          response = await complaintService.getComplaintsByWorker(currentUser);
        } else {
          response = await complaintService.getComplaintsByStatus(filter);
        }
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setComplaints([]); // Clear complaints on error
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [filter, userRole, currentUser]);
  
  // Base classes for filter buttons for a consistent look
  const baseButtonClass = "px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  const inactiveButtonClass = "bg-gray-800 text-gray-300 hover:bg-gray-700";
  
  const getButtonClass = (buttonFilter, activeClass) => {
    return `${baseButtonClass} ${filter === buttonFilter ? activeClass : inactiveButtonClass}`;
  };

  return (
    <div className="space-y-8 bg-black px-10 py-10">
      <h1 className="text-3xl font-bold text-cyan-400 border-b border-gray-700 pb-2">Complaints Dashboard</h1>
      
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-3 items-center">
            <span className="text-gray-400 font-medium">Filter by:</span>
            <button 
              className={getButtonClass('all', 'bg-cyan-600 text-white focus:ring-cyan-500')}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={getButtonClass('PENDING', 'bg-yellow-600 text-white focus:ring-yellow-500')}
              onClick={() => setFilter('PENDING')}
            >
              Pending
            </button>
            <button 
              className={getButtonClass('IN_PROGRESS', 'bg-blue-600 text-white focus:ring-blue-500')}
              onClick={() => setFilter('IN_PROGRESS')}
            >
              In Progress
            </button>
            <button 
              className={getButtonClass('RESOLVED', 'bg-green-600 text-white focus:ring-green-500')}
              onClick={() => setFilter('RESOLVED')}
            >
              Resolved
            </button>
            
            {userRole === 'citizen' && (
              <button 
                className={getButtonClass('my', 'bg-purple-600 text-white focus:ring-purple-500')}
                onClick={() => setFilter('my')}
              >
                My Complaints
              </button>
            )}
            
            {userRole === 'worker' && (
              <button 
                className={getButtonClass('assigned', 'bg-purple-600 text-white focus:ring-purple-500')}
                onClick={() => setFilter('assigned')}
              >
                Assigned to Me
              </button>
            )}
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-400">Loading complaints...</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-inner text-center">
          <p className="text-gray-400 text-lg">No complaints found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map(complaint => (
            <ComplaintCard 
              key={complaint.id} 
              complaint={complaint} 
              userRole={userRole}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;

