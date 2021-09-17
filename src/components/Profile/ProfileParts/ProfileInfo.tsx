import { Box, Flex, SimpleGrid } from "@chakra-ui/layout"
import { useLang } from "../../../hooks/lang.hook"

interface IProfileInfoProps {
  regDate: number,
  accessLevel: number
}

export const ProfileInfo: React.FC<IProfileInfoProps> = ({ regDate, accessLevel }) => {

  const { lang, renderText } = useLang()

  return (
    <Box mt={4} bg={'#fff'} borderRadius={'md'} boxShadow="sm">
      <SimpleGrid columns={2} spacing={10}>
        <Flex justifyContent={'center'} alignItems={'center'} p={6} flexDir={'column'}>
          <Box mb={2}>{renderText(lang).REG_DATE}:</Box>
          {
            lang === 'RU'
            ? new Date(regDate).toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' })
            : new Date(regDate).toLocaleString('en', { year: 'numeric', month: 'long', day: 'numeric' })
          }
        </Flex>
        <Flex justifyContent={'center'} alignItems={'center'} p={6} flexDir={'column'}>
          <Box mb={2}>{renderText(lang).ACCESS_LEVEL}:</Box>
          {accessLevel}
        </Flex>
      </SimpleGrid>
    </Box>
  )
}