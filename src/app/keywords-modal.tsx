import {
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    CircularProgress,
  } from '@chakra-ui/react';

  interface Prop {
      keywords: string;
      loading: boolean;
      isOpen: boolean, 
      closeModal: ()=> void
  } 
  
  const KeywordsModal: React.FC<Prop> = ({isOpen, closeModal, loading, keywords}) => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Keywords</ModalHeader>
            <ModalCloseButton />
            <ModalBody display='flex' alignItems='center' justifyContent='center'>
              {loading ? (
                <CircularProgress isIndeterminate color='blue.300' />
              ) : (
                <Text>{keywords}</Text>
              )}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  export default KeywordsModal;