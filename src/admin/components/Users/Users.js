import { Table, TableCaption, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { UserItem } from './UserItem';

export const Users = ({currentData}) => {
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
        {currentData.users?.map(user => <UserItem key={user._id} user={user}/>) }
      </Tbody>
    </Table>
  );
}

