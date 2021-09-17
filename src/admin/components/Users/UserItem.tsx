import { Td, Tr, Button, Box } from '@chakra-ui/react';
import React, { memo} from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../../models/user.interface';
import { createPrettyDate } from '../../../utils/date';


interface IUserItemProps extends IUser {
  onDeleteHandle(userId: number): void,
  setOpenDeleteDialog(isOpen: boolean): void,
  setUserId(userId: number): void
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
    setUserId(userId)
    setOpenDeleteDialog(true)
  }

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

