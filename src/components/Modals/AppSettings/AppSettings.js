import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch } from '@chakra-ui/react';
import React from 'react';
import { useLang } from '../../../hooks/lang.hook';



export const AppSettings = ({ isOpen, onClose, handleOnSwitch }) => {

  const { lang, renderText } = useLang()



  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{renderText(lang).MODAL_SETTINGS.TITLE}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderText(lang).MODAL_SETTINGS.CHANGE_LANG}
          <Box mt={2}>
            <Switch size="lg" onChange={handleOnSwitch} isChecked={lang === 'EN'} />
          </Box>

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

