import multer from "multer";
import path from 'path';
import fs from 'fs';

export class Multer {
    protected static tempFolder = path.join(__dirname, 'temp');

    public static single(file: string) {
        const storage = multer.diskStorage({
            destination: this.tempFolder,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const extension = path.extname(file.originalname);
                cb(null, file.fieldname + '-' + uniqueSuffix + extension);

                this.clearTempFolder();
            },
        });

        const upload = multer({ storage });

        return upload.single(file);
    }

    public static clearTempFolder() {
        fs.readdir(this.tempFolder, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(this.tempFolder, file), err => {
                    if (err) throw err;
                });
            }
        });
    }
}
