const endpoint =
	'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

fetch(endpoint)
	.then(datas => datas.json())
	.then(data => cities.push(...data));

function findMatches(word, cities) {
	return cities.filter(place => {
		const regex = new RegExp(word, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	});
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function displayMatches() {
	const matchArray = findMatches(this.value, cities);
	const html = matchArray.map(arr => {
			const regex = new RegExp(this.value, 'gi');
			const cityName = arr.city.replace(regex, `<span class="hl">${this.value}</span>`);
			const stateName = arr.state.replace(regex, `<span class="hl">${this.value}</span>`);
			return `
      <li>
        <span class="name">${cityName}, ${stateName} </span>
        <span class="population">${numberWithCommas(arr.population)}</span>
      </li>
    `
		}).join('');
	suggestions.innerHTML=html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
