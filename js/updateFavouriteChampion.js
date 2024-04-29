import { transformImage } from "./transformImage.js";
import { SPLASH_URL } from "./utils.js";

export function updateFavouriteChampion(champion) {
  document.getElementById("splashPlaceholder").classList.add("hidden");
  document.getElementById("splashPlaceholder").ariaHidden = true;

  const SPLASH1_TRANSFORMATIONS = "w_300,h_177,c_auto,f_webp";
  document.getElementById("favouriteSplash1").srcset = transformImage(
    SPLASH1_TRANSFORMATIONS,
    `${SPLASH_URL}${champion.id}_0.jpg`,
  );

  const SPLASH2_TRANSFORMATIONS = "w_500,h_295,c_auto,f_webp";
  document.getElementById("favouriteSplash2").srcset = transformImage(
    SPLASH2_TRANSFORMATIONS,
    `${SPLASH_URL}${champion.id}_0.jpg`,
  );

  document.getElementById("favouriteSplash3").classList.remove("hidden");
  const SPLASH3_TRANSFORMATIONS = "w_750,h_442,c_auto,f_webp";
  document.getElementById("favouriteSplash3").src = transformImage(
    SPLASH3_TRANSFORMATIONS,
    `${SPLASH_URL}${champion.id}_0.jpg`,
  );
  document.getElementById("favouriteSplash3").alt =
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

  if (champion.lore.length > 300) {
    const loreTruncado = champion.lore.slice(0, 300) + "...";
    document.getElementById("favouriteLore").innerHTML =
      `${loreTruncado} <button type="button" class="pl-[4px] text-xs uppercase text-custom-gold-3" id="favouriteMoreLore">Saber más</button>`;

    document
      .getElementById("favouriteMoreLore")
      .addEventListener("click", () => {
        document.getElementById("favouriteLore").innerHTML = champion.lore;
      });
  } else {
    document.getElementById("favouriteLore").innerHTML = champion.lore;
  }

  document
    .getElementById("favouriteChampionSection")
    .scrollIntoView({ behavior: "smooth" });
  localStorage.setItem("favouriteChampion", JSON.stringify(champion));
}
