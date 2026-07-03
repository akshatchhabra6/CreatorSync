const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    proposal: { type: String, default: '' },
    price: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

applicationSchema.index({ campaign: 1, creator: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
