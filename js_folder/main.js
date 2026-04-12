import { getAllCountries } from "./api.js";

const container = document.getElementById("country_list_container");
const row = document.createElement("div");
row.className = "row g-4 mt-3 w-100";
container.appendChild(row);

//Grabbing my div dropdown elements
const selected = document.querySelector(".dropdown-selected");
const dropdownOptions = document.querySelector(".dropdown-options");
const options = document.querySelectorAll(".dropdown-options div");

// grabbing the search input
const searchInput = document.getElementById("search_input");

// empty array to store all countries
let countriesData = [];

// Separated into its own function so we can call it anytime with any array
function renderCountries(countries) {
  //clear the row first to avoid duplicates stacking up
  row.innerHTML = "";

  // need to loop through the each country in that array
  countries.forEach((country) => {
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

async function displayAllCountries() {
  const countries = await getAllCountries();
  // console.log(countries);
  countriesData = countries; // store all countries in the array

  // show all countries
  renderCountries(countriesData);

  // toggle dropdown open/close
  selected.addEventListener("click", () => {
    dropdownOptions.classList.toggle("open");
  });

  // when user clicks a region option
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedRegion = option.textContent.trim(); // trim() removes any extra whitespace from start to end

      // update dropdown label to show selected region
      selected.firstChild.textContent = selectedRegion;

      // close the dropdown
      dropdownOptions.classList.remove("open");

      // filter the countries by selected region
      const filtered = countriesData.filter(
        (country) => country.region === selectedRegion,
      );
      renderCountries(filtered);
    });
  });

  // Listening for user typing in the search input field
  searchInput.addEventListener("input", (e) => {
    const searchVal = e.target.value.toLowerCase().trim();
    console.log("searchValue:", `"${searchVal}"`);

    if (searchVal === "") {
      renderCountries(countriesData);
      return;
    }
    const filtered = countriesData.filter((country) => {
      return country.name.common.toLowerCase().includes(searchVal);
    });

    renderCountries(filtered);
  });
}

displayAllCountries();
