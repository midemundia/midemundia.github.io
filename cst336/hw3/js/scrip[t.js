// TODO: Revisit this since there's probably a better way to do it js

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
document.querySelector("#explore-btn").addEventListener("click",  displayPopulationData);


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

async function getPopData(year, isoCode){
    let url = `https://api.worldbank.org/v2/country/${isoCode}/indicator/SP.POP.TOTL?format=json&date=${year}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // World Bank API returns an array where the second element contains the data
        if (data && data[1] && data[1].length > 0) {
            const population = data[1][0].value;
            return population;
        } else {
            console.error("No population data found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching population data:", error);
        return null;
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
    
    // Get the year from the dropdown menu
    const yearSelect = document.getElementById("year-select");
    const yearValue = yearSelect.value;
    
    if (!yearValue) {
        alert("Please select a year");
        return;
    }
    
    // Convert year value (e.g., "22" -> "2022")
    const year = "20" + yearValue;
    
    // Get the partnership from the radio button
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
    
    // Get the partnership name from the map
    const partnershipName = partnershipMap[selectedPartnership];
    
    // Get the countries from the partnership list using getPartnershipMembers()
    const countryList = getPartnershipMembers(partnershipName);
    
    // Get the display element
    const displayElement = document.getElementById("population-data");
    displayElement.innerHTML = "Loading population data...";
    
    // Array to store results
    const results = [];
    
    // Loop through each country and fetch population data
    for (const countryName of countryList) {
        // Look up the ISO code using getCountryISOCode()
        const isoCode = getCountryISOCode(countryName);
        
        if (isoCode) {
            // Query the World Bank API using the year and ISO code
            const population = await getPopData(year, isoCode);
            
            if (population !== null) {
                results.push(`${countryName}: ${population.toLocaleString()}`);
            } else {
                results.push(`${countryName}: Data not available`);
            }
        } else {
            results.push(`${countryName}: ISO code not found`);
        }
    }
    
    // Print each country and its population to the page as a vertical list
    displayElement.innerHTML = results.join("<br>");
}
