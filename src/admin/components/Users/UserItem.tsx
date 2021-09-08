import { Td, Tr } from '@chakra-ui/react';
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
        bg: "#F3F3F3",
        boxShadow: "md"
      }}
      onClick={handleGoToProfile}
      cursor={'pointer'}
    >
      <Td>{user.userLogin}</Td>
      <Td>{user.email}</Td>
      <Td isNumeric>{user.verified}</Td>
      <Td isNumeric>
        {user.accessLevel}
      </Td>
      <Td> actions </Td>
    </Tr>
  );
}

