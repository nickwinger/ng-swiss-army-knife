
/**
 * Creates a hidden link to download something given the href url
 * @param url The url which to download
 * @param fileName The name of the file to be downloaded (used for the a tag)
 */
export function createAndClickDownloadLink(url: string, fileName: string) {
  const link = document.createElement('a');

  if (link.download === undefined)
    return;

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Creates a csv data uri from an array, this uri can then be downloaded in the browser
 * using createAndClickDownloadLink
 * @param data an array of string arrays containing the csv data
 */
export function createCsvDataUriFromArray(data: string[][], delimiter: string = ';'): string {
  let csvContent = 'data:text/csv;charset=utf-8,';

  data.forEach(rowArray => {
    const row = rowArray.join(delimiter);
    csvContent += row + '\r\n';
  });

  return csvContent;
}

/**
 * Creates a csv file from the array using createCsvDataUriFromArray
 * And presents it to the user as a download file in the browser
 * @param data an array of string arrays containing the csv data
 * @param filename the name of the csv file which will be downloaded
 */
export function downloadArrayAsCsvFile(data: string[][], filename: string, delimiter: string = ';'): void {
  const csv = createCsvDataUriFromArray(data, delimiter);
  createAndClickDownloadLink(csv, filename);
}

export type FileDataType = 'base64' | 'binaryString';

export interface IFile {
  data: string;
  dataType: FileDataType;
  lastModified: number;
  name: string;
  size: number;
  mimeType: string;
}

/**
 * opens a file dialog to choose a file and returns the file object
 * including the data.
 * When it is an image the data is read as base64, so the dataType is 'base64'
 * All other files are read as binaryString
 * @param fileDialogAccept this is optional, choose the mime types of files
 * the user can select in the file dialog
 */
export async function getFile(fileDialogAccept: string = '*'): Promise<IFile> {
  const p = new Promise<IFile>((resolve, reject) => {

    const element     = document.createElement('div');
    element.innerHTML = `<input type="file" accept="${fileDialogAccept}">`;
    const fileInput   = element.firstChild as HTMLInputElement;

    fileInput.addEventListener('change', () => {
      const file   = fileInput.files[0];
      const reader = new FileReader();

      const doResolve = (data: string, dataType: FileDataType) => {
        element.remove();

        resolve({
          size: file.size,
          lastModified: file.lastModified,
          mimeType: file.type,
          name: file.name,
          dataType: dataType,
          data: data
        });
      };

      if (file.type.startsWith('image')) {
        reader.onload = () => {
          const s          = reader.result as string;
          const base64Part = s.substring(s.indexOf('base64,') + 7);
          doResolve(base64Part, 'base64');
        };

        reader.readAsDataURL(file);
      } else {
        reader.onload = () => {
          doResolve(reader.result as string, 'binaryString');
        };

        reader.readAsBinaryString(file);
      }
    });

    fileInput.click();
  });

  return p;
}

export class FileHelper {
  static getFile = getFile;
  static createAndClickDownloadLink = createAndClickDownloadLink;
  static createCsvDataUriFromArray = createCsvDataUriFromArray;
  static downloadArrayAsCsvFile = downloadArrayAsCsvFile;
}
