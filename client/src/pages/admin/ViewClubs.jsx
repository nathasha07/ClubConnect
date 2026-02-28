import { useState, useEffect } from "react";
import API from "../../services/api.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ViewClubs() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const response = await API.get("/clubs");
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      toast.error("Failed to fetch clubs");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (club) => {
    setEditingId(club._id);
    setEditData({
      name: club.name,
      description: club.description,
      category: club.category,
      status: club.status
    });
  };

  const handleUpdate = async (clubId) => {
    try {
      await API.put(`/clubs/${clubId}`, editData);
      toast.success("Club updated successfully!");
      setEditingId(null);
      fetchClubs();
    } catch (error) {
      console.error("Error updating club:", error);
      toast.error(error.response?.data?.message || "Failed to update club");
    }
  };

  const handleDelete = async (clubId) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;

    try {
      await API.delete(`/clubs/${clubId}`);
      toast.success("Club deleted successfully!");
      fetchClubs();
    } catch (error) {
      console.error("Error deleting club:", error);
      toast.error(error.response?.data?.message || "Failed to delete club");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <p className="text-lg text-slate-600">Loading clubs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Manage Clubs</h1>
          <button
            onClick={() => navigate("/dashboard/admin/clubs/create")}
            className="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 transition"
          >
            + Create New Club
          </button>
        </div>

        {clubs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-slate-600 mb-4">No clubs created yet</p>
            <button
              onClick={() => navigate("/dashboard/admin/clubs/create")}
              className="bg-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-700 transition"
            >
              Create First Club
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {clubs.map((club) => (
              <div key={club._id} className="bg-white rounded-lg shadow-md p-6">
                {editingId === club._id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Club Name
                        </label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={editData.category}
                          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        >
                          <option value="Academic">Academic</option>
                          <option value="Sports">Sports</option>
                          <option value="Cultural">Cultural</option>
                          <option value="Technical">Technical</option>
                          <option value="Social Service">Social Service</option>
                          <option value="Arts & Entertainment">Arts & Entertainment</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        rows="3"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Status
                      </label>
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => handleUpdate(club._id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{club.name}</h3>
                        <div className="flex gap-3 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {club.category}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              club.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {club.status}
                          </span>
                        </div>
                        <p className="text-slate-600">{club.description}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <p className="text-sm text-slate-600 mb-2">
                        <strong>Members:</strong> {club.members?.length || 0}
                      </p>
                      {club.facultyCoordinator && (
                        <p className="text-sm text-slate-600 mb-4">
                          <strong>Faculty Coordinator:</strong> {
                            typeof club.facultyCoordinator === 'object' 
                              ? club.facultyCoordinator.name 
                              : club.facultyCoordinator
                          }
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => handleEdit(club)}
                        className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(club._id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
