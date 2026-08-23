import { Card } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '@/schema/AuthSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useLogin } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authstore';
const DEFAULT_VALUE = { email: '', password: '' };

const ROLE_DASHBOARD_PATH = {
  superadmin: '/super-admin/dashboard',
  admin: '/admin/dashboard',
  doctor: '/doctor/dashboard',
  nurse: '/nurse/dashboard',
  receptionist: '/reception/dashboard',
  patient: '/patient/dashboard',
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(LoginSchema),
  });

  const Submit = (data) => {
    login.mutate(data, {
      onSuccess: ({ accessToken, refreshToken, user }) => {
        setAuth({ user, accessToken, refreshToken });
        toast.success(`Welcome back, ${user.firstName}!`);
        reset();
        navigate(ROLE_DASHBOARD_PATH[user.role] ?? '/');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message ?? 'Invalid email or password');
      },
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-foreground text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Sign in to access your dashboard.
        </p>
      </div>
      <Card className="p-6">
        <form onSubmit={handleSubmit(Submit)}>
          <Field className="space-y-4">
            <div className="space-y-1">
              <FieldLabel>Email</FieldLabel>
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <FieldLabel>Password</FieldLabel>
                <Button
                  type="button"
                  onClick={() => navigate('/forget-password')}
                  variant="link"
                  className="cursor-pointer p-0 h-auto text-sm"
                >
                  Forgot Password?
                </Button>
              </div>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer "
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={login.isPending}>
              {login.isPending ? 'Signing in...' : 'Login'}
            </Button>
          </Field>
        </form>
      </Card>
    </div>
  );
};

export default Login;
