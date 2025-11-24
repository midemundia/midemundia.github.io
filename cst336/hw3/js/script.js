// TODO: Revisit/Rework list structures since there's probably a better way to do it js

const countries = {
    Algeria: "DZA",
    Argentina: "ARG",
    Australia: "AUS",
    Austria: "AUT",
    Belgium: "BEL",
    Benin: "BEN",
    Bolivia: "BOL",
    Brazil: "BRA",
    Brunei: "BRN",
    Bulgaria: "BGR",
    "Burkina Faso": "BFA",
    "Cabo Verde": "CPV",
    Cambodia: "KHM",
    Canada: "CAN",
    Chile: "CHL",
    China: "CHN",
    Colombia: "COL",
    Congo: "COG",
    "Côte d'Ivoire": "CIV",
    Croatia: "HRV",
    Czechia: "CZE",
    Denmark: "DNK",
    Egypt: "EGY",
    "Equatorial Guinea": "GNQ",
    Estonia: "EST",
    Ethiopia: "ETH",
    Finland: "FIN",
    France: "FRA",
    Gabon: "GAB",
    Germany: "DEU",
    Ghana: "GHA",
    Greece: "GRC",
    Guinea: "GIN",
    "Guinea-Bissau": "GNB",
    Hungary: "HUN",
    India: "IND",
    Indonesia: "IDN",
    Iran: "IRN",
    Iraq: "IRQ",
    Ireland: "IRL",
    Italy: "ITA",
    Japan: "JPN",
    Kuwait: "KWT",
    Laos: "LAO",
    Latvia: "LVA",
    Liberia: "LBR",
    Libya: "LBY",
    Lithuania: "LTU",
    Luxembourg: "LUX",
    Malaysia: "MYS",
    Mali: "MLI",
    Malta: "MLT",
    Mexico: "MEX",
    Myanmar: "MMR",
    Netherlands: "NLD",
    "New Zealand": "NZL",
    Niger: "NER",
    Nigeria: "NGA",
    Paraguay: "PRY",
    Peru: "PER",
    Philippines: "PHL",
    Poland: "POL",
    Portugal: "PRT",
    "Republic of Cyprus": "CYP",
    Romania: "ROU",
    Russia: "RUS",
    "Saudi Arabia": "SAU",
    Senegal: "SEN",
    "Sierra Leone": "SLE",
    Singapore: "SGP",
    Slovakia: "SVK",
    Slovenia: "SVN",
    "South Africa": "ZAF",
    "South Korea": "KOR",
    Spain: "ESP",
    Sweden: "SWE",
    Thailand: "THA",
    "The Gambia": "GMB",
    Togo: "TGO",
    "United Arab Emirates": "ARE",
    "United States": "USA",
    Uruguay: "URY",
    Venezuela: "VEN",
    Vietnam: "VNM"
};

// Partnership reference object - lookup which countries are in which partnership
const partnerships = {
    BRICS: [
        "Brazil", "Russia", "India", "China", "South Africa", 
        "Egypt", "Ethiopia", "Iran", "Saudi Arabia", "United Arab Emirates"
    ],
    ECOWAS: [
        "Benin", "Burkina Faso", "Cabo Verde", "Côte d'Ivoire", "The Gambia", 
        "Ghana", "Guinea", "Guinea-Bissau", "Liberia", "Mali", "Niger", 
        "Nigeria", "Senegal", "Sierra Leone", "Togo"
    ],
    EU: [
        "Austria", "Belgium", "Bulgaria", "Croatia", "Republic of Cyprus", 
        "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", 
        "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", 
        "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", 
        "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"
    ],
    MERCOSUR: [
        "Argentina", "Bolivia", "Brazil", "Paraguay", "Uruguay"
    ],
    OPEC: [
        "Algeria", "Congo", "Equatorial Guinea", "Gabon", "Iran", "Iraq", 
        "Kuwait", "Libya", "Nigeria", "Saudi Arabia", "United Arab Emirates", 
        "Venezuela"
    ],
    "Pacific Alliance": [
        "Chile", "Colombia", "Mexico", "Peru"
    ],
    RCEP: [
        "Australia", "Brunei", "Cambodia", "China", "Indonesia", "Japan", 
        "Laos", "Malaysia", "Myanmar", "New Zealand", "Philippines", 
        "Singapore", "South Korea", "Thailand", "Vietnam"
    ],
    USMCA: [
        "Canada", "Mexico", "United States"
    ]
};

//Event Listeners
document.querySelector("button").addEventListener("click",  displayPopulationData);

//Functions
function getCountryPartnerships(countryName) {
    const memberOf = [];
    for (const [partnership, members] of Object.entries(partnerships)) {
        if (members.includes(countryName)) {
            memberOf.push(partnership);
        }
    }
    return memberOf;
}

function getCountryISOCode(countryName) {
    return countries[countryName] || null;
}

function getPartnershipMembers(partnershipName) {
    return partnerships[partnershipName] || [];
}

async function getPopData(year, isoCodeArray){
    const isoCodeString = isoCodeArray.join(';');
    let url = `https://api.worldbank.org/v2/country/${isoCodeString}/indicator/SP.POP.TOTL?format=json&date=${year}&per_page=500`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data[1] && data[1].length > 0) {
            // Returns array of all country data
            return data[1];
        }
        return [];
    } catch (error) {
        console.error("Error fetching population data:", error);
        return [];
    }
}

async function displayPopulationData() {
    // Map radio button values to partnership names
    const partnershipMap = {
        "BR": "BRICS",
        "EW": "ECOWAS",
        "EU": "EU",
        "ME": "MERCOSUR",
        "OP": "OPEC",
        "PA": "Pacific Alliance",
        "RC": "RCEP",
        "US": "USMCA"
    };
    
    // Get the year
    const yearSelect = document.getElementById("year-select");
    const yearValue = yearSelect.value;
    
    if (!yearValue) {
        alert("Please select a year");
        return;
    }
    
    // Get the partnership from user
    const radioButtons = document.querySelectorAll('input[name="partnership"]');
    let selectedPartnership = null;
    
    for (const radio of radioButtons) {
        if (radio.checked) {
            selectedPartnership = radio.value;
            break;
        }
    }
    
    if (!selectedPartnership) {
        alert("Please select a trade partnership");
        return;
    }
    
    // look up partnership and member nations 
    const partnershipName = partnershipMap[selectedPartnership];
    const countryList = getPartnershipMembers(partnershipName);
    
    // Load and display population data
    const displayElement = document.getElementById("population-data");
    displayElement.innerHTML = "Loading population data...";
    const results = [];
    let totalPopulation = 0;
    const isoCodeArray = countryList.map(getCountryISOCode).filter(code => code !== null);
    const populationData = await getPopData(yearValue, isoCodeArray);

    for (const country of countryList) {
        const isoCode = getCountryISOCode(country);
        const countryData = populationData.find(entry => entry.countryiso3code === isoCode);
        const population = countryData ? countryData.value : null;
        
        if (population !== null) {
            results.push(`${country}: ${population.toLocaleString()}`);
            totalPopulation += population;
        } else {
            results.push(`${country}: Data not available`);
        }
    }

    const partnershipHeader = `<div class="trade-group-name"><u>${partnershipName}</u></div><br>`;
    // Print each country and its population
    results.push(`<br>Total population: ${totalPopulation.toLocaleString()}`);
    displayElement.innerHTML = partnershipHeader + results.join("<br>");
}
