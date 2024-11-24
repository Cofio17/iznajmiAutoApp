const { writeFile } = require('fs');

//method for saving reservtions data- incomplete
function reservationsPost(req, res) {
    console.log(`Received data ${JSON.stringify(req.body, null, 2)}`);
    writeFile('./reservations.txt', JSON.stringify(req.body, null, 2) + '\n', { flag: 'a' }, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" })
        }
    });
    res.status(200).json({ message: 'Reservation received' });
}

module.exports = { reservationsPost };

