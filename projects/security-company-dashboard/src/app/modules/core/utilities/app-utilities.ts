export class AppUtilities {
  static convertStringToDate(value: string) {
    let arr = value.split('-');
    let generatedString = `${arr[1]}-${arr[0]}-${arr[2]}`;

    return new Date(generatedString);
  }
}
