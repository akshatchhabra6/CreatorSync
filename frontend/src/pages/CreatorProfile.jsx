import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import * as creatorService from '../services/creatorService';

const emptyProfile = {
  bio: '',
  niche: '',
  location: '',
  followers: { instagram: 0, youtube: 0, tiktok: 0 },
  engagementRate: 0,
};

const CreatorProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await creatorService.getMyCreatorProfile();
        setProfile({ ...emptyProfile, ...data });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await creatorService.updateCreatorProfile(profile);
      setProfile(data);
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout
      title="My Profile"
      action={
        <button className="btn btn-secondary" onClick={() => setEditing((e) => !e)}>
          <i className="fa-regular fa-pen-to-square"></i> {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      }
    >
      <div className="card text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <h1 className="text-xl font-bold">{user?.name}</h1>
        <p className="text-slate-500 mb-4">{profile.niche || 'Add your niche'}</p>
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          <span className="badge bg-primary-light text-primary">
            <i className="fa-brands fa-instagram"></i> {profile.followers?.instagram || 0}
          </span>
          <span className="badge bg-accent-light text-accent">
            <i className="fa-brands fa-tiktok"></i> {profile.followers?.tiktok || 0}
          </span>
          <span className="badge bg-red-50 text-red-500">
            <i className="fa-brands fa-youtube"></i> {profile.followers?.youtube || 0}
          </span>
        </div>
        {!editing && (
          <p className="max-w-xl mx-auto text-slate-600">{profile.bio || 'No bio yet.'}</p>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="card grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium block mb-1">Bio</label>
            <textarea
              className="input-field"
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Niche</label>
            <input
              className="input-field"
              value={profile.niche}
              onChange={(e) => setProfile({ ...profile, niche: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Location</label>
            <input
              className="input-field"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Instagram Followers</label>
            <input
              type="number"
              className="input-field"
              value={profile.followers?.instagram || 0}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  followers: { ...profile.followers, instagram: Number(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">TikTok Followers</label>
            <input
              type="number"
              className="input-field"
              value={profile.followers?.tiktok || 0}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  followers: { ...profile.followers, tiktok: Number(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">YouTube Subscribers</label>
            <input
              type="number"
              className="input-field"
              value={profile.followers?.youtube || 0}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  followers: { ...profile.followers, youtube: Number(e.target.value) },
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Engagement Rate (%)</label>
            <input
              type="number"
              step="0.1"
              className="input-field"
              value={profile.engagementRate || 0}
              onChange={(e) => setProfile({ ...profile, engagementRate: Number(e.target.value) })}
            />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </DashboardLayout>
  );
};

export default CreatorProfile;
