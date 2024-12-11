/* eslint-disable */
// @ts-nocheck
import React, { useEffect } from "react";
import f3 from "family-chart";
import "family-chart/styles/family-chart.css";
import csv from "../assets/family-members.csv";
import { transformCsvToD3Data } from "../utils/transformations.js";

const createFamilyTree = (data) => {
  const f3Chart = f3
    .createChart("#FamilyChart", data)
    .setTransitionTime(1000)
    .setCardXSpacing(250)
    .setCardYSpacing(150)
    .setOrientationVertical();

  const f3Card = f3Chart
    .setCard(f3.CardHtml)
    .setCardDisplay([["first name", "last name"]])
    .setCardDim({})
    .setMiniTree(true)
    .setStyle("imageCircle")
    .setOnHoverPathToMain();

  f3Card.setOnCardClick((e, d) => {
    f3Card.onCardClickDefault(e, d);
  });

  f3Chart.updateTree({ initial: true });
};

const FamilyTree = () => {
  useEffect(() => {
    if (document.querySelector("#FamilyChart svg")) {
      return;
    }

    const data = transformCsvToD3Data(csv);

    createFamilyTree(data);
  }, []);

  return (
    <div
      className="f3 f3-cont"
      id="FamilyChart"
      style={{ minHeight: "100vh" }}
    />
  );
};

export default FamilyTree;
