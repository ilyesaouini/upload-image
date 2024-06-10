import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileURLToPath } from 'url';



@ApiTags("images")
@ApiBearerAuth()
@Controller('images')
export class ImagesController {

 constructor(private imagesService: ImagesService) {}

 @ApiResponse({ description: " image successfully retrieverd."})
 @ApiBadRequestResponse({ description:" Params are wrong."})
 @Get("image/:imagename")
 getImage(@Param("imagename") image: string) {
    return this.imagesService.getImage(image);
 }

 
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
           //new MaxFileSizeValidator({ maxSize: 1000 }),
           //new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file.path)
    return this.imagesService.uploadImage(file);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  addFile(@UploadedFile() file) {
   return this.imagesService.uploadImage(file)
  }
}
