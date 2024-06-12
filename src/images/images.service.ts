import { BadRequestException, Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, createWriteStream, unlink } from 'fs';
import { extname, join, resolve } from 'path';

@Injectable()
export class ImagesService {

    getImage(imagename: string) {
        const image = createReadStream(join(`${process.cwd()}/uploads/images`,imagename));
        return new StreamableFile(image);
    }

    async uploadImage(file: Express.Multer.File): Promise<string> {

        const allowedTypes = ['jpeg', 'jpg', 'png', 'gif'];

        if (!allowedTypes.includes(extname(file.originalname).substring(1))) {

            throw new BadRequestException('Les images téléchargées doivent être au format JPEG, PNG ou GIF.');

        }

        // Vérifier la taille du fichier

        const maxSize = 10 * 1024 * 1024; // 10 Mo

        if (file.size > maxSize) {

            throw new BadRequestException('La taille de l\'image ne doit pas dépasser 10 Mo.');

        }

        let fileName = file.filename + extname(file.originalname)

        const destinationPath = join('./uploads/', fileName);

       const readStream = createReadStream(file.path );

        const writeStream = createWriteStream(destinationPath);

        // Copier le fichier

        await new Promise((resolve, reject) => {

            readStream.pipe(writeStream);

            readStream.on('error', reject);

            writeStream.on('error', reject);

            writeStream.on('finish', resolve);

        });

        //Supprimer le fichier temporaire

        unlink(file.path, (err) => {

            if (err) {

                console.error('Erreur lors de la suppression du fichier temporaire :', err);

            }

        });

        return fileName;

    }
}
