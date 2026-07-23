import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex bg-primary text-primary-foreground p-12 flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold">MediCore</h2>
          <p className="text-primary-foreground/70">Hospital Management System</p>
        </div>

        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Care coordinated.
            <br />
            Records unified.
            <br />
            Every ward under one roof.
          </h1>
          <p className="mt-8 text-lg text-primary-foreground/80">
            A trusted platform for admins, doctors, nurses and receptionists to
            manage patients, appointments and inventory in real time.
          </p>
          <p className="mt-8 text-sm text-primary-foreground/60">
            HIPAA-aware • Role-based access • Encrypted records
          </p>
        </div>

        <p className="text-sm text-primary-foreground/50">© 2026 MediCore Health Systems</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
