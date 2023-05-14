import multer from "multer";
import path from 'path';

export class Multer {
    public static single(file: string) {
        const tempFolderPath = path.join(__dirname, 'temp');

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
}
