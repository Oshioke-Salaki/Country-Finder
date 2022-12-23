'use strict';

const countriesContainer = document.querySelector('.countries');
const form = document.querySelector('.form');
const input = document.querySelector('.text-input');
const alert = document.querySelector('.alert');

///////////////////////////////////////
form.addEventListener('submit', function(e) {
    let country = input.value;
    input.value = '';
    countriesContainer.innerHTML = '';
    countriesContainer.style.opacity = 0;
    const xml = new XMLHttpRequest();

    xml.open('GET', `https://restcountries.com/v3.1/name/${country}`);

    xml.send();

    xml.addEventListener('load', () => {
        if (xml.status !== 200) {
            alert.style.display = 'block';
            setTimeout(function() {
                alert.style.display = 'none';
            }, 3000);

            return;
        }
        alert.style.display = 'none';
        const [data] = JSON.parse(xml.responseText);
        const [lang] = Object.values(data.languages);
        const [curr] = Object.values(data.currencies);
        console.log(data);
        const html = `
            <article class="country">
              <img class="country__img" src="${data.flags.png}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span><i class="fa-solid fa-person"></i></span>${(
                  data.population / 1000000
                ).toFixed(1)}M People</p>
                <p class="country__row"><span><i class="fa-solid fa-language"></i></span>${lang}</p>
                <p class="country__row"><span><i class="fa-solid fa-sack-dollar"></i></span>${
                  curr.name
                } (${curr.symbol})</p>
              </div>
            </article>
          `;

        countriesContainer.insertAdjacentHTML('beforeend', html);

        countriesContainer.style.opacity = 1;
    });
    e.preventDefault();
});