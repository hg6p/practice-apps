import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '../../generated/graphql';
import { arrToObj } from '../../utils/arrToObj';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from 'next/link';

type FormValues = {
  newPassword: string;
};
const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values,
    errors: {},
  };
};
const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [tokenError, setTokkenError] = useState('');
  const [, changePassword] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    let response = await changePassword({
      newPassword: data.newPassword,
      token: typeof router.query.token === 'string' ? router.query.token : '',
    });
    if (response.data?.changePassword.errors) {
      let objError = arrToObj(response.data.changePassword.errors);
      if ('token' in objError) {
        setTokkenError(objError['token']);
      }
      let objKeys = Object.keys(objError);
      setError('newPassword', {
        type: 'manual',
        message: objError[objKeys[0]],
      });
    } else {
      console.log('log', response);
      router.push('/');
    }
    console.log('erros', errors);
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
        <FormLabel mt="10px" htmlFor="newPassword">
          New password
        </FormLabel>
        <Input
          id="newPassword"
          placeholder="password"
          {...register('newPassword', {
            minLength: {
              value: 2,
              message: 'YESSIR',
            },
          })}
        />

        {tokenError ? (
          <Box color="red">
            {tokenError}
            <p color="white">
              <NextLink href="/forgot-password">
                Send request for change password?
              </NextLink>
            </p>
          </Box>
        ) : null}
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
