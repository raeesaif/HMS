import { Card } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '@/schema/AuthSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const DEFAULT_VALUE = {
  email: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();

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
    console.log(data);
    reset;
  };
  return (
    <>
      <div>
        <div className="mb-2">
          <h1 className="text-foreground text-2xl">Welcome back </h1>
          <p className="text-foreground/70 text-sm">
            Sign in to access your dashboard.
          </p>
        </div>
        <Card className="p-6 w-3xl">
          <form onSubmit={handleSubmit(Submit)}>
            <Field className="space-y-2">
              <FieldLabel>Email</FieldLabel>
              <Input {...register('email')} type="email" placeholder="Email" />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <div className="flex justify-between text-center">
                <FieldLabel>Password</FieldLabel>
                <Button
                  onClick={() => navigate('/forget-password')}
                  variant="link"
                  className="cursor-pointer"
                >
                  Forgot Password?
                </Button>
              </div>
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <Button type="submit" className="py-4 px-3 cursor-pointer">
                Login
              </Button>
            </Field>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
