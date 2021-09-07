import { Box, Icon, Heading, Alert, AlertTitle, AlertDescription } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '../../layouts/Main.layout';
import { BiErrorCircle } from "react-icons/bi";

interface IPageUndefined {
  isAccessError?: boolean,
  withLayout?: boolean
}

export const PageUndefined: React.FC<IPageUndefined> = ({ isAccessError, withLayout }) => {

  const location = useLocation()

  if (withLayout) {
    return (
      <MainLayout>
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
                  <AlertTitle fontSize={'20px'} mb={1}>Страница не обнаружена</AlertTitle>
                  <AlertDescription display="block">
                    Введен неизвестный путь <strong>{location.pathname}</strong>
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
                  <AlertTitle fontSize={'20px'} mb={1}>Неавторизированный запрос</AlertTitle>
                  <AlertDescription display="block">
                    Для получения доступа к странице <strong>{location.pathname}</strong> необходимо авторизоваться в системе
                  </AlertDescription>
                </Box>
              </>
          }

        </Alert>
      </MainLayout>
    );
  }
  return (
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
              <AlertTitle fontSize={'20px'} mb={1}>Страница не обнаружена</AlertTitle>
              <AlertDescription display="block">
                Введен неизвестный путь <strong>{location.pathname}</strong>
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
              <AlertTitle fontSize={'20px'} mb={1}>Неавторизированный запрос</AlertTitle>
              <AlertDescription display="block">
                Для получения доступа к странице <strong>{location.pathname}</strong> необходимо авторизоваться в системе
              </AlertDescription>
            </Box>
          </>
      }

    </Alert>
  );

}

