const StatCard = ({ icon, label, value, bg = 'bg-primary-light', color = 'text-primary' }) => (
  <div className="card flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${bg} ${color}`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <h4 className="text-sm text-slate-500">{label}</h4>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

export default StatCard;
