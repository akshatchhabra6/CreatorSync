import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import * as campaignService from '../services/campaignService';

const NewCampaign = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    platform: '',
    niche: '',
    status: 'active',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        description: form.description,
        budget: { min: Number(form.budgetMin), max: Number(form.budgetMax) },
        deadline: form.deadline,
        platform: form.platform.split(',').map((p) => p.trim()).filter(Boolean),
        niche: form.niche,
        status: form.status,
      };
      const campaign = await campaignService.createCampaign(payload);
      navigate(`/campaigns/${campaign._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create campaign.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Create Campaign" subtitle="Post a new collaboration opportunity for creators.">
      {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="card grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1">Campaign Title</label>
          <input
            className="input-field"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1">Description</label>
          <textarea
            className="input-field"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Min Budget ($)</label>
          <input
            type="number"
            className="input-field"
            value={form.budgetMin}
            onChange={(e) => setForm({ ...form, budgetMin: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Max Budget ($)</label>
          <input
            type="number"
            className="input-field"
            value={form.budgetMax}
            onChange={(e) => setForm({ ...form, budgetMax: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Deadline</label>
          <input
            type="date"
            className="input-field"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Platforms (comma-separated)</label>
          <input
            className="input-field"
            placeholder="Instagram, TikTok"
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Niche</label>
          <input
            className="input-field"
            value={form.niche}
            onChange={(e) => setForm({ ...form, niche: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Status</label>
          <select
            className="input-field"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? 'Publishing...' : 'Publish Campaign'}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default NewCampaign;
