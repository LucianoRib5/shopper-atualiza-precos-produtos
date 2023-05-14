import { Response } from "express";
import { FileSystem } from "./FileSystem";
import { IFileData } from "../../models/IFileData";

export class Validation {

  public static validateFile(tempFolder: string, res: Response) {
    const fileData = FileSystem.readDir(tempFolder, res);
    res.send(this.validateData(fileData));
  }

  public static validateData(fileData: IFileData[]) {
    const invalidProperties = [];

    for (let i = 0; i < fileData.length; i++) {
      const item = fileData[i];

      if (typeof item.code !== 'number') {
        invalidProperties.push({ position: i, property: 'code' });
      }

      if (typeof item.new_price !== 'number' || isNaN(item.new_price)) {
        invalidProperties.push({ position: i, property: 'new_price' });
      }
    }

    if (invalidProperties.length > 0) {
      return { invalidProperties, valid: false };
    } else {
      return { valid: true };
    }
  }
}