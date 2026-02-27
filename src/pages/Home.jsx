import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-softBg text-darkText">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-primary">CampusClub Portal</h1>

        <div className="flex gap-6 items-center">
          <Link
            to="/login"
            className="text-gray-600 hover:text-primary transition"
          >
            Login
          </Link>

          <Link to="/dashboard" className="btn-primary px-5 py-2">
            Go to Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-5xl font-bold mb-6 max-w-3xl leading-tight">
          Manage Campus Clubs, Events & Certifications in One Unified Platform
        </h2>

        <p className="text-gray-600 max-w-2xl mb-10 text-lg">
          A complete management system for students, coordinators, and
          administrators to handle club activities, event registrations,
          certificates, and duty leave approvals.
        </p>

        <div className="flex gap-6">
          <Link to="/login" className="btn-primary px-6 py-3 text-lg">
            Get Started
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl2 border border-primary text-primary hover:bg-lightPink transition"
          >
            Explore Dashboard
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-10 py-20">
        <h3 className="text-3xl font-semibold text-center mb-16">
          Platform Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="glass-card p-8 text-center">
            <h4 className="text-xl font-semibold mb-4">Student Experience</h4>
            <p className="text-gray-600">
              Join clubs, register for events, download certificates, and track
              participation history seamlessly.
            </p>
          </div>

          <div className="glass-card p-8 text-center">
            <h4 className="text-xl font-semibold mb-4">Coordinator Tools</h4>
            <p className="text-gray-600">
              Create events, manage registrations, mark attendance, and generate
              certificates with QR verification.
            </p>
          </div>

          <div className="glass-card p-8 text-center">
            <h4 className="text-xl font-semibold mb-4">Admin Control</h4>
            <p className="text-gray-600">
              Approve clubs and coordinators, monitor analytics, and maintain
              governance across the campus.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-white border-t">
        <p className="text-gray-500">
          © 2026 CampusClub Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
