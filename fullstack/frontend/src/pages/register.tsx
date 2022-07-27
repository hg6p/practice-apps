import { Resolver, useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { arrToObj } from '../utils/arrToObj';
import Router from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
type FormValues = {
  username: string;
  email: string;
  password: string;
};
const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username
      ? {
          username: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : values.username.length < 4
      ? {
          username: {
            type: 'length',
            message: 'name must be longer than 4',
          },
        }
      : {},
  };
};
const Register = () => {
  const [, registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    let response = await registerUser({ options: data });
    if (response.data?.register.errors) {
      let objError = arrToObj(response.data.register.errors);
      let objKeys = Object.keys(objError);
      setError(objKeys[0] == 'username' ? 'username' : 'password', {
        type: 'manual',
        message: objError[objKeys[0]],
      });
    }
    console.log('erros', errors);

    console.log('log', response);
    Router.push('/');
  });

  return (
    <form onSubmit={onSubmit}>
      <FormControl
        display="flex"
        alignItems="center"
        flexWrap={'wrap'}
        maxW={'620px'}
        justifyContent="center"
      >
        <FormLabel htmlFor="username">username</FormLabel>
        <Input id="username" placeholder="username" {...register('username')} />
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="email"
          {...register('email', {
            minLength: {
              value: 2,
              message: 'YESSIR',
            },
          })}
        />
        <FormLabel mt="10px" htmlFor="password">
          password
        </FormLabel>
        {errors?.username && <p>{errors.username.message}</p>}
        <Input
          id="password"
          placeholder="password"
          {...register('password', {
            minLength: {
              value: 2,
              message: 'YESSIR',
            },
          })}
        />
        {errors?.password && <p>{errors.password.message}</p>}

        {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};
export default withUrqlClient(createUrqlClient)(Register);
