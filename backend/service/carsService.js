const Car = require('../models/car');

const filterCarsById = async (id) => {
    try {
        const totalCars = await Car.find({ companyId: id });
        return totalCars;

    } catch (error) {
        console.error('Error counting cars:', error);
        throw error;
    }
}

const updateCarsWithNullCompanyId = async (newCompanyId) => {
    try {
        const result = await Car.updateMany(
            { companyId: null }, // Filtriramo kola koja imaju companyId null
            { $set: { companyId: newCompanyId } } // Ažuriramo companyId na novu vrednost
        );
        return result; // Vraćamo rezultat ažuriranja
    } catch (error) {
        console.error('Error updating cars:', error);
        throw error; // Bacamo grešku ako dođe do problema
    }
};

const returnCarImages = async (licensePlate) => {
    const BASE_URL = `https://storage.googleapis.com/iznajmime/carImages/`;
    const imagesArray = [];
    const plateUpper = String(licensePlate).toUpperCase();
    try {
        let index = 1;

        while (true) {
            const plate = `${plateUpper}_${index}.webp`;
            const response = await fetch(`${BASE_URL}${plate}`);

            if (!response.ok) break;
            imagesArray.push(`${BASE_URL}${plate}`);
            index++;
        }
    } catch (error) {
        console.error("Error trying to get images:", error);
    }
    return imagesArray;
};

module.exports = {
    filterCarsById,
    updateCarsWithNullCompanyId,
    returnCarImages
}