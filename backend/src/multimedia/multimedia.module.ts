import { Module } from '@nestjs/common';
import { MultimediaService } from './multimedia.service';
import { MultimediaController } from './multimedia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MultimediaSchema } from './entities/multimedia.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Multimedia', schema: MultimediaSchema }])],
  controllers: [MultimediaController],
  providers: [MultimediaService],
})
export class MultimediaModule {}
