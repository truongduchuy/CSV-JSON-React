import * as CSV from "./csv";

const CsvString = `Name,Address,Company\nMarcus,"98547 Kuhndorf, Germany",Apple Inc.\nJohn,"Tropical-Islands-Allee 1, 15910 Krausnick, Germany",IKEA Furnitures\nDavid,"Am Rheinufer 2, 65366 Geisenheim, Germany",Nokia Communications`;

const dataJSON = [
  {
    Name: "Marcus",
    Address: "98547 Kuhndorf, Germany",
    Company: "Apple Inc.",
  },
  {
    Name: "John",
    Address: "Tropical-Islands-Allee 1, 15910 Krausnick, Germany",
    Company: "IKEA Furnitures",
  },
  {
    Name: "David",
    Address: "Am Rheinufer 2, 65366 Geisenheim, Germany",
    Company: "Nokia Communications",
  },
];

const dataJSON2 = [
  {
    Name: "Marcus",
    Address: "98547 Kuhndorf",
    Company: "Apple Inc.",
  },
  {
    Name: "John",
    Address: "Tropical-Islands-Allee 1",
    Company: "IKEA Furnitures",
  },
  {
    Name: "David",
    Address: "Am Rheinufer 2",
    Company: "Nokia Communications",
  },
];

const dataJSON3 = [
  {
    Name: "Marcus",
  },
  {
    Name: "John",
  },
  {
    Name: "David",
  },
];

it("parse CSV string to JSON", () => {
  expect(CSV.parse(CsvString)).toEqual(dataJSON);
});

it("convert JSON to CSV string", () => {
  expect(CSV.stringify(dataJSON)).toEqual(CsvString);
});

it("convert incorrect", () => {
  expect(CSV.parse(CsvString)).not.toEqual(dataJSON2);

  expect(CSV.stringify(dataJSON3)).not.toEqual(CsvString);
});
