
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

export class FileHelper {
  static createAndClickDownloadLink = createAndClickDownloadLink;
  static createCsvDataUriFromArray = createCsvDataUriFromArray;
  static downloadArrayAsCsvFile = downloadArrayAsCsvFile;
}
