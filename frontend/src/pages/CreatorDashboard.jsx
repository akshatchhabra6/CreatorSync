```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import * as applicationService from '../services/applicationService';
import * as campaignService from '../services/campaignService';

const statusStyles = {
  pending: 'bg-amber-100 text-amber-700',
  accepted: 'bg-primary-light text-primary',
  rejected: 'bg-red-100 text-red-600',
};

const CreatorDashboard = () => {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [apps, camps] = await Promise.all([
          applicationService.getApplications(),
          campaignService.getCampaigns({ status: 'active' }),
        ]);

        setApplications(apps);
        setCampaigns(camps.slice(0, 3));
      } catch (err) {
        console.error('Failed to load creator dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const activeCount = applications.filter(
    (app) => app.status === 'accepted'
  ).length;

  const pendingCount = applications.filter(
    (app) => app.status === 'pending'
  ).length;

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Creator'} 👋`}
      subtitle="Here's what's happening with your collaborations today."
      action={
        <Link to="/campaigns" className="btn btn-primary">
          Find Campaigns
        </Link>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon="fa-bullhorn"
          label="Active Collabs"
          value={activeCount}
        />

        <StatCard
          icon="fa-file-lines"
          label="Total Applications"
          value={applications.length}
          bg="bg-accent-light"
          color="text-accent"
        />

        <StatCard
          icon="fa-hourglass-half"
          label="Pending Review"
          value={pendingCount}
          bg="bg-emerald-50"
          color="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="card lg:col-span-2">
          <h3 className="font-semibold mb-4">Recent Applications</h3>

          {loading && (
            <p className="text-slate-400 text-sm">Loading...</p>
          )}

          {!loading && applications.length === 0 && (
            <p className="text-slate-400 text-sm">
              No applications yet. Go find a campaign!
            </p>
          )}

          <div className="flex flex-col divide-y divide-slate-100">
            {applications.map((app) => (
              <div
                key={app._id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <div className="font-medium">
                    {app.campaign?.title || 'Campaign'}
                  </div>

                  <div className="text-xs text-slate-400">
                    {app.campaign?.brand?.companyName || ''}
                  </div>
                </div>

                <span className={`badge ${statusStyles[app.status] || ''}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h3 className="font-semibold mb-4">Recommended</h3>

          <div className="flex flex-col gap-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="border border-slate-200 rounded-lg p-3"
              >
                <h4 className="font-medium mb-1">
                  {campaign.title}
                </h4>

                <p className="text-xs text-slate-500 mb-2">
                  {campaign.brand?.companyName}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-accent">
                    ₹{campaign.budget?.min}-₹{campaign.budget?.max}
                  </span>

                  <Link
                    to={`/campaigns/${campaign._id}`}
                    className="btn btn-primary py-1.5 px-3 text-sm"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))}

            {!loading && campaigns.length === 0 && (
              <p className="text-slate-400 text-sm">
                No active campaigns right now.
              </p>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CreatorDashboard;
```
