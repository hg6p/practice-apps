import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useState } from 'react';
import CombineDeleteEdit from '../components/CombineDeleteEdit';
import dynamic from 'next/dynamic';
const NavBar = dynamic(() => import('../components/navbar'), { ssr: false });
import { Sidebar } from '../components/sidebar';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Box>
      <NavBar />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8} maxW={'1024px'} ml={'auto'} mr={'auto'} minW="324px">
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <Sidebar post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading display={'inline'} fontSize="xl">
                        {p.title}
                      </Heading>
                    </Link>
                  </NextLink>
                  <Text ml={'5px'} display={'inline'}>
                    posted by {p.creator.username}
                  </Text>
                  <Box ml="auto">
                    <CombineDeleteEdit id={p.id} creatorId={p.creator.id} />
                  </Box>
                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
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
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
