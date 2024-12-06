/* eslint-disable */
// @ts-nocheck
import React, { useEffect } from "react";
import f3 from "family-chart";
import "family-chart/styles/family-chart.css";
import csv from "../assets/family-members.csv";
import { transformCsvToD3Data } from "../utils/transformations.js";

const FamilyTree = () => {
  useEffect(() => {
    if (document.querySelector("#FamilyChart svg")) {
      return;
    }

    const store = f3.createStore({
      data: transformCsvToD3Data(csv),
      node_separation: 250,
      level_separation: 150,
    });
    const svg = f3.createSvg(document.querySelector("#FamilyChart"));
    const Card = f3.elements.Card({
      store,
      svg,
      card_dim: {
        w: 220,
        h: 70,
        text_x: 75,
        text_y: 15,
        img_w: 60,
        img_h: 60,
        img_x: 5,
        img_y: 5,
      },
      card_display: [
        (i) => `${i.data["first name"] || ""} ${i.data["last name"] || ""}`,
        (i) => `${i.data.birthday || ""}`,
      ],
      mini_tree: true,
      link_break: false,
    });
    store.setOnUpdate((props) =>
      f3.view(store.getTree(), svg, Card, props || {})
    );
    store.updateTree({ initial: true });
  }, []);

  return (
    <div
      className="f3"
      id="FamilyChart"
      style={{
        width: "100%",
        height: `${window.screen.height}px`,
        margin: "auto",
        backgroundColor: "rgb(33,33,33)",
        color: "#fff",
      }}
    />
  );
};

export default FamilyTree;
