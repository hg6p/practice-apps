import { Box, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import CombineDeleteEdit from '../../components/CombineDeleteEdit';
import NavBar from '../../components/navbar';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import moment from 'moment';
import { Sidebar } from '../../components/sidebar';
const Post = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  if (fetching) {
    return <Box>Loading</Box>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return !data?.post ? null : (
    <Box>
      <NavBar />
      <Box ml={'auto'} mr={'auto'} maxW={'1024px'}>
        <Text display={'inline'} fontSize={'24px'}>
          {data?.post?.title}
        </Text>
        <Text display={'inline'} ml={'5px'}>
          {data?.post?.creator.username}
        </Text>
        <Text>
          Posted{' '}
          {moment(+data?.post?.createdAt)
            .utc()
            .fromNow()}
        </Text>
        <CombineDeleteEdit
          id={data?.post?.id}
          creatorId={data?.post?.creator?.id}
        />
        <Sidebar post={data?.post} />
        <p>{data?.post?.text}</p>
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
