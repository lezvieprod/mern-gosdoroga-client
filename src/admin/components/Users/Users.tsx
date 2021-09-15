import { Table, Tbody, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { CAlertDialog } from '../../../components/common/CAlertDialog';
import { IUser } from '../../../models/user.interface';
import { USERS_PER_PAGE } from '../../../utils/constants';
import { UserItem } from './UserItem';
import { UserMiniItem } from './UserMiniItem';

interface IUsersProps {
  users: IUser[],
  isMiniItems?: boolean,
  itemsLimit?: number,
  withPagination?: boolean,
  total: number,
  currentPage: string,
  onDeleteHandle(userId: string): void
}

export const Users: React.FC<IUsersProps> = ({
  users,
  isMiniItems,
  itemsLimit,
  withPagination,
  total,
  currentPage,
  onDeleteHandle
}) => {

  const history = useHistory()

  const [userId, setUserId] = useState<string | null>(null)
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState(false)
  const onClose = () => setOpenDeleteDialog(false)
 


  if (isMiniItems) {
    return <> {users.map(user => <UserMiniItem key={user._id} {...user} />)} </>
  }

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>USER ID</Th>
            <Th>Логин</Th>
            <Th>Email</Th>
            <Th>Дата регистрации</Th>
            <Th isNumeric>Подтвержденный</Th>
            <Th isNumeric>Уровень доступа</Th>
            <Th isNumeric>Действия</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => <UserItem 
          key={user._id} 
          {...user} 
          onDeleteHandle={onDeleteHandle} 
          setOpenDeleteDialog={setOpenDeleteDialog} 
          setUserId={setUserId}
          />)}
        </Tbody>
      </Table>

      {
        withPagination && (total > USERS_PER_PAGE || itemsLimit) &&
        <Flex justifyContent={'center'} mt={8}>
          <Pagination
            current={Number(currentPage)}
            defaultCurrent={1}
            pageSize={USERS_PER_PAGE}
            total={total}
            baseStyles={{ boxShadow: "md", bg: '#fff' }}
            activeStyles={{ bg: "blue.600", color: '#fff' }}
            paginationProps={{ display: "flex" }}
            pageNeighbours={2}
            onChange={(page) => history.push(`/admin/users/page/${page}`)}
          />
        </Flex>
      }

      <CAlertDialog
        isOpen={isOpenDeleteDialog}
        onClose={onClose}
        onAgreed={() => onDeleteHandle(String(userId))}
        dialogHeader={'Вы действительно хотите удалить этого пользователя?'}
        dialogBody={`Действие невозможно будет отменить. Идентификатор удаляемого пользователя - ${userId}`}
        cancelButtonText={'Отмена'}
        agreedButtonText={'Удалить'}
      />

    </>
  );
}

