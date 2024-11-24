function addingXMonths(number) {

    const today = new Date();
    today.setMonth(today.getMonth() + Number(number));
    return (today.toISOString());
}

module.exports = addingXMonths;