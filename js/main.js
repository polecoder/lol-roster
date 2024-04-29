import { CHAMPION_URL } from "./modules/utils.js";
import { CHAMPION_IDS } from "./modules/championIDs.js";
import { displayChampion } from "./modules/displayChampion.js";
import { updateFavouriteChampion } from "./modules/updateFavouriteChampion.js";

const CHAMPIONS_PER_PAGE = 12;

let allChampions = [];
let allAssassins = [];
let allFighters = [];
let allMages = [];
let allMarksmans = [];
let allSupports = [];
let allTanks = [];
let indiceActual = 0;

async function fetchAndDisplayChampions() {
  if (allChampions.length === 0) {
    // Convierto el array de IDs en un array de promesas que se resuelven con el fetch de cada campeón
    const storedChampionsData = localStorage.getItem("championsData");
    let fetchPromises;
    if (storedChampionsData) {
      const results = JSON.parse(storedChampionsData);
      allChampions.push(...results);
    } else {
      fetchPromises = CHAMPION_IDS.map((championID) => {
        return fetch(`${CHAMPION_URL}/${championID}.json`)
          .then((response) => response.json())
          .then((data) => data.data[championID]);
      });
    }

    try {
      if (fetchPromises) {
        // Espero a que todas las promesas se resuelvan, guardando los resultados (results[i] será el fetch de un campeón) en un array
        const results = await Promise.all(fetchPromises);
        // Guardo todos los valores de los fetch en un array usando el operador "spread", además los guardo en el localStorage
        allChampions.push(...results);
        localStorage.setItem("championsData", JSON.stringify(allChampions));
      }

      // Guardo los campeones en un array para cada rol, en este punto allChampions siempre está lleno, ya sea con localStorage o un fetch
      allAssassins = allChampions.filter(
        (champion) => champion.tags[0] == "Assassin",
      );
      allFighters = allChampions.filter(
        (champion) => champion.tags[0] == "Fighter",
      );
      allMages = allChampions.filter((champion) => champion.tags[0] == "Mage");
      allMarksmans = allChampions.filter(
        (champion) => champion.tags[0] == "Marksman",
      );
      allSupports = allChampions.filter(
        (champion) => champion.tags[0] == "Support",
      );
      allTanks = allChampions.filter((champion) => champion.tags[0] == "Tank");

      // Carga los primeros campeones en la página
      for (let i = 0; i < CHAMPIONS_PER_PAGE; i++) {
        displayChampion(allChampions[indiceActual + i]);
      }
      indiceActual += CHAMPIONS_PER_PAGE;
    } catch (error) {
      console.error("Failed to fetch champions: ", error);
    }
  }
}

let championsParaCargar = allChampions;
const roleButtons = document.querySelectorAll(".role-btn");
roleButtons.forEach((button) =>
  button.addEventListener("click", () => {
    championsGrid.innerHTML = "";
    document.getElementById("loadMore").classList.remove("hidden");
    indiceActual = 0;
    const role = button.id;
    championsParaCargar =
      role === "assassin"
        ? allAssassins
        : role === "fighter"
          ? allFighters
          : role === "mage"
            ? allMages
            : role === "marksman"
              ? allMarksmans
              : role === "support"
                ? allSupports
                : role === "tank"
                  ? allTanks
                  : allChampions;
    for (let i = 0; i < CHAMPIONS_PER_PAGE; i++) {
      displayChampion(championsParaCargar[indiceActual + i]);
    }
    indiceActual += CHAMPIONS_PER_PAGE;
    // Sacar la clase 'role-active' de todos los botones y agregarla al botón clickeado
    roleButtons.forEach((button) => button.classList.remove("role-active"));
    button.classList.add("role-active");
  }),
);

// Cambiar el campeón favorito, si existe
const favouriteChampion = localStorage.getItem("favouriteChampion");
if (favouriteChampion) {
  updateFavouriteChampion(JSON.parse(favouriteChampion));
}

fetchAndDisplayChampions();
document.getElementById("loadMore").addEventListener("click", () => {
  for (
    let i = 0;
    indiceActual + i < championsParaCargar.length && i < CHAMPIONS_PER_PAGE;
    i++
  ) {
    displayChampion(championsParaCargar[indiceActual + i]);
  }
  indiceActual += CHAMPIONS_PER_PAGE;
  if (indiceActual >= championsParaCargar.length) {
    document.getElementById("loadMore").classList.add("hidden");
  }
});
