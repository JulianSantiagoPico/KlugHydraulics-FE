/**
 * Red de distribuidores. `position` son coordenadas en porcentaje sobre el SVG
 * del mapamundi, así que el punto acompaña al mapa al escalar.
 */
const distributors = [
  {
    id: "north-america",
    region: { es: "Norteamérica", en: "North America" },
    phone: "+52 1 55 2690 1662",
    person: "Ingepromac",
    email: "Info@ingepromac.com.mx",
    position: { top: "38.5%", left: "24.2%" },
  },
  {
    id: "south-america",
    region: { es: "Sudamérica", en: "South America" },
    phone: "(+57) 313 750 44 93",
    person: "Camilo Zapata",
    email: "Saleslatam@klughydraulics.com",
    position: { top: "69.5%", left: "34.5%" },
  },
  {
    id: "colombia",
    region: { es: "Colombia", en: "Colombia" },
    phone: "(+57) 317 641 76 66",
    person: "Bitac S.A.S",
    email: "grupobitac@bitac.com.co",
    position: { top: "56%", left: "31.5%" },
  },
  {
    id: "europe",
    region: { es: "Europa", en: "Europe" },
    phone: "+34 603 53 03 22",
    person: "Sara Al Jafari",
    email: "Europe@klughydraulics.com",
    position: { top: "23%", left: "47%" },
  },
  {
    id: "asia",
    region: { es: "Asia", en: "Asia" },
    phone: "(+86) 18138859780",
    person: "Customer Service",
    email: "info@klughydraulics.com",
    position: { top: "27%", left: "73.2%" },
  },
  {
    id: "oceania",
    region: { es: "Oceanía", en: "Oceania" },
    phone: "(+61) 029098 6961",
    person: "TITAN UP PTY LTD",
    position: { top: "78%", left: "78%" },
  },
];

/** Los distribuidores con `region` ya resuelta al idioma pedido. */
export function getDistributors(locale) {
  return distributors.map((distributor) => ({
    ...distributor,
    region: distributor.region[locale] ?? distributor.region.en,
  }));
}

export default distributors;
