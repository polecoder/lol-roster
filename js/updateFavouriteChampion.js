import { transformImage } from "./transformImage.js";
import { SPLASH_URL } from "./utils.js";

export function updateFavouriteChampion(champion) {
  const SPLASH_TRANSFORMATIONS = "w_750,h_442,c_auto,f_webp";
  document.getElementById("favouriteSplash").src = transformImage(
    SPLASH_TRANSFORMATIONS,
    `${SPLASH_URL}${champion.id}_0.jpg`,
  );
  document.getElementById("favouriteSplash").alt =
    `${champion.name} splash art`;

  document.getElementById("favouriteTitle").textContent = champion.title;
  document.getElementById("favouriteName").textContent = champion.name;

  const TAG = champion.tags[0].toLowerCase();
  const SPANISH_TAG =
    TAG === "fighter"
      ? "Luchador"
      : TAG === "tank"
        ? "Tanque"
        : TAG === "mage"
          ? "Mago"
          : TAG === "assassin"
            ? "Asesino"
            : TAG === "support"
              ? "Soporte"
              : TAG === "marksman"
                ? "Tirador"
                : "Desconocido";
  document.getElementById("favouriteRole").src = `./img/${TAG}.webp`;
  document.getElementById("favouriteRole").alt = `${SPANISH_TAG} icon`;
  document.getElementById("favouriteRoleText").textContent = SPANISH_TAG;

  const difficultySlot2 = document.getElementById("favouriteDifficulty2");
  const difficultySlot3 = document.getElementById("favouriteDifficulty3");
  // default: caso con la dificultad máxima
  difficultySlot2.classList.remove("opacity-25");
  difficultySlot3.classList.remove("opacity-25");
  if (champion.info.difficulty <= 3) {
    difficultySlot2.classList.add("opacity-25");
    difficultySlot3.classList.add("opacity-25");
  } else if (champion.info.difficulty <= 6) {
    difficultySlot3.classList.add("opacity-25");
  }

  document.getElementById("favouriteLore").textContent = champion.lore;
}
