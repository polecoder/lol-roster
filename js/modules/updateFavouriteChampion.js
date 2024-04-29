import { transformImage } from "./transformImage.js";
import { SPLASH_URL } from "./utils.js";
import { updateNotification } from "./updateNotification.js";

/**
 * Updates the user's favourite champion when clicking on a champion's card
 *
 * @param {Object} champion A champion object exactly the same as when returned from the Data Dragon API
 * @returns {void}
 */
export function updateFavouriteChampion(champion) {
  document.getElementById("splashPlaceholder").classList.add("hidden");
  document.getElementById("splashPlaceholder").ariaHidden = true;

  // SPLASH 1 - AVIF IMAGES
  const SPLASH1_AVIF_TRANSFORMATIONS_1x = "w_300,h_177,c_auto,f_avif";
  const SPLASH1_AVIF_TRANSFORMATIONS_2x = "w_600,h_354,c_auto,f_avif";
  const SPLASH1_AVIF_TRANSFORMATIONS_3x = "w_900,h_531,c_auto,f_avif";
  document.getElementById("avifFavouriteSplash1").srcset =
    transformImage(
      SPLASH1_AVIF_TRANSFORMATIONS_1x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 1x, " +
    transformImage(
      SPLASH1_AVIF_TRANSFORMATIONS_2x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 2x, " +
    transformImage(
      SPLASH1_AVIF_TRANSFORMATIONS_3x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 3x";

  // SPLASH 1 - WEBP IMAGES
  const SPLASH1_WEBP_TRANSFORMATIONS_1x = "w_300,h_177,c_auto,f_webp";
  const SPLASH1_WEBP_TRANSFORMATIONS_2x = "w_600,h_354,c_auto,f_webp";
  const SPLASH1_WEBP_TRANSFORMATIONS_3x = "w_900,h_531,c_auto,f_webp";
  document.getElementById("webpFavouriteSplash1").srcset =
    transformImage(
      SPLASH1_WEBP_TRANSFORMATIONS_1x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 1x, " +
    transformImage(
      SPLASH1_WEBP_TRANSFORMATIONS_2x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 2x, " +
    transformImage(
      SPLASH1_WEBP_TRANSFORMATIONS_3x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 3x";

  // SPLASH 2 - AVIF IMAGES
  const SPLASH2_AVIF_TRANSFORMATIONS_1x = "w_500,h_295,c_auto,f_avif";
  const SPLASH2_AVIF_TRANSFORMATIONS_2x = "w_1000,h_590,c_auto,f_avif";
  const SPLASH2_AVIF_TRANSFORMATIONS_3x = "w_1500,h_885,c_auto,f_avif";
  document.getElementById("avifFavouriteSplash2").srcset =
    transformImage(
      SPLASH2_AVIF_TRANSFORMATIONS_1x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 1x, " +
    transformImage(
      SPLASH2_AVIF_TRANSFORMATIONS_2x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 2x, " +
    transformImage(
      SPLASH2_AVIF_TRANSFORMATIONS_3x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 3x";

  // SPLASH 2 - WEBP IMAGES
  const SPLASH2_WEBP_TRANSFORMATIONS_1x = "w_500,h_295,c_auto,f_webp";
  const SPLASH2_WEBP_TRANSFORMATIONS_2x = "w_1000,h_590,c_auto,f_webp";
  const SPLASH2_WEBP_TRANSFORMATIONS_3x = "w_1500,h_885,c_auto,f_webp";
  document.getElementById("webpFavouriteSplash2").srcset =
    transformImage(
      SPLASH2_WEBP_TRANSFORMATIONS_1x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 1x, " +
    transformImage(
      SPLASH2_WEBP_TRANSFORMATIONS_2x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 2x, " +
    transformImage(
      SPLASH2_WEBP_TRANSFORMATIONS_3x,
      `${SPLASH_URL}${champion.id}_0.jpg`,
    ) +
    " 3x";

  // SPLASH 3 - AVIF IMAGES
  const SPLASH3_AVIF_TRANSFORMATIONS = "w_750,h_442,c_auto,f_avif";
  document.getElementById("webpFavouriteSplash3").src = transformImage(
    SPLASH3_AVIF_TRANSFORMATIONS,
    `${SPLASH_URL}${champion.id}_0.jpg`,
  );

  // SPLASH 3 - WEBP IMAGES
  document.getElementById("webpFavouriteSplash3").classList.remove("hidden");
  const SPLASH3_WEBP_TRANSFORMATIONS = "w_750,h_442,c_auto,f_webp";
  document.getElementById("webpFavouriteSplash3").src = transformImage(
    SPLASH3_WEBP_TRANSFORMATIONS,
    `${SPLASH_URL}${champion.id}_0.jpg`,
  );
  document.getElementById("webpFavouriteSplash3").alt =
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

  updateNotification(champion);
}
