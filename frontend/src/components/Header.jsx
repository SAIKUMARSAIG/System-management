import { Link } from 'react-router-dom';

const Header = ({ currentUser, userRole, setCurrentUser, setUserRole }) => {
  const handleUserChange = (e) => {
    const username = e.target.value;
    setCurrentUser(username);

    
    if (username.includes('admin')) {
      setUserRole('admin');
    } else if (username.includes('worker')) {
      setUserRole('worker');
    } else {
      setUserRole('citizen');
    }
  };

  return (
    <header className="bg-gray-900 text-gray-300 shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-cyan-400 tracking-wider mb-4 md:mb-0 hover:text-cyan-300 transition-colors duration-300">
          Service System
        </Link>
        







        <nav className="flex items-center gap-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-cyan-400 transition-colors duration-300">Dashboard</Link>
          <Link to="/complaints" className="hover:text-cyan-400 transition-colors duration-300">Complaints</Link>
          {userRole === 'citizen' && (
            <Link to="/create" className="bg-cyan-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-700 transition-colors duration-300">
              Report Issue
            </Link>
          )}
        </nav>
        
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <select 
              value={currentUser} 
              onChange={handleUserChange}
              className="appearance-none bg-gray-800 text-gray-200 pl-3 pr-8 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option value="citizen1">Citizen 1</option>
              <option value="citizen2">Citizen 2</option>
              <option value="worker1">Worker 1</option>
              <option value="worker2">Worker 2</option>
              <option value="admin">Admin</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <span className="bg-cyan-800 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            {userRole}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

