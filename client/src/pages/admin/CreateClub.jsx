import { useState } from "react";
import API from "../../services/api.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateClub() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    facultyCoordinator: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      toast.error("Club name and category are required");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/clubs", formData);
      toast.success("Club created successfully!");
      setFormData({ name: "", description: "", category: "", facultyCoordinator: "" });
      navigate("/dashboard/admin/clubs");
    } catch (error) {
      console.error("Error creating club:", error);
      toast.error(error.response?.data?.message || "Failed to create club");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Create New Club</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {/* Club Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Club Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Science Club"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Club description and objectives"
              rows="4"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              <option value="Academic">Academic</option>
              <option value="Sports">Sports</option>
              <option value="Cultural">Cultural</option>
              <option value="Technical">Technical</option>
              <option value="Social Service">Social Service</option>
              <option value="Arts & Entertainment">Arts & Entertainment</option>
            </select>
          </div>

          {/* Faculty Coordinator */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Faculty Coordinator Email
            </label>
            <input
              type="email"
              name="facultyCoordinator"
              value={formData.facultyCoordinator}
              onChange={handleChange}
              placeholder="faculty@college.edu"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-slate-500 mt-2">
              💡 Optional: Enter the faculty advisor's email for reference
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 transition"
            >
              {loading ? "Creating..." : "Create Club"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/admin/clubs")}
              className="flex-1 bg-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
