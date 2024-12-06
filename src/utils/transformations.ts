type Row = {
  ID: string;
  "First name": string;
  "Last name": string;
  Birthday: string;
  Gender: string;
  Avatar: string;
  "Father ID": string;
  "Mother ID": string;
  "Spouse ID": string;
};

export const transformCsvToD3Data = (csvData: Row[]) => {
  // return [
  //   {
  //     id: "11",
  //     rels: {
  //       spouses: ["12"],
  //       children: ["13", "14"],
  //     },
  //     data: {
  //       "first name": "Monico",
  //       "last name": "TAING-OU",
  //       birthday: "11/12/1971",
  //       avatar: "",
  //       gender: "F",
  //     },
  //   },
  //   {
  //     id: "12",
  //     rels: {
  //       spouses: ["11"],
  //       children: ["13", "14"],
  //     },
  //     data: {
  //       "first name": "Linnaro",
  //       "last name": "HAK",
  //       birthday: "29/05/1964",
  //       avatar: "",
  //       gender: "M",
  //     },
  //   },
  //   {
  //     id: "13",
  //     rels: {
  //       spouses: [],
  //       father: "12",
  //       mother: "11",
  //       children: [],
  //     },
  //     data: {
  //       "first name": "Malina",
  //       "last name": "HAK",
  //       birthday: "11/12/2000",
  //       avatar: "",
  //       gender: "F",
  //     },
  //   },
  //   {
  //     id: "14",
  //     rels: {
  //       spouses: [],
  //       father: "12",
  //       mother: "11",
  //       children: [],
  //     },
  //     data: {
  //       "first name": "Dominic",
  //       "last name": "HAK",
  //       birthday: "12/01/2004",
  //       avatar: "",
  //       gender: "M",
  //     },
  //   },
  // ];
  // return [
  //   {
  //     id: "7",
  //     rels: {
  //       spouses: ["8"],
  //       father: null,
  //       mother: null,
  //       children: ["9"],
  //     },
  //     data: {
  //       "first name": "Simmith",
  //       "last name": "OU",
  //       birthday: "",
  //       avatar: null,
  //     },
  //   },
  //   {
  //     id: "8",
  //     rels: {
  //       spouses: ["7"],
  //       father: null,
  //       mother: null,
  //       children: ["9"],
  //     },
  //     data: {
  //       "first name": "Hok Chiv",
  //       "last name": "LIM",
  //       birthday: "",
  //       avatar: null,
  //     },
  //   },
  //   {
  //     id: "9",
  //     rels: {
  //       spouses: [],
  //       father: "8",
  //       mother: "7",
  //       children: [],
  //     },
  //     data: {
  //       "first name": "Nary",
  //       "last name": "LIM",
  //       birthday: "20/04/1954",
  //       avatar: null,
  //     },
  //   },
  // ];

  const d3Data = csvData.map((row) => {
    const id = row.ID;
    const fatherId = row["Father ID"];
    const motherId = row["Mother ID"];

    const rels = {
      spouses: csvData
        .filter((row) => row["Father ID"] === id || row["Mother ID"] === id)
        .map((row) =>
          row["Mother ID"] === id ? row["Father ID"] : row["Mother ID"]
        )
        .concat(row["Spouse ID"])
        .filter((id, index, self) => id && self.indexOf(id) === index),
      father: csvData.some((row) => row.ID === fatherId) ? fatherId : null,
      mother: csvData.some((row) => row.ID === motherId) ? motherId : null,
      children: csvData
        .filter((row) => row["Father ID"] === id || row["Mother ID"] === id)
        .map((row) => row.ID),
    };

    const data = {
      "first name": row["First name"],
      "last name": row["Last name"],
      avatar: null,
      gender: row["Gender"],
    };

    return {
      id,
      rels,
      data,
    };
  });

  console.log(d3Data);

  return d3Data;
};
