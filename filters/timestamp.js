/*
  A simple ISO timestamp for Nunjucks
*/
module.exports = function (date) {
  const timestamp = new Date(date)
  return timestamp.toISOString();
}
