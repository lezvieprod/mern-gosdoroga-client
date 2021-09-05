import { Alert, AlertDescription, AlertIcon, AlertTitle, Text } from '@chakra-ui/react';
import React from 'react';

interface ICAlertProps {
  alertTitle: string,
  alertDescription: string,
  forAuth?: boolean,
  initialTime?: number,
  alertType?: 'info' | 'warning' | 'success' | 'error'
}

export const CAlert: React.FC<ICAlertProps> = ({ alertTitle, alertDescription, forAuth, alertType, ...props }) => {
  return <Alert
    status={alertType}
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    height="300px"
    borderRadius={'xl'}
    my={6}
  >
    <AlertIcon boxSize="40px" mr={0} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      {alertTitle}
    </AlertTitle>
    <AlertDescription maxWidth="sm" mb={5}>
      {alertDescription}
    </AlertDescription>
    {
      forAuth &&
      <AlertDescription maxWidth="sm" fontSize="lg">
        Редирект на страницу авторизации через <Text fontSize="2xl" mx={4} fontWeight={'700'} mt={5}>{props.initialTime}</Text>
      </AlertDescription>
    }
  </Alert>
}
