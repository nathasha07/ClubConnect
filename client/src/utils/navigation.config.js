export const navigationConfig = {
  student: [
    { name: "Dashboard", path: "" },
    { name: "Clubs", path: "clubs" },
    { name: "Events", path: "events" },
    { name: "My Registrations", path: "registrations" },
    { name: "Certificates", path: "certificates" },
    { name: "Duty Leave", path: "duty-leave" },
    { name: "Participation History", path: "history" },
  ],
  coordinator: [
    { name: "Dashboard", path: "" },
    { name: "Create Event", path: "events/create" },
    { name: "Event Registrations", path: "events/registrations" },
    { name: "Duty Leave Requests", path: "duty-leave/manage" },
  ],
  admin: [
    { name: "Dashboard", path: "" },
    { name: "Approve Clubs", path: "admin/clubs" },
    { name: "Approve Coordinators", path: "admin/coordinators" },
    { name: "Analytics", path: "admin/analytics" },
  ],
};
