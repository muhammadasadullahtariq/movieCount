export default function reverseDate(string) {
  var arr = string.split('-');
  var date = arr[2] + '-' + arr[1] + '-' + arr[0];
  return date;
}
