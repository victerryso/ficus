/* eslint-disable */
// @ts-nocheck
import { useEffect } from "react";
import "../lib/d3.min.js";
import "../lib/family-tree.min.js";
import "../lib/family-tree.css";
import csv from "../assets/family-members.csv";
import { transformCsvToD3Data } from "../lib/transformations.js";

const create = (data) => {
  if (document.querySelector("#FamilyChart svg")) {
    return;
  }

  const cont = document.querySelector("#FamilyChart");

  const store = f3.createStore({
    data,
    node_separation: 250,
    level_separation: 150,
  });
  const svg = f3.createSvg(cont);
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
    card_display: [(d) => `${d.data["first name"]} ${d.data["last name"]}`],
    mini_tree: true,
    link_break: false,
  });

  store.setOnUpdate((props) =>
    f3.view(store.getTree(), svg, Card, props || {})
  );
  store.updateTree({ initial: true });
};

const FamilyTree = () => {
  useEffect(() => {
    const d3Data = transformCsvToD3Data(csv);
    create(d3Data);
  }, []);

  return (
    <div
      id="FamilyChart"
      className="f3"
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
