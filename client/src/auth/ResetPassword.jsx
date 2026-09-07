import { useState } from 'react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPasswordSchema } from '@/schema/AuthSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeOff, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useResetPassword } from '@/hooks/useAuth';

const DEFAULT_VALUE = { newPassword: '', confirmPassword: '' };

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const resetPassword = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(resetPasswordSchema),
  });

  const Submit = (data) => {
    resetPassword.mutate(
      { email, token, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success('Password reset successfully. Please sign in.');
          navigate('/login');
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message ?? 'Unable to reset password. Please request a new link.'
          );
        },
      }
    );
  };

  if (!email || !token) {
    return (
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-foreground text-2xl font-bold">Invalid Reset Link</h1>
          <p className="text-muted-foreground text-sm mt-1">
            This password reset link is missing or invalid.
          </p>
        </div>
        <Card className="p-6">
          <Button
            type="button"
            className="w-full cursor-pointer"
            onClick={() => navigate('/forget-password')}
          >
            Request a New Link
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-foreground text-2xl font-bold">Reset Password</h1>
        <p className="text-muted-foreground text-sm mt-1">Choose a new password for {email}.</p>
      </div>
      <Card className="p-6">
        <form onSubmit={handleSubmit(Submit)}>
          <Field className="space-y-4">
            <div className="space-y-1">
              <FieldLabel>New Password</FieldLabel>
              <div className="relative">
                <Input
                  {...register('newPassword')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-destructive text-sm">{errors.newPassword.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <FieldLabel>Confirm New Password</FieldLabel>
              <Input
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter new password"
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={resetPassword.isPending}>
              {resetPassword.isPending ? 'Resetting…' : 'Reset Password'}
            </Button>
          </Field>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
