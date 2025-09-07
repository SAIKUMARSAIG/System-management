// import { useState, useEffect } from "react";
// import { complaintService } from "../services/api";

// const Dashboard = ({ userRole }) => {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     inProgress: 0,
//     resolved: 0,
//     totData: [],
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [allResponse, pendingResponse, inProgressResponse, resolvedResponse] =
//           await Promise.all([
//             complaintService.getAllComplaints(),
//             complaintService.getComplaintsByStatus("PENDING"),
//             complaintService.getComplaintsByStatus("IN_PROGRESS"),
//             complaintService.getComplaintsByStatus("RESOLVED"),
//           ]);

//         setStats({
//           total: allResponse.data.length,
//           pending: pendingResponse.data.length,
//           inProgress: inProgressResponse.data.length,
//           resolved: resolvedResponse.data.length,
//           totData: allResponse.data,
//         });
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

//       {/* Stats Section (Dynamic) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-gray-600">Total Complaints</h3>
//           <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-gray-600">Pending</h3>
//           <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-gray-600">In Progress</h3>
//           <p className="text-3xl font-bold text-blue-500">{stats.inProgress}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-gray-600">Resolved</h3>
//           <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
//         </div>
//       </div>

//       {/* Service Timings (Dynamic from API + Static Example) */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Service Timings</h2>
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2">Service</th>
//               <th className="p-2">Area / Ward</th>
//               <th className="p-2">Timings</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stats.totData.map((data, index) => (
//               <tr className="border-t" key={index}>
//                 <td className="p-2">{data.description}</td>
//                 <td className="p-2">{data.location}</td>
//                 <td className="p-2">{data.title}</td>
//                 <td className="p-2 text-blue-600 font-semibold">{data.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Announcements (Static) */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Government Announcements</h2>
//         <ul className="list-disc list-inside text-gray-700 space-y-2">
//           <li>⚡ Power maintenance scheduled on 10th Sept in Ward 5.</li>
//           <li>🛣️ Road repair drive starting from 12th Sept.</li>
//           <li>🗑️ Special sanitation campaign in Ward 9 next week.</li>
//         </ul>
//       </div>

//       {/* Admin Tools (Role Based) */}
//       {userRole === "admin" && (
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Admin Tools</h2>
//           <div className="flex gap-3">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//               Manage Workers
//             </button>
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//               Generate Reports
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Contact Info (Static) */}
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
//         <p className="text-gray-700">
//           <span className="font-semibold">📍 Address:</span> Municipal Office, Main Road, City Center
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">📞 Phone:</span> +91 98765 43210
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">✉️ Email:</span> support@govportal.in
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">⏰ Working Hours:</span> Mon – Fri: 9 AM – 6 PM
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
















import { useState, useEffect } from "react";
import { complaintService } from "../services/api"; // ✅ Use your actual API

const StatCard = ({ title, value, color, icon }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
    <div>
      <h3 className="text-gray-400 font-medium">{title}</h3>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
    <div className={`text-4xl ${color} opacity-30`}>{icon}</div>
  </div>
);

const Dashboard = ({ userRole }) => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    totData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [allResponse, pendingResponse, inProgressResponse, resolvedResponse] = await Promise.all([
          complaintService.getAllComplaints(),
          complaintService.getComplaintsByStatus("PENDING"),
          complaintService.getComplaintsByStatus("IN_PROGRESS"),
          complaintService.getComplaintsByStatus("RESOLVED"),
        ]);

        setStats({
          total: allResponse.data.length,
          pending: pendingResponse.data.length,
          inProgress: inProgressResponse.data.length,
          resolved: resolvedResponse.data.length,
          totData: allResponse.data,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statusColors = {
    PENDING: "text-yellow-400",
    IN_PROGRESS: "text-blue-400",
    RESOLVED: "text-green-400",
  };

  if (loading) {
    return <div className="text-center text-gray-400 p-10">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-8 bg-black p-10">
      <h1 className="text-3xl font-bold text-cyan-400 border-b border-gray-700 pb-2">Dashboard Overview</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Complaints" value={stats.total} color="text-cyan-400" icon="📊" />
        <StatCard title="Pending" value={stats.pending} color="text-yellow-400" icon="⏳" />
        <StatCard title="In Progress" value={stats.inProgress} color="text-blue-400" icon="🚧" />
        <StatCard title="Resolved" value={stats.resolved} color="text-green-400" icon="✅" />
      </div>

      {/* Complaints Table */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Recent Complaints</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
                <th className="p-3">Service</th>
                <th className="p-3">Area / Ward</th>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              {stats.totData.map((data) => (
                <tr className="border-b border-gray-700 hover:bg-gray-700/50" key={data.id}>
                  <td className="p-3">{data.description}</td>
                  <td className="p-3">{data.location}</td>
                  <td className="p-3">{data.title}</td>
                  <td className={`p-3 font-semibold ${statusColors[data.status] || "text-gray-400"}`}>
                    {data.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Government Announcements</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">⚡</span> Power maintenance scheduled on 10th Sept in Ward 5.
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">🛣️</span> Road repair drive starting from 12th Sept.
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">🗑️</span> Special sanitation campaign in Ward 9 next week.
          </li>
        </ul>
      </div>

      {/* Admin Tools */}
      {userRole === "admin" && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">Admin Tools</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-cyan-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-cyan-700">
              Manage Workers
            </button>
            <button className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700">
              Generate Reports
            </button>
          </div>
        </div>
      )}


      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Contact Information</h2>
        <div className="space-y-3 text-gray-300">
          <p className="flex items-center">
            <span className="text-cyan-400 mr-3">📍</span> Municipal Office, Main Road, Guntur city
          </p>
          <p className="flex items-center">
            <span className="text-cyan-400 mr-3">📞</span> +91 98765 43210
          </p>
          <p className="flex items-center">
            <span className="text-cyan-400 mr-3">✉️</span> support@govportal.in
          </p>
          <p className="flex items-center">
            <span className="text-cyan-400 mr-3">⏰</span> Mon – Fri: 9 AM – 6 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
