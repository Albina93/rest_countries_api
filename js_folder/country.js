async function displayCountryDetail() {
  // Read the country name from the URL
  const params = new URLSearchParams(window.location.search);
  // here automatically decodes back to string with space
  const name = params.get("name");

  if (!name) {
    document.getElementById("country-detail").innerHTML =
      `<p>No country selected!</p>`;
    return;
  }

  // fetch that specific country from the API
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`,
  );
  const data = await response.json();
  const country = data[0];
  // console.log(country);

  //fetch the border countries if they exist...
  let borderHTML = "<p>Unfortunately, no border countries...</p>";
  if (country.borders && country.borders.length > 0) {
    const borderRes = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`,
    );
    const borderCountries = await borderRes.json();
    // console.log(borderCountries);

    // turning each border country into a clicakable btn
    borderHTML = borderCountries
      .map(
        (bc) =>
          `
          <a href="country.html?name=${encodeURIComponent(bc.name.common)}" class="btn btn-primary me-2 mb-2">
          ${bc.name.common}
        </a>`,
      )
      .join("");
  }

  // Display the detail on the page...
  const container = document.getElementById("country-detail");
  container.innerHTML = `
  <div class="row mt-4">
      <div class="col-md-6">
        <img 
          src="${country.flags.svg}" 
          alt="${country.flags.alt}" 
          class="img-fluid border border-success"
        />
      </div>
      <div class="col-md-6">
        <h2>${country.name.common}</h2>
        <p><strong>Official Name:</strong> ${country.name.official}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
        <div class="mt-3">
          <strong>Border Countries:</strong>
          <div class="mt-2">${borderHTML}</div>
        </div>
         </div>
    </div>
  `;
}
displayCountryDetail();
