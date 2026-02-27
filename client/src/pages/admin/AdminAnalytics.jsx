import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import Card from "../../components/ui/Card";

const AdminAnalytics = () => {
  const monthlyData = [
    { month: "Jan", registrations: 120 },
    { month: "Feb", registrations: 210 },
    { month: "Mar", registrations: 180 },
    { month: "Apr", registrations: 250 },
  ];

  const clubDistribution = [
    { name: "Coding", value: 40 },
    { name: "Robotics", value: 25 },
    { name: "Design", value: 20 },
    { name: "Other", value: 15 },
  ];

  const certificateTrend = [
    { month: "Jan", certificates: 60 },
    { month: "Feb", certificates: 110 },
    { month: "Mar", certificates: 95 },
    { month: "Apr", certificates: 150 },
  ];

  const COLORS = ["#E91E63", "#AD1457", "#F8BBD0", "#FF80AB"];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Advanced Analytics</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Line Chart */}
        <Card>
          <h3 className="mb-4 font-semibold">Monthly Registrations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="registrations"
                stroke="#E91E63"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card>
          <h3 className="mb-4 font-semibold">Club Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={clubDistribution} dataKey="value" outerRadius={100}>
                {clubDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card>
          <h3 className="mb-4 font-semibold">Certificate Issuance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={certificateTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="certificates" fill="#AD1457" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
