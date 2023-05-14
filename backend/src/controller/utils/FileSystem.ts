import { Response } from "express";
import { Readable } from 'stream';
import { IFileData } from "../../models/IFileData";
import readline from 'readline';
import path from 'path';
import fs from 'fs';

export class FileSystem {

    public static readDir(tempFolder: string, res: Response) {
        let fileData: IFileData[] = [];

        fs.readdir(tempFolder, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao listar arquivos na pasta temporária');
            }

            const file = files.find((file) => file.endsWith('.csv'));

            if (!file) {
                return res.status(404).send('Arquivo CSV não encontrado na pasta temporária');
            }

            const filePath = path.join(tempFolder, file);

            fileData = this.readFile(filePath, res);
        });

        return fileData;
    }

    public static readFile(filePath: string, res: Response) {
        const fileData: IFileData[] = [];

        fs.readFile(filePath, 'utf8', async (_, data) => {
            const readable = new Readable();

            readable.push(Buffer.from(data, 'utf8'));
            readable.push(null);

            const lines = readline.createInterface({
                input: readable
            });

            let isFirstLine = true;

            for await (let line of lines) {

                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                const lineSplit = line.split(',');

                fileData.push({
                    code: Number(lineSplit[0]),
                    new_price: Number(lineSplit[1])
                })
            }
        });

        return fileData;
    }
}