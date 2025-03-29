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
import { FaBars, FaTimes, FaGithub, FaDiscord, FaBook, FaDownload } from 'react-icons/fa';

const Links = [
  { name: <Flex alignItems="center"><FaBook /><Box ml={1}>Documentation</Box></Flex>, path: '/docs' },
  { name: <Flex alignItems="center"><FaDownload /><Box ml={1}>Downloads</Box></Flex>, path: '/downloads' },
  { name: <Flex alignItems="center"><FaDiscord /><Box ml={1}>Discord</Box></Flex>, path: 'https://discord.gg/EXhF6pBhXT', isExternal: true },
  { name: <Flex alignItems="center"><FaGithub /><Box ml={1}>GitHub</Box></Flex>, path: 'https://github.com/netham45/screamrouter', isExternal: true },
];

const NavLink = ({ children, to, isExternal }) => (
  <Link
    as={isExternal ? 'a' : RouterLink}
    href={isExternal ? to : undefined}
    to={isExternal ? undefined : to}
    target={isExternal ? '_blank' : undefined}
    rel={isExternal ? 'noopener noreferrer' : undefined}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    _activeLink={!isExternal ? {
      color: 'brand.500',
      fontWeight: 'semibold'
    } : undefined}
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
              <NavLink key={link.name} to={link.path} isExternal={link.isExternal}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path} isExternal={link.isExternal}>
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
