import { Readable } from 'stream';
import { IFileData } from "../../models/IFileData";
import readline from 'readline';
import path from 'path';
import fs from 'fs';

export class FileSystem {
    protected static tempFolder = path.join(__dirname, 'temp');

    public static readDir(): Promise<IFileData[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(this.tempFolder, (err, files) => {
                if (err) {
                    console.error(err);
                    reject(new Error('Erro ao listar arquivos na pasta temporária'));
                    return;
                }

                const file = files.find((file) => file.endsWith('.csv'));

                if (!file) {
                    reject(new Error('Arquivo CSV não encontrado na pasta temporária'));
                    return;
                }

                const filePath = path.join(this.tempFolder, file);

                this.readFile(filePath)
                    .then((fileData) => resolve(fileData))
                    .catch((error) => reject(error));
            });
        });
    }

    public static readFile(filePath: string): Promise<IFileData[]> {
        return new Promise((resolve) => {
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
                    });
                }

                resolve(fileData);
            });
        });
    }
}