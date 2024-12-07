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

  console.log({
    d3Data: d3Data.filter((node) => {
      const hasId = node.id;
      const hasFather = node.rels.father;
      const hasMother = node.rels.father;
      const hasSpouse = node.rels.spouses.length > 0;
      const hasChildren = node.rels.children.length > 0;
      const hasSameMotherAndFather = node.rels.father === node.rels.mother;

      return (
        (hasId || hasFather || hasMother || hasSpouse || hasChildren) &&
        !hasSameMotherAndFather
      );
    }),
  });

  return d3Data
    .filter((node) => {
      const hasId = node.id;
      const hasFather = node.rels.father;
      const hasMother = node.rels.father;
      const hasSpouse = node.rels.spouses.length > 0;
      const hasChildren = node.rels.children.length > 0;

      return hasId || hasFather || hasMother || hasSpouse || hasChildren;
    })
    .map((node, index, nodes) => {
      if (node.id === "7") {
        return nodes[0];
      }

      if (index === 0) {
        return nodes.find((n) => n.id === "7");
      }

      return node;
    });
};
