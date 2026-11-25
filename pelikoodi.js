import { LeafletMap, TileLayer } from "leaflet";
const map = new LeafletMap("map").setView([0, 0], 2);
new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// start menu events
const alotusnäyttö = document.getElementById("alotusnäyttö");
alotusnäyttö.style.display = "";
const asetukset = document.getElementById("Asetukset");
asetukset.style.display = "none";
const vaikeustasomenu = document.getElementById("Vaikeustaso");
vaikeustasomenu.style.display = "none";
const kysymyksetblokki = document.getElementById("kysymykset");
kysymyksetblokki.style.display = "none";

document
  .querySelector("#alotusnäyttö #btn1")
  .addEventListener("mouseup", (e) => {
    //TODO: siirtyä peliin koodi
  });
document
  .querySelector("#alotusnäyttö #btn2")
  .addEventListener("mouseup", (e) => {
    //siirtyä vaikeustasomenuun
    alotusnäyttö.style.display = "none";
    asetukset.style.display = "none";
    vaikeustasomenu.style.display = "";
  });
document
  .querySelector("#alotusnäyttö #btn3")
  .addEventListener("mouseup", (e) => {
    //siirtyä asetuksiin
    alotusnäyttö.style.display = "none";
    asetukset.style.display = "";
    vaikeustasomenu.style.display = "none";
  });