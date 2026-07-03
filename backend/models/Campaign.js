const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    deadline: { type: Date, required: true },
    platform: [{ type: String }], // e.g. ['Instagram', 'TikTok']
    niche: { type: String, default: '' },
    deliverables: [{ type: String }],
    usageRights: { type: String, default: '' },
    requirements: {
      minFollowers: { type: Number, default: 0 },
      locations: [{ type: String }],
      ageRange: { type: String, default: '' },
      gender: { type: String, default: 'Any' },
    },
    status: { type: String, enum: ['draft', 'active', 'completed'], default: 'draft' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);
