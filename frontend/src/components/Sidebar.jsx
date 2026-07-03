import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const creatorLinks = [
  { to: '/creator/dashboard', label: 'Dashboard', icon: 'fa-house' },
  { to: '/creator/profile', label: 'My Profile', icon: 'fa-user' },
  { to: '/campaigns', label: 'Discover Campaigns', icon: 'fa-compass' },
];

const brandLinks = [
  { to: '/brand/dashboard', label: 'Dashboard', icon: 'fa-house' },
  { to: '/brand/profile', label: 'Company Profile', icon: 'fa-building' },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const links = user?.role === 'brand' ? brandLinks : creatorLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col p-4 min-h-screen">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-8 px-2">
        <i className="fa-solid fa-bolt"></i>
        <span>CreatorSync</span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === link.to
                ? 'bg-primary-light text-primary'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className={`fa-solid ${link.icon} w-4`}></i>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-200 pt-4 mt-4">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="text-sm">
            <div className="font-semibold">{user?.name}</div>
            <div className="text-slate-400 capitalize">{user?.role}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost w-full justify-start text-sm">
          <i className="fa-solid fa-right-from-bracket"></i> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
