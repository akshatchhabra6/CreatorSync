import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50">
    <header className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-xl font-bold text-primary">
        <i className="fa-solid fa-bolt"></i> CreatorSync
      </div>
      <div className="flex gap-3">
        <Link to="/login" className="btn btn-ghost">
          Log In
        </Link>
        <Link to="/signup" className="btn btn-primary">
          Sign Up
        </Link>
      </div>
    </header>

    <main className="max-w-4xl mx-auto text-center px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Where Creators & Brands <span className="text-primary">Collaborate</span>
      </h1>
      <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
        CreatorSync streamlines influencer marketing — post campaigns, discover creators, and manage
        collaborations, all in one transparent platform.
      </p>
      <div className="flex gap-4 justify-center">
        <Link to="/signup?role=creator" className="btn btn-primary text-base px-6 py-3">
          I'm a Creator
        </Link>
        <Link to="/signup?role=brand" className="btn btn-secondary text-base px-6 py-3">
          I'm a Brand
        </Link>
      </div>
    </main>
  </div>
);

export default Landing;
