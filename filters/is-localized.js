module.exports = (url, langs) => {
    return langs.map(lang => lang.url).indexOf(url) > -1;
}