import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, NotFoundException, Res } from '@nestjs/common';
import { MultimediaService } from './multimedia.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';




@Controller('multimedia')
export class MultimediaController {
    constructor(private readonly multimediaService: MultimediaService) { }

    @Post('carga')
    @UseInterceptors(
        // 'files' es el nombre del campo en el formulario
        FileInterceptor('file',
            {
                // Actúa por cada fichero subido
                storage: diskStorage({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const fileName = uuid();// usamos uuid para generar un nombre único para el archivo
                        const fileExt = extname(file.originalname) // extraemos la extensión del archivo
                        cb(null, `${fileName}${fileExt}`) // llamamos al callback con el nombre del archivo
                    },
                }),
            },
        ),
    )



    create(
        @UploadedFile() file: Express.Multer.File,
        @Body('description') description: string,
        @Body('image') image: string,
        @Body('category') category: string,
        @Body('type') type: string

    ) {
        if (file) {
            this.multimediaService.create(description, file, image, category, type).then((result) => {
                return result;
            });
        } else {
            return "documento no encontrado";
        }
    }

    @Get()
    findAll() {
        return this.multimediaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.multimediaService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('description') description: string) {
        return this.multimediaService.update(id, description);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.multimediaService.remove(id);
    }


    @Get('download/:filename')
    async downloadFile(@Param('filename') filename: string, @Res() res: Response): Promise<void> {

        const file = await this.multimediaService.findByFileName(filename);
        
        if (!file) {
            throw new NotFoundException('Archivo no encontrado');
        }
        const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

        
        try {
            const fileStats = await fs.promises.stat(filePath);
            if (!fileStats.isFile()) {
                throw new NotFoundException('Archivo no encontrado');
            }
            
        } catch (error) {
            throw new NotFoundException('Archivo no encontrado');
        }

        
        // Define el nombre del archivo
        res.setHeader('Content-Disposition', `attachment; filename="${file[0].file.originalname}"`);
        
        // Envía el archivo
        return res.sendFile(filePath);
    }
    @Get('vista/:filename')
    async serveFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
        return res.sendFile(filePath);

    }
}