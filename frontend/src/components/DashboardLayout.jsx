import Sidebar from './Sidebar';

const DashboardLayout = ({ title, subtitle, action, children }) => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
      {(title || action) && (
        <header className="flex justify-between items-start mb-8">
          <div>
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
            {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </main>
  </div>
);

export default DashboardLayout;
