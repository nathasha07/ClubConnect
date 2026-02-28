export const navigationConfig = {
  Student: [
    { name: "Dashboard", path: "" },
    { name: "Clubs", path: "clubs" },
    { name: "Events", path: "events" },
    { name: "My Registrations", path: "registrations" },
    { name: "Certificates", path: "certificates" },
    { name: "Duty Leave", path: "duty-leave" },
    { name: "Participation History", path: "history" },
  ],
  Coordinator: [
    { name: "Dashboard", path: "" },
    { name: "Create Event", path: "events/create" },
    { name: "Event Registrations", path: "events/registrations" },
    { name: "Duty Leave Requests", path: "duty-leave/manage" },
  ],
  Admin: [
    { name: "Dashboard", path: "" },
    { name: "Create Club", path: "admin/clubs/create" },
    { name: "View Clubs", path: "admin/clubs" },
    { name: "Approve Events", path: "admin/events/approve" },
    { name: "Analytics", path: "admin/analytics" },
  ],
};
