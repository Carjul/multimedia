import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { UpdateMultimediaDto } from './dto/update-multimedia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { Multimedia } from './entities/multimedia.entity';

@Injectable()
export class MultimediaService {
  constructor(@InjectModel('Multimedia') private readonly multimediaModel: Model<Multimedia>) {}

  async create(description: string, file: Express.Multer.File, image:string, category:string, type:string): Promise<Multimedia> {
    const newMultimedia = new this.multimediaModel({description,file,image, category, type});
    return newMultimedia.save();
  }

  async findAll(): Promise<Multimedia[]> {
    return this.multimediaModel.find().sort({ fecha: -1 }).exec();
    }

    async findByFileName(filename): Promise<Multimedia[]> {
        return this.multimediaModel.find({ "file.filename": filename });
    }

  async findOne(id: string): Promise<Multimedia> {
    const multimedia = await this.multimediaModel.findById(id).exec();
    if (!multimedia) {
      throw new NotFoundException(`Multimedia with ID ${id} not found`);
    }
    return multimedia;
  }  

  async update(id: string, description: string) : Promise<string> {
    const multimedia = await this.multimediaModel.findByIdAndUpdate(id, { description: description, fecha: Date.now() }).exec();
    if(multimedia == null){                                                                                                                                                                                                                           
      return "Archivo no encontrado"                                                                                                                                                                       
    }else{
      return "Archivo actualizado";

    }
  }
  

  async remove(id: string): Promise<void> {
    const multimedia = await this.findOne(id);
    if (multimedia && multimedia.file && multimedia.file.path) { 
      const filePath = path.join(process.cwd(), multimedia.file.path); 
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log('File exists:', filePath);
        fs.unlinkSync(filePath);
      }
    }
    await this.multimediaModel.findByIdAndDelete(id).exec();
  }
  
}
