import { Document } from 'mongoose';

export interface Multimedia extends Document {
    description: string;
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: number;
    };
    image: string;
    category: string;
    type: string;
    fecha: Date;
    __v: number;
  }
  