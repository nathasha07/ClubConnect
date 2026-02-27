const StatCard = ({ title, value, icon }) => {
  return (
    <div className="glass-card p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-semibold mt-2">{value}</h3>
      </div>

      <div className="text-primary text-3xl">{icon}</div>
    </div>
  );
};

export default StatCard;
