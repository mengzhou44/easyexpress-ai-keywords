"use client";
import { Container, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react';
import Image from "next/image";
import TextInput from "./text-input";
import { useState } from 'react'
import KeywordsModal from "../components/keywords-modal";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {

  return (
    <Box bg='blue.600' color='white' height='100vh' paddingTop={130}>
      <Container maxW='3xl' centerContent>
        <PageHeader />
      </Container>
    </Box>
  )
}

const PageHeader = () => {
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  async function extractKeyWords(text: string) {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt:
          'Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n' +
          text +
          '',
      }),
    }

    try {
      const res = await fetch('/api/openai/extract-keywords', options)
      const json = await res.json();

      if (json.success === false) {
        toast.error('Error occured!')
      } else {
        setKeywords(json.data);
      }
      setLoading(false);
    } catch (err) {
      toast.error('Error occured!')
    }

  }
  return (
    <>
      <Image src='/static/light-bulb.svg' alt='logo' height={30} width={50} />
      <Text 
         fontSize={20} 
         textAlign='center'
         dangerouslySetInnerHTML={{ __html:"Paste in your text below and we'll extract the keywords for you." }}
        />
    
      <TextInput extractKeyWords={extractKeyWords} />
      <KeywordsModal
        keywords={keywords}
        loading={loading}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
      <ToastContainer />
    </>
  );
};


