import { FormHelper } from './form';
import { MiscHelper } from './misc';
import { FileHelper } from './file';
import { StringHelper } from './string';
import { DateHelper } from './date';
import { ObjectHelper } from './object';

export class Helper {
  static date = DateHelper;
  static form = FormHelper;
  static misc = MiscHelper;
  static file = FileHelper;
  static string = StringHelper;
  static object = ObjectHelper;
}
