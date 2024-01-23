function timestampToYYYYMMDD(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return {
        year,
        month,
        day
    }
}

function timeFormatter(timestamp) {
    const {
        year,
        month,
        day
    } = timestampToYYYYMMDD(timestamp)
    return `${day}/${month}/${year}`;
}

function htmlTimeFormat(timestamp) {
    const {
        year,
        month,
        day
    } = timestampToYYYYMMDD(timestamp)
    return `${year}-${month}-${day}`;
}
module.exports = {
    timestampToYYYYMMDD,
    timeFormatter,
    htmlTimeFormat
}