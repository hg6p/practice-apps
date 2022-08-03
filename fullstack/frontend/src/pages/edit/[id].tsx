import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Wrap,
} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { usePostQuery, useUpdatePostMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetIntId } from '../../utils/useGetIntId';
import createPost from '../create-post';
type FormValues = {
  title: string;
  text: string;
};
const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values,
    errors: {},
  };
};
const UpdateForm = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    let { error } = await updatePost({
      text: data.text,
      title: data.title,
      updatePostId: intId,
    });
    if (!error) router.push('/');
  });

  if (fetching) {
    return <div>loading...</div>;
  }

  if (!data?.post) {
    return <Box>could not find post</Box>;
  }

  return (
    <Wrap>
      <form onSubmit={onSubmit}>
        <FormControl
          display="flex"
          alignItems="center"
          flexWrap={'wrap'}
          maxW={'620px'}
          justifyContent="center"
        >
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" placeholder="title" {...register('title')} />
          <FormLabel htmlFor="text">Text</FormLabel>
          <Textarea
            id="text"
            placeholder="text"
            {...register('text', {
              minLength: {
                value: 2,
                message: 'YESSIR',
              },
            })}
          />
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </Wrap>
  );
};

export default withUrqlClient(createUrqlClient)(UpdateForm);
