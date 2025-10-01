type link = {
  id: number;
  label: string;
  href: string;
};

export const links: link[] = [
  {
    id: 1,
    label: "home",
    href: "/",
  },
  {
    id: 2,
    label: "contact",
    href: "/contact",
  },
  {
    id: 3,
    label: "about",
    href: "/about",
  },
  {
    id: 4,
    label: "register",
    href: "/register",
  },
  {
    id: 5,
    label: "login",
    href: "/login",
  },
];

export const Providers = ["MTN SME", "MTN SOCIAL", "MTN SME II"];

export const ElectricProvider = [
  "AEDC-Abuja Electric",
  "IKEDC-Ikeja Electric",
  "EKEDC-Eko Electric",
  "KEDCO-Kano Electric",
  "PHED-PortHarcourt Electric",
  "JED-Jos Electric",
  "IBEDC-Ibadan Electric",
  "KAEDCO-Kaduna Electric",
  "KEDC-Kano Electric",
  "EEDC-Enugu Electric",
  "BEDC-Benin Electric",
];

export const electricProvider: { provider: string; percent: number }[] = [
  {
    provider: "AEDC-Abuja Electric",
    percent: 0,
  },
  {
    provider: "IKEDC-Ikeja Electric",
    percent: 0.02,
  },
  {
    provider: "EKEDC-Eko Electric",
    percent: 0.03,
  },
  {
    provider: "KEDCO-Kano Electric",
    percent: 0.03,
  },
  {
    provider: "PHED-PortHarcourt Electric",
    percent: 0.03,
  },
  {
    provider: "JED-Jos Electric",
    percent: 0.03,
  },
  {
    provider: "IBEDC-Ibadan Electric",
    percent: 0.03,
  },
  {
    provider: "KAEDCO-Kaduna Electric",
    percent: 0.03,
  },
  {
    provider: "KEDC-Kano Electric",
    percent: 0.03,
  },
  {
    provider: "EEDC-Enugu Electric",
    percent: 0.03,
  },
  {
    provider: "BEDC-Benin Electric",
    percent: 0.03,
  },
];

// export const url = "https://api.biggiesubng.com";
export const url = "http://localhost:5000";
