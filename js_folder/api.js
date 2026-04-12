let url =
  "https://restcountries.com/v3.1/all?fields=name,capital,region,borders,flags,population,languages,currencies";

// fetching data from REST Countries API
export async function getAllCountries() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const countriesData = await response.json();
    // console.log(countriesData);
    return countriesData;
  } catch (error) {
    console.error("Error fetching countries: ", error);
  }
}
// getAllCountries();
