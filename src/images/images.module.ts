import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [
    MulterModule.register({
      dest: './uploads'
    })
  ]
})
export class ImagesModule {}
