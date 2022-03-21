const getCountry = document.querySelector(".country");
const getSearch = document.querySelector(".search");
const countryName = document.getElementsByClassName("country-name");
const toggleBackground = document.querySelector(".toggle");
const containerBody = document.getElementById("container-body");
const navBar = document.querySelector(".title-navbar-dark");
const searchContainer = document.querySelector(".search-conatiner");
const countryCard = document.querySelector(".country");
const modeText = document.querySelector('.mode-text');
const bodyDiv = document.getElementById("body");
const countryModalBody = document.getElementById("countryModalBody");
const countryModal = document.querySelector(".country-modal")
const backButton = document.querySelector(".back-button");
// Displaying all the country

function showCountry() {
   fetch("https://restcountries.com/v2/all")
      .then(function (response) {
         return response.json();
      })
      .then(function (myJson) {
         myJson.forEach(element => {
            const countryCardDiv = document.createElement("div");
            countryCardDiv.classList.add("country-card");
            countryCardDiv.innerHTML = `
   <img src="${element.flag}" class="card-img-top" alt="Countries Flag">
   <div class="card-body">
     <h3 class="country-name">${element.name}</h3>
     <p><strong>Population : </strong> ${element.population}</p>
     <p class="region-name"><strong>Region : </strong> ${element.region}</p>
     <p><strong>Capital : </strong> ${element.capital}</p>
   </div>  
`;
            getCountry.appendChild(countryCardDiv);
            countryCardDiv.addEventListener("click", () => {
               showCountryToggle(element);
            });
         });
      });
}
showCountry();

//Search functionality to search each country

getSearch.addEventListener("input", () => {
   Array.from(countryName).forEach(elem => {
      if (elem.innerText.toLowerCase().includes(getSearch.value.toLowerCase())) {
         elem.parentElement.parentElement.style.display = "grid";
      } else {
         elem.parentElement.parentElement.style.display = "none";
         bodyDiv.classList.toggle("heightPer")
      }
   })
})

//Toggle between dark mode and light mode

toggleBackground.addEventListener("click", () => {
   containerBody.classList.toggle("light");
   navBar.classList.toggle("navBar-light");
   searchContainer.classList.toggle("searcontainer-light");
   countryCard.classList.toggle("countryCard-light");
   countryModalBody.classList.toggle("light");
   backButton.classList.toggle("light-button");
   if (modeText.innerHTML === "Dark Mode") {
      modeText.innerHTML = "Light Mode";
   } else {
      modeText.innerHTML = "Dark Mode"
   }
})



backButton.addEventListener("click", () => {
   bodyDiv.classList.toggle("show");
   countryModalBody.classList.toggle("show");
});

function showCountryToggle(element) {
   countryModalBody.classList.toggle("show");
   bodyDiv.classList.toggle("show");
   countryModal.innerHTML = `
            <div class="alignModal">
            <div class="countryModal-left">
                <img src="${element.flag}" class="card-img-top" alt="Countries Flag">
            </div>
            <div class="countryModal-right">
               <h2>${element.name}</h2>
               <div class="alignCountryDetail">
               <div class="countryDetail-left">
                <p><strong>Native Name: </strong>${element.nativeName}</p>
                <p><strong>Population: </strong>${element.population}</p>
                <p><strong>Region: </strong>${element.region}</p>
                <p><strong>Capital: </strong>${element.capital}</p>
               </div>
               <div class="countryDetail-right">
                <p><strong>Sub-region: </strong>${element.subregion}</p>
                <p><strong>Top Level Domain: </strong>${element.topLevelDomain}</p>
                <p><strong>Currencies: </strong>${element.currencies.map(elem=>elem.name)}</p>
                <p><strong>Languages: </strong>${element.languages.map(elem=>elem.name)}</p>
               </div>
               </div> 
             </div>
            </div>
   `
}

// to toggle between country detail and all the country
