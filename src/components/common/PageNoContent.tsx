import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useLang } from '../../hooks/lang.hook';

export const PageNoContent: React.FC = () => {

  const { lang, renderText } = useLang()

  return (
    <Alert status="warning" borderRadius={'md'} boxShadow={'sm'}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{renderText(lang).NO_CONTENT_TITLE}</AlertTitle>
        <AlertDescription display="block">
          {renderText(lang).NO_CONTENT_DESC}
        </AlertDescription>
      </Box>
    </Alert>
  );
}

