import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface ISidebarItemProps {
  icon: IconType,
  children: React.ReactChild,
  [rest: string]: any
}

export const SidebarItem: React.FC<ISidebarItemProps> = (props) => {

  const { icon, children, ...rest } = props;
  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color={"inherit"}
      _hover={{
        bg: "gray.100",
        color: "gray.900",
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


