import { Td, Tr, Button, Box } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CAlertDialog } from '../../../components/common/CAlertDialog';
import { IUser } from '../../../models/user.interface';
import { createPrettyDate } from '../../../utils/date';


interface IUserItemProps extends IUser {
  onDeleteHandle(userId: string): void,
  setOpenDeleteDialog(isOpen: boolean): void,
  setUserId(userId: string): void
}


export const UserItem: React.FC<IUserItemProps> = memo(({
  userLogin,
  email,
  verified,
  accessLevel,
  regDate, 
  userId, 
  setOpenDeleteDialog,
  setUserId
 }) => {

  const dialogOnOpen = () => {
    setUserId(String(userId))
    setOpenDeleteDialog(true)
  }

  console.log('RERENDER');
  

  return (
    <>
      <Tr
        _hover={{
          bg: "#F3F3F3",
          boxShadow: "md"
        }}
      >
        <Td>{userId}</Td>
        <Td>
          <Box as={Link} to={`/profile/${userLogin}`}>
            {userLogin}
          </Box>
        </Td>
        <Td>{email}</Td>
        <Td>{createPrettyDate(regDate)}</Td>
        <Td isNumeric>{verified}</Td>
        <Td isNumeric>
          {accessLevel}
        </Td>
        <Td isNumeric>
          <Button size="xs" onClick={dialogOnOpen}>Удалить</Button>
        </Td>

      </Tr>

    </>
  );
})

