export default function getMyFormatDateStr(date) {

	let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let yy = date.getFullYear();

	return yy + '-' + mm + '-' + dd;
}