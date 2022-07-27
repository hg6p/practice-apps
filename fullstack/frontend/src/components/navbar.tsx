import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
const Navbar = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;
  console.log('data', data);
  if (fetching || isServer()) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Box>{data.me.username}</Box>
        <Button
          variant={'link'}
          isLoading={logoutFetching}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </>
    );
  }
  return (
    <Flex
      backgroundColor={'crimson'}
      p={'10px'}
      gap={2}
      justifyContent={'center'}
    >
      {body}
    </Flex>
  );
};
export default Navbar;
