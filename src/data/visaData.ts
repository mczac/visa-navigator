export interface VisaOption {
  type: string;
  title: string;
  tag: string;
  tagColor: "green" | "blue" | "amber" | "red";
  duration: string;
  fee: string;
  description: string;
  requirements: string[];
  note: string | null;
}

export interface CountryVisaResult {
  country: string;
  found: boolean;
  visas: VisaOption[];
  message: string;
}

const visaFreeCountries = [
  "Brunei Darussalam", "Malaysia", "Thailand", "Vietnam", "Philippines",
  "Cambodia", "Singapore", "Myanmar", "Laos", "Timor-Leste", "Suriname",
  "Colombia", "Hong Kong", "Turkey", "Brazil", "Peru"
];

const voaCountries = [
  "South Africa", "Albania", "United States", "Andorra", "Saudi Arabia",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahrain",
  "Netherlands", "Belarus", "Belgium", "Brazil", "Brunei Darussalam",
  "Bosnia and Herzegovina", "Bulgaria", "Czech Republic", "Chile", "Denmark",
  "Ecuador", "Estonia", "Philippines", "Finland", "Guatemala", "Hong Kong",
  "Hungary", "India", "United Kingdom", "Ireland", "Italy", "Iceland", "Japan",
  "Germany", "Cambodia", "Canada", "Kazakhstan", "Kenya", "Colombia",
  "South Korea", "Croatia", "Kuwait", "Laos", "Latvia", "Liechtenstein",
  "Lithuania", "Luxembourg", "Maldives", "Malaysia", "Malta", "Morocco",
  "Mauritius", "Mexico", "Egypt", "Monaco", "Mongolia", "Mozambique", "Myanmar",
  "Norway", "Oman", "Palestine", "Papua New Guinea", "France", "Peru", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "New Zealand", "Serbia",
  "Seychelles", "Singapore", "Cyprus", "Slovakia", "Slovenia", "Spain",
  "Suriname", "Sweden", "Switzerland", "Taiwan", "Tanzania", "Thailand",
  "Timor-Leste", "China", "Tunisia", "Turkey", "United Arab Emirates",
  "Uzbekistan", "Ukraine", "Vatican", "Venezuela", "Vietnam", "Jordan", "Greece"
];

const callingVisaCountries = [
  "Afghanistan", "Israel", "North Korea", "Liberia", "Nigeria", "Somalia"
];

export const allCountries = [
  ...new Set([
    ...visaFreeCountries, ...voaCountries, ...callingVisaCountries,
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros",
    "Republic of the Congo", "Democratic Republic of the Congo", "Djibouti",
    "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia",
    "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Lesotho", "Libya",
    "Madagascar", "Malawi", "Mali", "Mauritania", "Namibia", "Niger",
    "Sao Tome and Principe", "Senegal", "Sierra Leone", "South Sudan", "Sudan",
    "Togo", "Uganda", "Zambia", "Zimbabwe", "Antigua and Barbuda", "Bahamas",
    "Barbados", "Belize", "Bolivia", "Costa Rica", "Cuba", "Dominica",
    "Dominican Republic", "El Salvador", "Grenada", "Guyana", "Haiti",
    "Honduras", "Jamaica", "Nicaragua", "Panama", "Paraguay",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Trinidad and Tobago", "Uruguay", "Bangladesh", "Bhutan", "Iran", "Iraq",
    "Kyrgyzstan", "Lebanon", "Nepal", "Pakistan", "Sri Lanka", "Syria",
    "Tajikistan", "Turkmenistan", "Yemen", "Georgia", "Moldova", "Montenegro",
    "North Macedonia", "San Marino", "Fiji", "Kiribati", "Marshall Islands",
    "Micronesia", "Nauru", "Palau", "Samoa", "Solomon Islands", "Tonga",
    "Tuvalu", "Vanuatu"
  ])
].sort();

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

function includes(list: string[], country: string) {
  const n = normalize(country);
  return list.some(c => normalize(c) === n);
}

export function lookupVisa(country: string): CountryVisaResult {
  const trimmed = country.trim();
  if (!trimmed) return { country: trimmed, found: false, visas: [], message: "" };

  const matched = allCountries.find(c => normalize(c) === normalize(trimmed));
  if (!matched) {
    return { country: trimmed, found: false, visas: [], message: "" };
  }

  if (normalize(matched) === normalize("Indonesia")) {
    return {
      country: "Indonesia",
      found: true,
      visas: [],
      message: "Citizens of Indonesia do not need a visa to travel within their own country."
    };
  }

  const visas: VisaOption[] = [];

  if (includes(visaFreeCountries, matched)) {
    visas.push({
      type: "visa-free",
      title: "Visa-Free Entry",
      tag: "Visa-Free",
      tagColor: "green",
      duration: "Up to 30 days",
      fee: "Free",
      description: `As a citizen of ${matched}, you can enter Indonesia visa-free for tourism purposes. This is a single-entry permit that cannot be extended or converted.`,
      requirements: [
        "Passport valid for at least 6 months",
        "Return or onward ticket",
        "Tourism purposes only"
      ],
      note: "Cannot be extended or converted to another visa type."
    });
  }

  if (includes(voaCountries, matched)) {
    visas.push({
      type: "voa",
      title: "Visa on Arrival / e-VoA",
      tag: "Visa on Arrival",
      tagColor: "blue",
      duration: "Up to 30 days",
      fee: "IDR 500,000 (~$32)",
      description: `Citizens of ${matched} can obtain a Visa on Arrival at Indonesian entry points, or apply online for an e-VoA (processed in 1–3 business days).`,
      requirements: [
        "Passport valid for at least 6 months",
        "Return or onward ticket",
        "Payment by card (IDR 500,000)"
      ],
      note: "Valid for tourism, business meetings, government duties, and transit. Cannot be used for employment."
    });
  }

  if (includes(callingVisaCountries, matched)) {
    visas.push({
      type: "calling",
      title: "Calling Visa",
      tag: "Calling Visa",
      tagColor: "amber",
      duration: "Up to 60 days",
      fee: "Contact embassy",
      description: `Citizens of ${matched} require a Calling Visa, which must be arranged through a local sponsor in Indonesia before travel.`,
      requirements: [
        "Local sponsor must submit formal request to immigration",
        "Passport valid throughout journey + 6 months after departure",
        "Proof of sufficient funds",
        "Letter of intention",
        "Return or onward ticket",
        "Biometric photograph"
      ],
      note: "A local sponsor in Indonesia is mandatory. Contact your nearest Indonesian embassy for current fees."
    });
  }

  // If none of the above matched, it's a single-entry visa country
  if (visas.length === 0) {
    visas.push({
      type: "single-entry",
      title: "Single-Entry Visa",
      tag: "Embassy Visa",
      tagColor: "red",
      duration: "Up to 180 days",
      fee: "IDR 1,500,000–2,000,000",
      description: `Citizens of ${matched} must apply for a single-entry visa at an Indonesian embassy or visa processing center before traveling.`,
      requirements: [
        "Passport valid 6+ months after departure with 2 blank pages",
        "Bank statement (last 3 months) showing min. USD 2,000",
        "Return or onward ticket",
        "Biometric photograph",
        "Accommodation details",
        "Additional documents may be requested"
      ],
      note: "Must be obtained before travel. Visit your nearest Indonesian embassy or consulate."
    });
  }

  const plural = visas.length > 1 ? "options" : "option";
  return {
    country: matched,
    found: true,
    visas,
    message: `Citizens of ${matched} have ${visas.length} visa ${plural} for visiting Indonesia.`
  };
}
