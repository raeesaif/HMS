import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@base-ui/react';
import { forgetSchema } from '@/schema/AuthSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
const DEFAULT_VALUE = {
  email: '',
};

const ForgetPassword = () => {
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
    reset;
  };

  return (
    <>
      <Card className="p-6 w-2xl ">
        <CardTitle className="text-center text-foreground ">
          Forget Password
        </CardTitle>
        <form onSubmit={handleSubmit(Submit)}>
          <Field className="space-y-2">
            <FieldLabel htmlFor="text-foreground ">Email</FieldLabel>
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <Button
              type="submit"
              className="bg-primary text-white w-full py-3 px-3 rounded-lg cursor-pointer"
            >
              Send Email
            </Button>
          </Field>
        </form>
      </Card>
    </>
  );
};

export default ForgetPassword;
