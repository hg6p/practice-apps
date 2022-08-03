import React, { useState } from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
interface Upvote {
  post: PostSnippetFragment;
}

export const Sidebar = ({ post }: Upvote) => {
  const [loadingState, setLoadingState] = useState<
    'upvote-loading' | 'downvote-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();
  return (
    <Flex mr={4} justifyContent="left" alignItems="center">
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('upvote-loading');
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState('not-loading');
        }}
        isLoading={loadingState === 'upvote-loading'}
        aria-label="upvote post"
        icon={<ChevronUpIcon />}
        colorScheme={post.voteStatus === 1 ? 'green' : undefined}
      />
      <Text marginX={1} fontSize={'lg'}>
        {post.points}
      </Text>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState('downvote-loading');
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState('not-loading');
        }}
        isLoading={loadingState === 'downvote-loading'}
        aria-label="downvote post"
        icon={<ChevronDownIcon />}
        colorScheme={post.voteStatus === -1 ? 'red' : undefined}
      />
    </Flex>
  );
};
