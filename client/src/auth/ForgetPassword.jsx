import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card,  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { forgetSchema } from '@/schema/AuthSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const DEFAULT_VALUE = { email: '' };

const ForgetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(forgetSchema),
  });

  const Submit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-foreground text-2xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Enter your email and we'll send you a reset link.
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
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Send Reset Link
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </Field>
        </form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
