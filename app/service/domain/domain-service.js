export function getCurrentDate() {
    const utcOffset = 3;
    const currentUtcTime = new Date();
    const currentUtc3Time = new Date(currentUtcTime.getTime() + utcOffset * 60 * 60 * 1000);
    return currentUtc3Time;
}

export function convertDate(utcTime) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = utcTime.toLocaleString('ru-RU', options);
    return formattedDate;
}





