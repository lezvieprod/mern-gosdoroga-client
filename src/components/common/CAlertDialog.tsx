import { Button } from '@chakra-ui/button';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/modal';
import React, { useRef } from 'react';


interface ICAlertDialogProps {
  onClose(): void,
  onAgreed(): void,
  isOpen: boolean,
  dialogHeader: string,
  dialogBody: string | JSX.Element,
  cancelButtonText: string,
  agreedButtonText: string,
}

export const CAlertDialog: React.FC<ICAlertDialogProps> = ({
  onClose,
  onAgreed,
  isOpen,
  dialogHeader,
  dialogBody,
  cancelButtonText,
  agreedButtonText,
}) => {

  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>

  return (
    <AlertDialog
      size={'lg'}
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      blockScrollOnMount={false} // ?
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader pr={12}>{dialogHeader}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {dialogBody}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button colorScheme="red" onClick={onAgreed} ml={3}>
            {agreedButtonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


