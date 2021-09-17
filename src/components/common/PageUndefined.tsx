import { Box, Icon, Heading, Alert, AlertTitle, AlertDescription } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '../../layouts/Main.layout';
import { BiErrorCircle } from "react-icons/bi";
import { useLang } from '../../hooks/lang.hook';

interface IPageUndefined {
  isAccessError?: boolean,
  withLayout?: boolean
}

export const PageUndefined: React.FC<IPageUndefined> = ({ isAccessError, withLayout }) => {

  const location = useLocation()
  const { lang, renderText } = useLang()

  return (
    <MainLayout disabled={!withLayout}>
      <Alert status="error" boxShadow={'sm'} borderRadius={'md'} py={6}>
        {
          !isAccessError
            ?
            <>
              <Box mr={10}>
                <Heading as={'h1'} color={'red'} fontSize={'50px'} d={'flex'} alignItems={'center'}>
                  4
                  <Icon boxSize={'50px'} as={BiErrorCircle} />
                  4
                </Heading>
              </Box>
              <Box flex="1">
                <AlertTitle fontSize={'20px'} mb={1}>{renderText(lang).PAGE_UNDEFINED_TITLE}</AlertTitle>
                <AlertDescription display="block">
                  {renderText(lang).PAGE_UNDEFINED_DESC} <strong>{location.pathname}</strong>
                </AlertDescription>
              </Box>
            </>
            :
            <>
              <Box mr={10}>
                <Heading as={'h1'} color={'red'} fontSize={'50px'} d={'flex'} alignItems={'center'}>
                  4
                  <Icon boxSize={'50px'} as={BiErrorCircle} />
                  1
                </Heading>
              </Box>
              <Box flex="1">
                <AlertTitle fontSize={'20px'} mb={1}>{renderText(lang).PAGE_FORBIDDEN_TITLE}</AlertTitle>
                <AlertDescription display="block">
                  {renderText(lang).PAGE_FORBIDDEN_DESC}
                </AlertDescription>
              </Box>
            </>
        }

      </Alert>
    </MainLayout>
  );


}

