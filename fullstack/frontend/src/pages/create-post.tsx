import { FormControl, FormLabel, Input, Button, Wrap } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Resolver, useForm } from 'react-hook-form';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Textarea } from '@chakra-ui/react';
import { useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useIsAuth } from '../utils/useIsAuth';
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
const CreatePost = () => {
  const [, createPost] = useCreatePostMutation();
  useIsAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    let { error } = await createPost({ input: data });
    if (!error) router.push('/');
  });

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

export default withUrqlClient(createUrqlClient)(CreatePost);
