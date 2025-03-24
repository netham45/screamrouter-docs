import React from 'react';
import { 
  Box, 
  Flex, 
  HStack, 
  IconButton, 
  useDisclosure, 
  useColorModeValue, 
  Stack, 
  Text,
  Button,
  Link,
  Image
} from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Documentation', path: '/docs' },
  { name: 'Downloads', path: '/downloads' },
];

const NavLink = ({ children, to }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    _activeLink={{
      color: 'brand.500',
      fontWeight: 'semibold'
    }}
    to={to}
  >
    {children}
  </Link>
);

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} boxShadow="sm">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <FaTimes /> : <FaBars />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <RouterLink to="/">
              <Flex alignItems="center">
                <Image src="/images/logo.svg" alt="ScreamRouter Logo" boxSize="40px" mr={2} />
                <Text 
                  fontWeight="bold" 
                  fontSize="xl" 
                  color="brand.500"
                >
                  ScreamRouter
                </Text>
              </Flex>
            </RouterLink>
          </Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Button
            variant={'solid'}
            colorScheme={'brand'}
            size={'sm'}
            mr={4}
            as={'a'}
            href={'https://github.com/netham45/screamrouter'}
            target="_blank"
          >
            GitHub
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default Navbar;