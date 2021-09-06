import { Box, Flex, SimpleGrid } from "@chakra-ui/layout"

interface IProfileInfoProps {
  verified: number,
  regDate: number,
}

export const ProfileInfo: React.FC<IProfileInfoProps> = ({ verified, regDate }) => {
  return (
    <Box mt={4} bg={'#fff'} borderRadius={'md'} boxShadow="sm">
      <SimpleGrid columns={2} spacing={10}>
        <Flex justifyContent={'center'} alignItems={'center'} p={6} flexDir={'column'}>
          <Box mb={2}>Дата регистрации:</Box>
          {new Date(regDate).toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Flex>
        <Flex justifyContent={'center'} alignItems={'center'} p={6} flexDir={'column'}>
          <Box mb={2}>Статус аккаунта:</Box>
          {verified === 0 ? 'Неподтвережденный' : 'Подтвержденный'}
        </Flex>
      </SimpleGrid>
    </Box>
  )
}