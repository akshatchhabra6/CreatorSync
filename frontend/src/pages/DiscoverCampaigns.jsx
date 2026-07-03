import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import * as campaignService from '../services/campaignService';

const DiscoverCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await campaignService.getCampaigns({ status: 'active' });
        setCampaigns(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = campaigns.filter((c) =>
    (c.title + ' ' + (c.niche || '') + ' ' + (c.brand?.companyName || ''))
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Discover Campaigns" subtitle="Find brand collaborations that fit your niche.">
      <input
        className="input-field mb-6 max-w-md"
        placeholder="Search by title, niche, or brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="text-slate-400 text-sm">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c) => (
          <div key={c._id} className="card">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{c.title}</h4>
              <span className="badge bg-primary-light text-primary">
                ${c.budget?.min}-${c.budget?.max}
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-3">{c.brand?.companyName}</p>
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{c.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">{c.platform?.join(', ')}</span>
              <Link to={`/campaigns/${c._id}`} className="btn btn-primary py-1.5 px-3 text-sm">
                View Details
              </Link>
            </div>
          </div>
        ))}
        {!loading && filtered.length === 0 && (
          <p className="text-slate-400 text-sm">No campaigns match your search.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DiscoverCampaigns;
