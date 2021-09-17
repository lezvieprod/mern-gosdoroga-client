import { Table, Tbody, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { CAlertDialog } from '../../../components/common/CAlertDialog';
import { useLang } from '../../../hooks/lang.hook';
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
  onDeleteHandle(userId: number): void
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

  const [userId, setUserId] = useState<number>(0)
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState(false)
  const onClose = () => setOpenDeleteDialog(false)
  const {lang, renderText} = useLang()



  if (isMiniItems) {
    return <> {users.map(user => <UserMiniItem key={user._id} {...user} />)} </>
  }

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>USER ID</Th>
            <Th>{renderText(lang).LOGIN}</Th>
            <Th>Email</Th>
            <Th>{renderText(lang).REG_DATE}</Th>
            <Th isNumeric>{renderText(lang).ACCESS_LEVEL}</Th>
            <Th isNumeric>{renderText(lang).ACTIONS}</Th>
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
        onAgreed={() => onDeleteHandle(userId)}
        dialogHeader={renderText(lang).DELETE_USER_SURE_TITLE}
        dialogBody={`${renderText(lang).DELETE_USER_SURE_DESC} - ${userId}`}
        cancelButtonText={renderText(lang).CANCEL}
        agreedButtonText={renderText(lang).DELETE}
      />

    </>
  );
}

