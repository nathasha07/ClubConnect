const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-softBg">
      <div className="glass-card p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Campus Club Portal
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
