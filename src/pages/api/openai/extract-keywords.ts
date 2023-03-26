import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type RequestBody = {
   prompt: string
};

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    try {
      const { body } = req;
      const { prompt } = body as RequestBody;
 
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt, 
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
      });
      res.send({
        data: response.data.choices[0].text
      })
    } catch (error: any) {
       console.log({error})      
      res.status(400).json({
        success: false,
        error: 'Error extracting keywords...',
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed!' });
  }
}
