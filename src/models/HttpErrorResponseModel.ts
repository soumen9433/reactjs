import { v4 as uuidv4 } from 'uuid';

export default class HttpErrorResponseModel {
  public readonly id: string = uuidv4();
  public status: number = 0;
  public message: string = '';
  public errors: string[] = [];
  public url: string = '';
  public raw: any = null;
}
