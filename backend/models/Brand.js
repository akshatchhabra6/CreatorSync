const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    companyName: { type: String, required: true },
    logo: { type: String, default: '' },
    website: { type: String, default: '' },
    industry: { type: String, default: '' },
    location: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Brand', brandSchema);
