import { Configuration, OpenAIApi } from "openai";
//import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type RequestBody = {
   prompt: string
};

export  async function  POST(req: any, res: NextResponse) {
    try {
      const body = await req.json()
      
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

      return NextResponse.json({
        data: response.data.choices[0].text
      })

    } catch (error: any) {
        return NextResponse.error()
    }
}
