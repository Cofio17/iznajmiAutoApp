/*
*Functions that convert date to isoString that matches time in current time zone
*/
const formatDate = (date) => {
    const splitDate = date.toLocaleDateString().split('/');
    let finalDate = `${splitDate[2]}-${convertToTwoDigit(Number(splitDate[0]))}-${convertToTwoDigit(Number(splitDate[1]))}T10:00:00`;
    return finalDate;
};


function convertToTwoDigit(number) {
    if (number < 10) {
        return String(`0${number}`)
    }
    return String(number)
}

export default formatDate;