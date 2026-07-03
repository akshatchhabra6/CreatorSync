const mongoose = require('mongoose');

const creatorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    bio: { type: String, default: '' },
    niche: { type: String, default: '' },
    location: { type: String, default: '' },
    followers: {
      instagram: { type: Number, default: 0 },
      youtube: { type: Number, default: 0 },
      tiktok: { type: Number, default: 0 },
    },
    engagementRate: { type: Number, default: 0 },
    portfolio: [{ type: String }], // image/video URLs (Cloudinary)
    audienceInsights: {
      topAgeGroup: { type: String, default: '' },
      topLocation: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CreatorProfile', creatorProfileSchema);
