import { getAllCountries } from "./api.js";

const container = document.getElementById("country_list_container");
const row = document.createElement("div");
row.className = "row g-4 mt-3";
container.appendChild(row);

// empty array to store all countries
let countriesData = [];

async function displayAllCountries() {
  const countries = await getAllCountries();
  // console.log(countries);
  countriesData = countries; // store all countries in the array

  // need to loop through the each country in that array
  countriesData.forEach((country) => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-3";

    // Clicking this link navigates to country detail page
    // encodeURIComponent makes the country name URL safe, URLs can't have space
    col.innerHTML = `
    <a class="card_link" href="country.html?name=${encodeURIComponent(country.name.common)}"> 
     <div class="card h-100 border border-success">
      <img class="card-img-top" src="${country.flags.svg}" alt="${country.flags.alt}" />
      <div class="card-body">
        <h5 class="card-title"><strong>${country.name.common}</strong></h5>
        <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>  
        <p class="card-text"><strong>Capital:</strong> ${country.capital?.[0]}</p>
        <p class="card-text"><strong>Region:</strong> ${country.region}</p>
      </div>
    </div>
  </a>
    `;
    row.appendChild(col);
  });
}
displayAllCountries();
