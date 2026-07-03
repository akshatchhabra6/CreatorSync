import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatorDashboard from './pages/CreatorDashboard';
import CreatorProfile from './pages/CreatorProfile';
import BrandDashboard from './pages/BrandDashboard';
import BrandProfile from './pages/BrandProfile';
import DiscoverCampaigns from './pages/DiscoverCampaigns';
import CampaignDetails from './pages/CampaignDetails';
import NewCampaign from './pages/NewCampaign';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/creator/dashboard"
        element={
          <ProtectedRoute role="creator">
            <CreatorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/creator/profile"
        element={
          <ProtectedRoute role="creator">
            <CreatorProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/brand/dashboard"
        element={
          <ProtectedRoute role="brand">
            <BrandDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/profile"
        element={
          <ProtectedRoute role="brand">
            <BrandProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/brand/campaigns/new"
        element={
          <ProtectedRoute role="brand">
            <NewCampaign />
          </ProtectedRoute>
        }
      />

      <Route
        path="/campaigns"
        element={
          <ProtectedRoute>
            <DiscoverCampaigns />
          </ProtectedRoute>
        }
      />
      <Route
        path="/campaigns/:id"
        element={
          <ProtectedRoute>
            <CampaignDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
