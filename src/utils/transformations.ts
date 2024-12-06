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

  return d3Data;
};
