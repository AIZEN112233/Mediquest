//export const BASE_URL = process.env.NODE_ENV === 'develeopment' ? 'http://localhost:5000' : '';
export const BASE_URL = ""; // If using proxy
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const COLLECTIONS_URL = "/api/collections";
export const DOCS_URL = "/api/documents";
export const PAYPAL_URL = "/api/config/paypal";
export const UPLOADS_URL = "/api/upload";
export const years = ["all", 1, 2, 3, 4, 5, 6, 7];
export const faculties = [
  "all",
  "oran",
  "mostaganem",
  "alger",
  "blida",
  "siding bel abbes",
  "constantine",
  "tlemcen",
  "annaba",
  "batna",
  "Tizi ouzou",
];

export const firstYearFirstHalfModules = [
  "all",
  "anatomy",
  "cytologie",
  "biophysique",
  "biochimie",
  "biostat",
  "chimie generale",
  "chimie organique",
  "ssh",
  "embryologie",
];
export const firstYearSecondHalfModules = [
  "all",
  "anatomy",
  "cytologie",
  "biophysique",
  "biochimie",
  "biostat",
  "chimie generale",
  "chimie organique",
  "histologie",
  "physiologie",
];

export const SecondYear = [
  {
    unite: "cardio-respiratoire",
    module: ["anatomy", "histologie", "physiologie", "biophysique"],
  },
  {
    unite: "digestif",
    module: ["anatomy", "histologie", "physiologie", "biochimie"],
  },
  {
    unite: "urinaire",
    module: ["anatomy", "histologie", "physiologie", "biochimie"],
  },
  {
    unite: "endocrine",
    module: ["anatomy", "histologie", "physiologie", "biochimie"],
  },
  {
    unite: "nerveux",
    module: ["anatomy", "histologie", "physiologie", "biochimie"],
  },
];
export const ThirdYear = [
  {
    unite: "appareil cardiovasculaire et respiratoire",
    module: [
      "biochimie",
      "radiologie",
      "psychologie",
      "sémiologie",
      "physiopathologie",
    ],
  },
  {
    unite: "appareil neurologique, locomoteur et cutané",
    module: ["biochimie", "radiologie", "sémiologie", "physiopathologie"],
  },
  {
    unite: "appareil endocrinien, genital et urinaire",
    module: ["biochimie", "radiologie", "sémiologie", "physiopathologie"],
  },
  {
    unite: "appareil digestif et organes hématopoïétiques",
    module: ["biochimie", "radiologie", "sémiologie", "physiopathologie"],
  },
];
