import { BadRequestException, Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, createWriteStream, unlink } from 'fs';
import { extname, join, resolve } from 'path';

@Injectable()
export class ImagesService {

    getImage(imagename: string) {
        const image = createReadStream(join(`${process.cwd()}/uploads/images`,imagename));
        return new StreamableFile(image);
    }

    async uploadImage(image: Express.Multer.File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if(!allowedTypes.includes(image.mimetype)) {
            throw new BadRequestException(
                "Les images téléchargés doivent être au format JPEG, PNG ou GIF ",
            );
        }

        const maxSize = 10 * 1024 *1024; //10MO
        if (image.size > maxSize) {
            throw new BadRequestException("La taille de l'image ne doit pas dépasser 10 Mo.");
        }
        console.log(image.filename);
        let filename = image.filename + extname(image.originalname);
        console.log(image.path)
        const destinationPath = join(".uploads/", filename);

      
        return filename;
    }
}
