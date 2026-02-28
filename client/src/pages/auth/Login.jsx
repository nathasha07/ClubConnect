import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/api";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save role
      localStorage.setItem("role", res.data.user.role);

      // Save full user in context
      setUser(res.data.user);

      toast.success("Login successful");

      // 🔥 Role-based redirect
      if (res.data.user.role === "Admin") {
        navigate("/dashboard/admin/clubs");
      } else if (res.data.user.role === "Coordinator") {
        navigate("/dashboard/events/create");
      } else {
        navigate("/dashboard/events");
      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-3 rounded-xl2 border border-gray-200 focus:outline-primary"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading} className="btn-primary mt-2">
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Test Credentials Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900 mb-3">📝 Test Credentials:</p>
          <div className="space-y-2 text-sm text-blue-800">
            <div>
              <strong>Admin:</strong> admin@test.com / password123
            </div>
            <div>
              <strong>Coordinator:</strong> coordinator@test.com / password123
            </div>
            <div>
              <strong>Student:</strong> student@test.com / password123
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
