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


module.exports = {
    filterCarsById,
    updateCarsWithNullCompanyId
}