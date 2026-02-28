import { useState, useEffect } from "react";
import API from "../../services/api.js";
import { toast } from "react-hot-toast";

export default function ApproveEvents() {
  const [pendingEvents, setpendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const fetchPendingEvents = async () => {
    try {
      setLoading(true);
      const response = await API.get("/events/pending");
      setpendingEvents(response.data);
    } catch (error) {
      console.error("Error fetching pending events:", error);
      toast.error("Failed to fetch pending events");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId) => {
    try {
      await API.put(`/events/${eventId}/approve`, {
        approvalComment: commentText
      });
      toast.success("Event approved successfully!");
      setActioningId(null);
      setCommentText("");
      fetchPendingEvents();
    } catch (error) {
      console.error("Error approving event:", error);
      toast.error(error.response?.data?.message || "Failed to approve event");
    }
  };

  const handleReject = async (eventId) => {
    if (!commentText.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    try {
      await API.put(`/events/${eventId}/reject`, {
        approvalComment: commentText
      });
      toast.success("Event rejected successfully!");
      setActioningId(null);
      setCommentText("");
      fetchPendingEvents();
    } catch (error) {
      console.error("Error rejecting event:", error);
      toast.error(error.response?.data?.message || "Failed to reject event");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <p className="text-lg text-slate-600">Loading pending events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Approve Events</h1>
        <p className="text-slate-600 mb-8">
          Review and approve events created by coordinators before they are visible to students.
        </p>

        {pendingEvents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-slate-600 text-lg">No pending events to review</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingEvents.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-slate-900">{event.title}</h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {event.approvalStatus}
                    </span>
                  </div>

                  <p className="text-slate-600 mb-4">{event.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 mb-4">
                    <div>
                      <strong>Created By:</strong> {event.createdBy?.name} ({event.createdBy?.role})
                    </div>
                    <div>
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Venue:</strong> {event.venue}
                    </div>
                    <div>
                      <strong>Category:</strong> {event.category}
                    </div>
                    {event.maxParticipants && (
                      <div>
                        <strong>Max Participants:</strong> {event.maxParticipants}
                      </div>
                    )}
                    {event.club && (
                      <div>
                        <strong>Club:</strong> {event.club?.name}
                      </div>
                    )}
                  </div>
                </div>

                {actioningId === event._id ? (
                  <div className="bg-slate-50 p-4 rounded-lg space-y-4 border-t pt-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Approval Comment
                      </label>
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment (optional for approval, required for rejection)"
                        rows="3"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(event._id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition"
                      >
                        Approve Event
                      </button>
                      <button
                        onClick={() => handleReject(event._id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition"
                      >
                        Reject Event
                      </button>
                      <button
                        onClick={() => {
                          setActioningId(null);
                          setCommentText("");
                        }}
                        className="flex-1 bg-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => setActioningId(event._id)}
                      className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 transition"
                    >
                      Review & Approve
                    </button>
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
