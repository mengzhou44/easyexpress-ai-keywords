import { Configuration, OpenAIApi, CreateImageRequestSizeEnum } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type RequestBody = {
  prompt: string;
  imageSize: string;
};

function getImageSizeEnum(imageSize:string) : CreateImageRequestSizeEnum {
    switch(imageSize) {
        case "small":
            return  CreateImageRequestSizeEnum._256x256
        case "medium":
            return  CreateImageRequestSizeEnum._512x512
        default:
           return  CreateImageRequestSizeEnum._1024x1024
    }     
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    try {
      const { body } = req;
      const { prompt, imageSize } = body as RequestBody;

      const response = await openai.createImage({
        prompt,
        n: 1,
        size:  getImageSizeEnum(imageSize)
      });

      const image_url = response.data.data[0].url;

      res.send({
        data: image_url
      })
    } catch (error: any) {

      console.log(error.response.status);
      console.log(error.response.data);

      res.status(400).json({
        success: false,
        error: 'The image could not be generated',
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed!' });
  }
}

