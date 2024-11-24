//function that converts 1 digit number to 2 digit number if needed
function addingXMonths(number) {

    const today = new Date();
    today.setMonth(today.getMonth() + Number(number));
    return (today.toISOString());
}

module.exports = addingXMonths;