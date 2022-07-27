import { Resolver, useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Link,
  Box,
} from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { arrToObj } from '../utils/arrToObj';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
type FormValues = {
  username: string;
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
const Form = () => {
  const router = useRouter();
  const [, loginUser] = useLoginMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    let response = await loginUser({
      usernameOrEmail: data.username,
      password: data.password,
    });
    if (response.data?.login.errors) {
      if (typeof router.query.next === 'string') {
        router.push(router.query.next);
      }
      let objError = arrToObj(response.data.login.errors);
      let objKeys = Object.keys(objError);
      setError(objKeys[0] == 'username' ? 'username' : 'password', {
        type: 'manual',
        message: objError[objKeys[0]],
      });
    } else {
      console.log('log', response);
      router.push('/');

      console.log('erros', errors);
    }
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
        <Box width={'100%'}>
          <NextLink href="/forgot-password">
            <Link display={'block'} pt={2} textAlign={'right'}>
              Forgot password?
            </Link>
          </NextLink>
          {errors?.password && <p>{errors.password.message}</p>}

          {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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
        </Box>
      </FormControl>
    </form>
  );
};
export default withUrqlClient(createUrqlClient)(Form);
