import { Response } from "express";
import { FileSystem } from "./FileSystem";
import { IFileData } from "../../models/IFileData";

export class Validation {

  public static async validateFile(res: Response) {
    const fileData = await FileSystem.readDir();

    return this.validateData(fileData);
  }

  public static validateData(fileData: IFileData[]) {
    const invalidProperties = [];

    for (let i = 0; i < fileData.length; i++) {
      const item = fileData[i];

      if (typeof item.code !== 'number' || isNaN(item.code)) {
        invalidProperties.push({ position: i + 1, property: 'code', message: 'formato inválido' });
      }

      if (typeof item.new_price !== 'number' || isNaN(item.new_price)) {
        invalidProperties.push({ position: i + 1, property: 'new_price', message: 'formato inválido' });
      }
    }

    if (invalidProperties.length > 0) {
      return { invalidProperties, validFormat: false };
    } else {
      return { validFormat: true };
    }
  }
}