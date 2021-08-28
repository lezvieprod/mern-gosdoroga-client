import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '../../../models/user.interface';
import { UserItem } from './UserItem';

interface IUsersProps {
  currentData: IUser[]
}

export const Users: React.FC<IUsersProps> = ({ currentData }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Логин</Th>
          <Th>Email</Th>
          <Th isNumeric>Посты</Th>
          <Th isNumeric>Подтвержденный</Th>
          <Th isNumeric>Уровень доступа</Th>
          <Th>Действия</Th>
        </Tr>
      </Thead>
      <Tbody>
        {currentData.map(user => <UserItem key={user._id} user={user} />)}
      </Tbody>
    </Table>
  );
}

