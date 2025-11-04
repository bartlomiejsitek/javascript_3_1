document.addEventListener('DOMContentLoaded', () => {
    const capitalInput = document.getElementById('capitalInput');
    const searchButton = document.getElementById('searchButton');
    const countryTable = document.getElementById('countryTable');
    const countryTableBody = document.getElementById('countryTableBody');
    const errorDiv = document.getElementById('error');

    searchButton.addEventListener('click', async () => {
        const capital = capitalInput.value.trim();
        if (!capital) {
            alert('Proszę wprowadzić nazwę stolicy.');
            return;
        }

        errorDiv.classList.add('hidden');
        countryTable.classList.add('hidden');
        countryTableBody.innerHTML = '';

        try {
            const response = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Nie znaleziono kraju dla stolicy: ${capital}. Sprawdź pisownię.`);
                }
                throw new Error(`Błąd HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.length > 0) {
                data.forEach(country => {
                    const row = countryTableBody.insertRow();
                    row.insertCell().textContent = country.name.common;
                    row.insertCell().textContent = country.capital ? country.capital.join(', ') : 'N/A';
                    row.insertCell().textContent = country.population ? country.population.toLocaleString() : 'N/A';
                    row.insertCell().textContent = country.region || 'N/A';
                    row.insertCell().textContent = country.subregion || 'N/A';
                });
                countryTable.classList.remove('hidden');
            } else {
                errorDiv.textContent = `Nie znaleziono kraju dla stolicy: ${capital}.`;
                errorDiv.classList.remove('hidden');
            }

        } catch (error) {
            errorDiv.textContent = `Wystąpił błąd: ${error.message}`;
            errorDiv.classList.remove('hidden');
            console.error('Błąd podczas pobierania danych:', error);
        } finally {
        }
    });
});