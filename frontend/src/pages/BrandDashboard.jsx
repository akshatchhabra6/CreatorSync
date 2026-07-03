import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import * as campaignService from '../services/campaignService';
import * as applicationService from '../services/applicationService';

const statusStyles = {
  draft: 'bg-accent-light text-accent',
  active: 'bg-primary-light text-primary',
  completed: 'bg-emerald-50 text-emerald-600',
};

const BrandDashboard = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const camps = await campaignService.getCampaigns({ mine: 'true' });
        setCampaigns(camps);
        const apps = await applicationService.getApplications();
        const counts = {};
        apps.forEach((a) => {
          const cid = a.campaign?._id || a.campaign;
          counts[cid] = (counts[cid] || 0) + 1;
        });
        setApplicantCounts(counts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalApplicants = Object.values(applicantCounts).reduce((a, b) => a + b, 0);

  return (
    <DashboardLayout
      title={`${user?.name || 'Brand'} Dashboard 📈`}
      subtitle="Manage your active campaigns and review creator applications."
      action={
        <Link to="/brand/campaigns/new" className="btn btn-primary">
          <i className="fa-solid fa-plus"></i> New Campaign
        </Link>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon="fa-bullhorn"
          label="Active Campaigns"
          value={campaigns.filter((c) => c.status === 'active').length}
        />
        <StatCard
          icon="fa-users"
          label="Total Applicants"
          value={totalApplicants}
          bg="bg-accent-light"
          color="text-accent"
        />
        <StatCard
          icon="fa-list"
          label="Total Campaigns"
          value={campaigns.length}
          bg="bg-emerald-50"
          color="text-emerald-600"
        />
      </div>

      <section className="card">
        <h3 className="font-semibold mb-4">Recent Campaigns</h3>
        {loading && <p className="text-slate-400 text-sm">Loading...</p>}
        {!loading && campaigns.length === 0 && (
          <p className="text-slate-400 text-sm">No campaigns yet — create your first one!</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400">
                <th className="py-2 font-medium">Campaign Name</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Applicants</th>
                <th className="py-2 font-medium">Budget</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c._id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 font-medium">{c.title}</td>
                  <td className="py-3">
                    <span className={`badge ${statusStyles[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="py-3">{applicantCounts[c._id] || 0}</td>
                  <td className="py-3">
                    ${c.budget?.min}-${c.budget?.max}
                  </td>
                  <td className="py-3">
                    <Link to={`/campaigns/${c._id}`} className="text-primary font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default BrandDashboard;
