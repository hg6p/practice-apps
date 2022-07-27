import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

type FormValues = {
  email: string;
};
const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};
const ForgotPassword = () => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit(async (data) => {
    await forgotPassword({
      email: data.email,
    });
    setComplete(true);

    console.log('erros', errors);
  });

  return complete ? (
    <Box>If an account with that email exists we sent you an email</Box>
  ) : (
    <form onSubmit={onSubmit}>
      <FormControl
        display="flex"
        alignItems="center"
        flexWrap={'wrap'}
        maxW={'620px'}
        justifyContent="center"
      >
        <FormLabel htmlFor="email">Email </FormLabel>
        <Input id="email" placeholder="email" {...register('email')} />
        <Button
          display={'block'}
          ml={'auto'}
          mr={'auto'}
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
};
export default withUrqlClient(createUrqlClient)(ForgotPassword);
