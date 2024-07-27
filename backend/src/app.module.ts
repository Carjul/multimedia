import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MultimediaModule } from './multimedia/multimedia.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MultimediaModule,
    MongooseModule.forRoot(
      'mongodb+srv://michaelstevenbarriosmartinez:blKUIxAKbJSKQXbw@modulecontentcluster.1qoyjmy.mongodb.net/?retryWrites=true&w=majority&appName=modulecontentcluster',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
