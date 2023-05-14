import multer from "multer";
import path from 'path';
import fs from 'fs';

export class Multer {
    public static single(file: string) {
        const tempFolderPath = path.join(__dirname, 'temp');

        this.clearTempFolder(tempFolderPath);
        
        const storage = multer.diskStorage({
            destination: tempFolderPath,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const extension = path.extname(file.originalname);
                cb(null, file.fieldname + '-' + uniqueSuffix + extension);
            },
        });

        const upload = multer({ storage });
        
        return upload.single(file);
    }

    public static clearTempFolder(tempFolderPath: string) {
        fs.readdir(tempFolderPath, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(tempFolderPath, file), err => {
                    if (err) throw err;
                });
            }
        });
    }
}
