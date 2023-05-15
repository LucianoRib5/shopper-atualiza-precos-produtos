import { Response } from "express";
import { FileSystem } from "./FileSystem";
import { IFileData } from "../../models/IFileData";

export class Validation {

  public static async validateFile(res: Response) {
    const fileData = await FileSystem.readDir();

    console.log('fileData -', fileData);
    

    res.send(this.validateData(fileData));
  }

  public static validateData(fileData: IFileData[]) {
    const invalidProperties = [];

    for (let i = 0; i < fileData.length; i++) {
      const item = fileData[i];

      if (typeof item.code !== 'number' || isNaN(item.code)) {
        invalidProperties.push({ position: i, property: 'code', message: 'formato inválido' });
      }

      if (typeof item.new_price !== 'number' || isNaN(item.new_price)) {
        invalidProperties.push({ position: i, property: 'new_price', message: 'formato inválido' });
      }
    }

    if (invalidProperties.length > 0) {
      return { invalidProperties, valid: false };
    } else {
      return { valid: true };
    }
  }
}