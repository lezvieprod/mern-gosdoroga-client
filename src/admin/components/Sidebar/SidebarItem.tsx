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
        bg: "#1F232C",
        borderRight: '5px solid', 
        borderColor: '#4f576e',
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      activeStyle={{ borderRight: '5px solid', borderColor: '#3182ce', background: '#12151A' }}
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


