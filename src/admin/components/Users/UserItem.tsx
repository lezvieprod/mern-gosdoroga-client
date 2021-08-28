import { Td, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { IUser } from '../../../models/user.interface';


interface IUserItemProps {
  user: IUser;
}

export const UserItem: React.FC<IUserItemProps> = ({ user }) => {

  const history = useHistory()

  const handleGoToProfile = () => {
    history.push(`/admin/users/${user.userLogin}`)
  }

  return (
    <Tr
      _hover={{
        bg: useColorModeValue("gray.50", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
        boxShadow: "lg"
      }}
      onClick={handleGoToProfile}
      cursor={'pointer'}
    >
      <Td>{user.userLogin}</Td>
      <Td>{user.email}</Td>
      <Td isNumeric>{user.posts.length}</Td>
      <Td isNumeric>{user.verified}</Td>
      <Td isNumeric>
        {user.accessLevel}
      </Td>
      <Td> actions </Td>
    </Tr>
  );
}

