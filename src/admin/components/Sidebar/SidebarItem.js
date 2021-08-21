import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const SidebarItem = (props) => {

  const { icon, children, ...rest } = props;
  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color={useColorModeValue("inherit", "gray.400")}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      borderRadius={'md'}
      {...rest}
    >
      {icon && (
        <Icon
          mr="3"
          boxSize="4"
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
}


