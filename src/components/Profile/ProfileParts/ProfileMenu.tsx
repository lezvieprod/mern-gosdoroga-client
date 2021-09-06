import { Box, Flex } from "@chakra-ui/layout"
import { NavLink } from "react-router-dom"
import { NavButton } from "../../common/custom/NavButton"

interface IProfileMenuProps {
  userLogin: string
}

export const ProfileMenu: React.FC<IProfileMenuProps> = ({ userLogin }) => {
  return (
    <Box mt={7}>
      <Flex px={7}>
        <NavButton
          exact
          as={NavLink}
          to={`/profile/${userLogin}`}
          mr={6}
          borderTopRadius={'md'}
          py={4} px={0} activeStyle={{ borderBottom: '2px solid #1876F2' }}
          _hover={{ background: 'initial', borderBottom: '2px solid #b1d3ff' }}
        >
          Информация
        </NavButton>
        <NavButton
          exact
          as={NavLink}
          to={`/profile/${userLogin}/posts`}
          borderTopRadius={'md'}
          py={4} px={0} activeStyle={{ borderBottom: '2px solid #1876F2' }}
          _hover={{ background: 'initial', borderBottom: '2px solid #b1d3ff' }}
        >
          Посты
        </NavButton>
      </Flex>
    </Box>
  )
}