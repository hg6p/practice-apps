import Navbar from '../components/navbar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import NextLink from 'next/link';
import {
  Box,
  Link,
  StackDivider,
  VStack,
  Flex,
  Text,
  Button,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 33,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <div>
      <Navbar />
      <Flex justifyContent={'center'}>
        <Box width={'50%'}>
          <Flex justifyContent={'space-between'}>
            <Text>LABEL</Text>
            <NextLink href="/create-post">
              <Link>create post</Link>
            </NextLink>
          </Flex>
          <Box>
            {!data && fetching ? (
              <div>loading...</div>
            ) : (
              <Stack spacing={8}>
                {data!.posts.posts.map((p) => (
                  <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                    <Heading fontSize="xl">{p.title}</Heading>
                    <Text mt={4}>{p.textSnippet}</Text>
                  </Box>
                ))}
              </Stack>
            )}
            {data && data.posts.hasMore ? (
              <Flex>
                <Button
                  onClick={() => {
                    setVariables({
                      limit: variables.limit,
                      cursor:
                        data.posts.posts[data.posts.posts.length - 1].createdAt,
                    });
                  }}
                  isLoading={fetching}
                  m="auto"
                  my={8}
                >
                  load more
                </Button>
              </Flex>
            ) : null}
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
