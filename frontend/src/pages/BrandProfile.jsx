import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import * as brandService from '../services/brandService';
import * as campaignService from '../services/campaignService';

const emptyBrand = { companyName: '', industry: '', location: '', website: '', description: '' };

const BrandProfile = () => {
  const [brand, setBrand] = useState(emptyBrand);
  const [campaigns, setCampaigns] = useState([]);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await brandService.getMyBrand();
        setBrand({ ...emptyBrand, ...data });
        const camps = await campaignService.getCampaigns({ mine: 'true', status: 'active' });
        setCampaigns(camps);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await brandService.updateBrand(brand);
      setBrand(data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout
      title="Company Profile"
      action={
        <button className="btn btn-secondary" onClick={() => setEditing((e) => !e)}>
          <i className="fa-regular fa-pen-to-square"></i> {editing ? 'Cancel' : 'Edit Company Details'}
        </button>
      }
    >
      <div className="card mb-8">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-xl font-bold">{brand.companyName || 'Your Company'}</h1>
            <p className="text-slate-500">
              <i className="fa-solid fa-location-dot"></i> {brand.location || 'Location'} •{' '}
              {brand.industry || 'Industry'}
            </p>
          </div>
          {brand.website && (
            <a href={brand.website} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <i className="fa-solid fa-link"></i> Website
            </a>
          )}
        </div>
        {!editing && <p className="text-slate-600 max-w-2xl">{brand.description || 'No description yet.'}</p>}

        {editing && (
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium block mb-1">Company Name</label>
              <input
                className="input-field"
                value={brand.companyName}
                onChange={(e) => setBrand({ ...brand, companyName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Industry</label>
              <input
                className="input-field"
                value={brand.industry}
                onChange={(e) => setBrand({ ...brand, industry: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Location</label>
              <input
                className="input-field"
                value={brand.location}
                onChange={(e) => setBrand({ ...brand, location: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Website</label>
              <input
                className="input-field"
                value={brand.website}
                onChange={(e) => setBrand({ ...brand, website: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium block mb-1">Description</label>
              <textarea
                className="input-field"
                rows={3}
                value={brand.description}
                onChange={(e) => setBrand({ ...brand, description: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>

      <section className="card">
        <h3 className="font-semibold mb-4">Public Campaigns ({campaigns.length})</h3>
        <div className="flex flex-col gap-3">
          {campaigns.map((c) => (
            <div
              key={c._id}
              className="flex justify-between items-center border border-slate-200 rounded-lg p-4"
            >
              <div>
                <h4 className="font-medium">{c.title}</h4>
                <p className="text-xs text-slate-500">
                  ${c.budget?.min}-${c.budget?.max} • {c.platform?.join(', ')}
                </p>
              </div>
              <Link to={`/campaigns/${c._id}`} className="btn btn-primary py-1.5 px-3 text-sm">
                View
              </Link>
            </div>
          ))}
          {campaigns.length === 0 && (
            <p className="text-slate-400 text-sm">No active campaigns published yet.</p>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default BrandProfile;
