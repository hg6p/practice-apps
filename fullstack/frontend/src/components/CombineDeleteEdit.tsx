import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMeQuery, useDeletePostMutation } from '../generated/graphql';

interface CombineDeleteEditProps {
  id: number;
  creatorId: number;
}

const CombineDeleteEdit = ({ id, creatorId }: CombineDeleteEditProps) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box display={'inline-block'}>
      <NextLink href="/edit/[id]" as={`/edit/${id}`}>
        <Link>
          <Heading display={'inline'} fontSize="md">
            Edit
          </Heading>
        </Link>
      </NextLink>
      <Heading
        display={'inline'}
        fontSize="md"
        onClick={() => {
          deletePost({ id: id });
        }}
        ml={'5px'}
      >
        Delete
      </Heading>
    </Box>
  );
};
export default CombineDeleteEdit;
