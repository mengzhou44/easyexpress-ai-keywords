import { useState } from 'react';

import { Button, Textarea } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

export type ExtractKeyWords = (val: string) =>  any

interface Props {
    extractKeyWords: ExtractKeyWords;  
}

const TextInput: React.FC<Props> = ({ extractKeyWords })  => {
  const [text, setText] = useState('');

  const toast = useToast();

  const submitText = () => {
    if (text === '') {
      toast({
        title: 'Text field is empty.',
        description: 'Please enter some text to extract keywords.',
        status: 'error',
        duration: 5000,
        isClosable: false,
      });
      return;
    }

    extractKeyWords(text);
  };

  return (
    <>
      <Textarea
        bg='white'
        padding={4}
        marginTop={6}
        height={200}
        color='black'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        bg='#005180'
        color='white'
        marginTop={4}
        width='100%'
        _hover={{ bg: 'blue.700' }}
        onClick={submitText}
      >
        Extract Keywords
      </Button>
    </>
  );
};
export default TextInput;