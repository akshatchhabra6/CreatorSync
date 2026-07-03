import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import * as campaignService from '../services/campaignService';
import * as applicationService from '../services/applicationService';

const CampaignDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    campaignService.getCampaignById(id).then(setCampaign).catch(console.error);
  }, [id]);

  const handleApply = async () => {
    try {
      await applicationService.applyToCampaign({ campaignId: id, proposal: '', price: 0 });
      setApplied(true);
      setMessage('Application submitted successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not apply.');
    }
  };

  if (!campaign) {
    return (
      <DashboardLayout title="Campaign Details">
        <p className="text-slate-400">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="card mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
            {campaign.brand?.companyName?.charAt(0) || '?'}
          </div>
          <div>
            <h1 className="text-xl font-bold">{campaign.title}</h1>
            <p className="text-slate-500">By {campaign.brand?.companyName}</p>
          </div>
          {user?.role === 'creator' && (
            <button
              onClick={handleApply}
              disabled={applied}
              className="btn btn-primary ml-auto"
            >
              {applied ? 'Applied' : 'Apply Now'}
            </button>
          )}
        </div>
        {message && <p className="text-sm text-primary mb-2">{message}</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-primary-light/40 rounded-lg p-3">
            <div className="text-xs text-slate-500">Budget</div>
            <div className="font-bold">
              ${campaign.budget?.min}-${campaign.budget?.max}
            </div>
          </div>
          <div className="bg-primary-light/40 rounded-lg p-3">
            <div className="text-xs text-slate-500">Platform</div>
            <div className="font-bold">{campaign.platform?.join(', ')}</div>
          </div>
          <div className="bg-primary-light/40 rounded-lg p-3">
            <div className="text-xs text-slate-500">Niche</div>
            <div className="font-bold">{campaign.niche}</div>
          </div>
          <div className="bg-primary-light/40 rounded-lg p-3">
            <div className="text-xs text-slate-500">Deadline</div>
            <div className="font-bold">
              {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : '—'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="card md:col-span-2">
          <h3 className="font-semibold mb-3">Campaign Overview</h3>
          <p className="text-slate-600 mb-4">{campaign.description}</p>

          {campaign.deliverables?.length > 0 && (
            <>
              <h4 className="font-medium mb-2">Deliverables</h4>
              <ul className="list-disc pl-5 text-slate-600 mb-4">
                {campaign.deliverables.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </>
          )}

          {campaign.usageRights && (
            <>
              <h4 className="font-medium mb-2">Usage Rights</h4>
              <p className="text-slate-600">{campaign.usageRights}</p>
            </>
          )}
        </section>

        <section className="card">
          <h3 className="font-semibold mb-3">Requirements</h3>
          <div className="mb-3">
            <div className="text-xs text-slate-500">Min Followers</div>
            <div className="font-semibold">{campaign.requirements?.minFollowers || 0}+</div>
          </div>
          <div className="mb-3">
            <div className="text-xs text-slate-500">Locations</div>
            <div className="font-semibold">{campaign.requirements?.locations?.join(', ') || 'Any'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Age / Gender</div>
            <div className="font-semibold">
              {campaign.requirements?.ageRange || 'Any'} • {campaign.requirements?.gender || 'Any'}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CampaignDetails;
