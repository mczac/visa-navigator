export interface VisaRequirement {
  label: string;
  value: string;
}

export interface VisaOption {
  type: string;
  title: string;
  tag: string;
  tagColor: "green" | "blue" | "amber" | "red" | "teal" | "gray" | "purple";
  duration: string;
  fee: string;
  description: string;
  requirements: VisaRequirement[];
  notes: string[];
}

export interface CountryVisaResult {
  country: string;
  found: boolean;
  visas: VisaOption[];
  message: string;
}

// ── Country lists ──

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

// ── Visa content templates ──

const visaFreeContent: Omit<VisaOption, "description"> = {
  type: "visa-free",
  title: "Visa-Free Entry",
  tag: "Visa-Free",
  tagColor: "green",
  duration: "Up to 30 days",
  fee: "Free",
  requirements: [
    { label: "Purpose", value: "Valid for tourism purposes only" },
    { label: "Entry", value: "Single entry" },
    { label: "Extension", value: "Cannot be extended or converted" },
    { label: "Passport", value: "Must be valid for at least 6 months" },
  ],
  notes: ["Cannot be extended or converted to another visa type."],
};

const voaContent: Omit<VisaOption, "description"> = {
  type: "voa",
  title: "Visa on Arrival / e-VoA",
  tag: "Visa on Arrival",
  tagColor: "blue",
  duration: "Up to 30 days",
  fee: "IDR 500,000 (~$35)",
  requirements: [
    { label: "Passport", value: "Valid for at least 6 months." },
    { label: "A ticket", value: "Return or onward ticket." },
    { label: "(Optional) Invitation Letter", value: "In case of a governmental visit. Issued by the Indonesian ministry, department, or institution concerned." },
    { label: "Fee", value: "IDR 500,000 (paid by card)" },
  ],
  notes: [
    "This visa cannot be used to obtain employment in Indonesia. Holders of a (e-)VoA cannot be involved in any gainful activities.",
    "e-VoA vs VoA: Regular Indonesian VoA and e-VoA are practically the same. The main difference is that e-VoA is applied and issued online, while VoA is obtained at the entry point. With an e-VoA, you don't have to wait in the queue at immigration and have a much smoother arrival. It usually takes 1 to 3 business days for the visa to be issued.",
  ],
};

const callingContent: Omit<VisaOption, "description"> = {
  type: "calling",
  title: "Calling Visa",
  tag: "Calling Visa",
  tagColor: "amber",
  duration: "Up to 60 days",
  fee: "Contact embassy",
  requirements: [
    { label: "Sponsor", value: "A local company, Indonesian resident or any eligible individual can be your sponsor. The sponsor is required to submit a formal request to Indonesian immigration authorities." },
    { label: "Passport", value: "Valid throughout your journey plus 6 months after your date of departure." },
    { label: "Proof of Sufficient Funds", value: "Bank statements and any other document that proves your self-sustainability." },
    { label: "Letter of Intention", value: "Travel itinerary, a letter disclosing your purpose of visit." },
    { label: "Proof of Return", value: "Return or onward ticket." },
    { label: "Photographs", value: "A biometric photograph." },
    { label: "Further Documents", value: "The mission you are applying through can request any additional documents." },
    { label: "Fee", value: "Subject to change depending on your citizenship and case. Contact nearest embassy for more information." },
  ],
  notes: [],
};

const singleEntryContent: Omit<VisaOption, "description"> = {
  type: "single-entry",
  title: "Single-Entry Visa",
  tag: "Single-Entry Visa",
  tagColor: "red",
  duration: "Up to 180 days",
  fee: "IDR 1,500,000–2,000,000",
  requirements: [
    { label: "Passport", value: "Valid for at least 6 months after the date of departure, with at least 2 blank pages." },
    { label: "Proof of Sufficient Funds", value: "A bank statement from the last 3 months showing a minimum balance of USD 2,000." },
    { label: "Proof of Return", value: "Return or onward ticket." },
    { label: "Photographs", value: "A biometric photograph." },
    { label: "Further Documents", value: "The mission you are applying through can request any additional documents." },
    { label: "Accommodation Details", value: "Address of your stay, such as hotel, resort, guesthouse, or host." },
    { label: "Fee", value: "IDR 1,500,000 to 2,000,000" },
  ],
  notes: [],
};

const socialCulturalContent: Omit<VisaOption, "description"> = {
  type: "social-cultural",
  title: "Social-Cultural Visa (B211A)",
  tag: "B211A",
  tagColor: "purple",
  duration: "60 days (extendable to 180)",
  fee: "Varies by agent/embassy",
  requirements: [
    { label: "Passport", value: "Valid for at least 6 months after the date of departure, with at least 2 blank pages." },
    { label: "Sponsorship Letter", value: "A letter from a sponsor in Indonesia (individual or organization)." },
    { label: "Proof of Sufficient Funds", value: "Bank statements showing adequate funds for your stay." },
    { label: "Proof of Return", value: "Return or onward ticket." },
    { label: "Photographs", value: "A biometric photograph." },
    { label: "Accommodation Details", value: "Address of your stay, such as hotel, resort, guesthouse, or host." },
  ],
  notes: [
    "Valid for 60 days upon entry. Can be extended up to 4 times (30 days each), for a total stay of up to 180 days.",
    "Requires a sponsorship letter from an Indonesian individual or organization.",
  ],
};

const studentContent: Omit<VisaOption, "description"> = {
  type: "student",
  title: "Student Visa",
  tag: "Student Visa",
  tagColor: "teal",
  duration: "6 months – 1 year",
  fee: "~IDR 2,000,000",
  requirements: [
    { label: "Passport", value: "Valid for at least 12 months beyond your date of entry." },
    { label: "Sponsor", value: "A letter of sponsorship from the university." },
    { label: "Proof of Sufficient Funds", value: "Bank statements proving that you have sufficient funds to support yourself in Indonesia." },
    { label: "Letter of Admission", value: "Official confirmation of your enrollment to the program." },
    { label: "Photographs", value: "A biometric photograph." },
    { label: "Study Permit", value: "Issued by the Ministry of Education." },
    { label: "Accommodation Details", value: "Address of your stay, such as hotel, resort, guesthouse, or host." },
    { label: "Fee", value: "About IDR 2,000,000" },
  ],
  notes: [
    "You cannot work or be involved in any gainful activities on a student visa.",
    "A student visa is often issued for 6 months to 1 year. After this period, you will need to extend your visa.",
  ],
};

const employmentContent: Omit<VisaOption, "description"> = {
  type: "employment",
  title: "Employment Visa",
  tag: "Employment Visa",
  tagColor: "gray",
  duration: "Up to 1 year (renewable)",
  fee: "Varies",
  requirements: [
    { label: "Passport", value: "Valid for at least 18 months beyond entry." },
    { label: "CV", value: "Proving the employee's work experience in the past 5 years." },
    { label: "Qualifications", value: "Copies of certificates, diplomas and other documents." },
    { label: "Health Insurance", value: "Proof of insurance coverage throughout the stay." },
    { label: "Photographs", value: "A passport-size photo." },
    { label: "Employment Contract", value: "Signed by the employee and the employer." },
    { label: "RPTKA Approval (Employer)", value: "Issued by the Ministry of Manpower." },
    { label: "Company Documents (Employer)", value: "Deed of establishment, tax number, business identification number, etc." },
    { label: "DPKK Fee Payment (Employer)", value: "Proof of payment for the Skills and Development Fund (USD 100/month)." },
  ],
  notes: [],
};

// ── Static visa overview cards (for the overview grid) ──

export const visaOverviewCards = [
  {
    title: "Visa-Free Entry",
    subtitle: "30 Days",
    color: "green" as const,
    points: [
      "Valid for tourism purposes only",
      "Single entry",
      "Cannot be extended or converted",
      "Passport must be valid for at least 6 months",
    ],
  },
  {
    title: "Visa on Arrival (VoA)",
    subtitle: "30 Days",
    color: "blue" as const,
    points: [
      "Available for 90+ nationalities",
      "Cost: IDR 500,000 (~USD 35)",
      "Can be extended once for 30 days",
      "Valid for tourism and certain business activities",
    ],
  },
  {
    title: "e-VoA (Electronic)",
    subtitle: "30 Days",
    color: "blue" as const,
    points: [
      "Same benefits as regular VoA",
      "Skip the queue at immigration",
      "Process takes 1–3 business days",
      "Recommended for smoother arrival",
    ],
  },
  {
    title: "Social-Cultural (B211A)",
    subtitle: "60 Days",
    color: "purple" as const,
    points: [
      "Valid for 60 days upon entry",
      "Can be extended up to 4 times (30 days each)",
      "Total stay: up to 180 days",
      "Requires sponsorship letter",
    ],
  },
];

// ── Entry requirements ──

export const entryRequirements = [
  {
    label: "Passport validity",
    value: "Your passport must be valid for at least 6 months from your date of entry and have at least 2 blank pages for stamps.",
  },
  {
    label: "Proof of onward travel",
    value: "You must show proof of onward or return travel (flight ticket) when entering Indonesia.",
  },
  {
    label: "Travel insurance",
    value: "While not mandatory, comprehensive travel insurance is highly recommended. Ensure it covers medical emergencies, evacuation, and activities like surfing or horse riding.",
  },
  {
    label: "Health requirements",
    value: "No mandatory vaccinations required for Indonesia. However, vaccinations for Hepatitis A, Typhoid, and Tetanus are recommended. Consider malaria prophylaxis if visiting remote areas during the rainy season.",
  },
];

// ── Customs regulations ──

export const customsRegulations = [
  { label: "Duty-free", value: "200 cigarettes or 25 cigars or 100g tobacco" },
  { label: "Alcohol", value: "Up to 1 liter" },
  { label: "Prohibited", value: "Drugs, firearms, pornography, certain medications" },
  { label: "Cash declaration", value: "Declare cash over USD 10,000" },
];

// ── Lookup function ──

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
      ...visaFreeContent,
      description: `Citizens of ${matched} can enter Indonesia visa-free for up to 30 days. You cannot extend your stay on a visa-free entry.`,
    });
  }

  if (includes(voaCountries, matched)) {
    visas.push({
      ...voaContent,
      description: `Available for citizens of ${matched} upon arrival at designated entry points. Issued online or at the designated ports of entry. This visa can be used for tourism, government duties, business meetings, purchase of goods, and transit.`,
    });
  }

  if (includes(callingVisaCountries, matched)) {
    visas.push({
      ...callingContent,
      description: `A calling visa is required for citizens of ${matched}. In order to obtain this visa type, one must find a local sponsor, either a company or a resident. The Indonesian government follows this policy to manage immigration demand from countries in vulnerable situations.`,
    });
  }

  // Single-entry visa for countries not in any of the above lists
  if (visas.length === 0) {
    visas.push({
      ...singleEntryContent,
      description: `Citizens of ${matched} require a single-entry visa to visit Indonesia. It's usually issued for up to 180 days and requires a visit to the embassy or a visa processing center.`,
    });
  }

  // Social-Cultural (B211A) — available to all
  visas.push({
    ...socialCulturalContent,
    description: `For longer stays, citizens of ${matched} can apply for the Social-Cultural Visa (B211A) through the Indonesian embassy or a visa agent before travel.`,
  });

  // Student and employment visas — always available
  visas.push({
    ...studentContent,
    description: `A study visa is one of the most commonly applied visa types in Indonesia. Citizens of ${matched} who wish to pursue education in Indonesia can apply for this visa.`,
  });

  visas.push({
    ...employmentContent,
    description: `Obtaining an employment visa in Indonesia is a multi-layered process. Citizens of ${matched} need to acquire RPTKA approval and sponsorship from their employer.`,
  });

  const plural = visas.length > 1 ? "options" : "option";
  return {
    country: matched,
    found: true,
    visas,
    message: `Citizens of ${matched} have ${visas.length} visa ${plural} for visiting Indonesia.`
  };
}
