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
const valitsealoituslentokenttä = document.getElementById(
  "valitsealoituslentokenttä",
);
valitsealoituslentokenttä.style.display = "none";

async function alotuskenttä() {
  try {
    const kentät = document.getElementById("kentät");
    kentät.innerHTML = "Ladataan.";
    const starter = await fetch("http://localhost:3000/starter").then((r) =>
      r.json(),
    );
    const airports = [];
    for await (let i of starter) {
      const data = await fetch("http://localhost:3000/airport/" + i).then((r) =>
        r.json(),
      );
      airports.push(data);
    }

    kentät.innerHTML = "";
    for (let i of airports) {
      const div = document.createElement("div");
      div.classList.add("clickable");
      div.addEventListener("click", () => aloitapeli(i));
      const h2 = document.createElement("h2");
      h2.textContent = i.name;

      div.appendChild(h2);
      kentät.appendChild(div);
    }
  } catch (e) {
    console.error(e);
    alert(e);
  }
}
let starterairport;
function aloitapeli(airport) {
  alotusnäyttö.style.display = "none";
  asetukset.style.display = "none";
  vaikeustasomenu.style.display = "none";
  valitsealoituslentokenttä.style.display = "none";
  console.log(airport);
  starterairport = airport;
}
document
  .querySelector("#alotusnäyttö #btn1")
  .addEventListener("mouseup", (e) => {
    //TODO: siirtyä peliin koodi
    alotusnäyttö.style.display = "none";
    asetukset.style.display = "none";
    vaikeustasomenu.style.display = "none";
    valitsealoituslentokenttä.style.display = "";
    alotuskenttä();
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