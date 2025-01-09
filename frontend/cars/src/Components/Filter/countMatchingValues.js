/**
   * Broji koliko vrednosti iz prosleđenog niza `filter` postoji u specificiranoj grupi `filterGroups`.
   *
   * @param {Array<{legend: string, inputs: string[]}>} filterGroups - Niz grupa sa legendama i unosima.
   * @param {string[]} filter - Niz vrednosti za koje se traže poklapanja.
   * @param {number} [groupIndex=0] - Indeks grupe u kojoj se vrši pretraga. Podrazumevano je 0.
   * @returns {number} Broj vrednosti iz `filter` koje postoje u odabranoj grupi.
   */
export default function countMatchingValues(filterGroups, filter, groupIndex = 0) {
    if (groupIndex < 0 || groupIndex >= filterGroups.length) {
      return 0; // Ako je indeks van opsega, vraća 0
    }

    const groupInputs = filterGroups[groupIndex].inputs;
    return filter.reduce(
      (count, value) => count + (groupInputs.includes(value) ? 1 : 0),
      0
    );
  }