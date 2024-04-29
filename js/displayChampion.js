import { LOADING_URL, PASSIVE_URL, ABILITY_URL } from "./utils.js";
import { transformImage } from "./transformImage.js";
import { updateFavouriteChampion } from "./updateFavouriteChampion.js";

const championsGrid = document.getElementById("championsGrid");

/**
 * Displays a champion card on the screen.
 *
 * @param {Object} champion A champion object exactly the same as when returned from the Data Dragon API
 * @returns {void}
 */
export function displayChampion(champion) {
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
  const DIFFICULTY_ARRAY =
    champion.info.difficulty <= 3
      ? ["opacity-25", "opacity-25"]
      : champion.info.difficulty <= 6
        ? ["", "opacity-25"]
        : ["", ""];
  const PASSIVE_PATH = champion.passive.image.full;
  const Q_PATH = champion.spells[0].image.full;
  const W_PATH = champion.spells[1].image.full;
  const E_PATH = champion.spells[2].image.full;
  const R_PATH = champion.spells[3].image.full;
  const ALL_PATHS = [
    `${LOADING_URL}${champion.id}_0.jpg`,
    `${PASSIVE_URL}${PASSIVE_PATH}`,
    `${ABILITY_URL}${Q_PATH}`,
    `${ABILITY_URL}${W_PATH}`,
    `${ABILITY_URL}${E_PATH}`,
    `${ABILITY_URL}${R_PATH}`,
  ];

  /**************/
  /* CLOUDINARY */
  /**************/
  const LOADING_TRANSFORMATIONS = "w_240,h_436,c_auto,f_webp";
  const ABILITY_TRANSFORMATIONS = "w_40,h_40,c_auto,f_webp";
  const IMAGE_URLS = [
    transformImage(LOADING_TRANSFORMATIONS, ALL_PATHS[0]),
    transformImage(ABILITY_TRANSFORMATIONS, ALL_PATHS[1]),
    transformImage(ABILITY_TRANSFORMATIONS, ALL_PATHS[2]),
    transformImage(ABILITY_TRANSFORMATIONS, ALL_PATHS[3]),
    transformImage(ABILITY_TRANSFORMATIONS, ALL_PATHS[4]),
    transformImage(ABILITY_TRANSFORMATIONS, ALL_PATHS[5]),
  ];

  /***********************/
  /* ADDING CARD TO HTML */
  /***********************/
  const div = document.createElement("div");
  div.classList.add(
    "w-[272px]",
    "bg-custom-blue-1",
    "text-white",
    "text-center",
    "relative",
    "pb-2",
    "transition-all",
    "group",
    "duration-200",
    "animate-fade",
    "mx-auto",
    "before:absolute",
    "before:w-[28px]",
    "before:h-[28px]",
    "before:bg-white",
    "before:-top-[14px]",
    "before:-right-[14px]",
    "before:rotate-[45deg]",
    "before:hover:translate-x-3",
    "before:hover:-translate-y-3",
    "before:transition-all",
    "before:duration-500",
  );
  div.innerHTML = `
    <div class="relative m-auto mb-1 mt-4 w-60">
      <div class="relative overflow-hidden">
        <img
          src="./img/loading.svg"
          width="40"
          height="40"
          class="absolute left-[100px] top-[198px] animate-spin"
          alt="Loading svg"
        />
        <div class="relative">
          <div
            class="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-60"
          >
            <img
              src="./img/star.svg"
              width="64"
              height="64"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              alt="Favourite star"
            />
          </div>
          <img
            src="${IMAGE_URLS[0]}"
            width="240"
            height="436"
            class="-z-10 scale-105 transition-all duration-300 group-hover:scale-[115%]"
            alt="${champion.name} loading screen art"
            fetchpriority="high"
          />
        </div>
      </div>
      <div class="absolute bottom-0 z-10 h-20 w-60 bg-black bg-opacity-50"></div>
      <div class="text-custom-gold-1">
        <h2
          class="absolute bottom-10 z-20 w-60 font-custom-title text-2xl font-semibold uppercase italic"
        >
          ${champion.name}
        </h2>
        <p
          class="absolute bottom-3 z-20 w-60 font-custom-title text-xs uppercase italic"
        >
          ${champion.title}
        </p>
      </div>
    </div>
    <div class="px-5 pb-2 text-xs uppercase tracking-wider">
      <div class="flex justify-between px-1 pb-3 pt-4 font-custom-title">
        <div
          class="group relative transition-all duration-300 before:absolute before:left-0 before:h-full before:w-full before:leading-[36px] before:opacity-15 before:transition-all before:duration-300 before:content-['P'] after:absolute after:left-0 after:top-0 after:h-[36px] after:w-[36px] after:scale-[112%] after:border-[1px] after:border-white hover:-translate-y-1 before:hover:opacity-100"
        >
          <img
            src="${IMAGE_URLS[1]}"
            loading="lazy"
            width="40"
            height="40"
            alt="${champion.name} passive"
            class="w-9"
            fetchpriority="low"
          />
        </div>
        <div
          class="group relative transition-all duration-300 before:absolute before:left-0 before:h-full before:w-full before:leading-[36px] before:opacity-15 before:transition-all before:duration-300 before:content-['Q'] after:absolute after:left-0 after:top-0 after:h-[36px] after:w-[36px] after:scale-[112%] after:border-[1px] after:border-white hover:-translate-y-1 before:hover:opacity-100"
        >
          <img
            src="${IMAGE_URLS[2]}"
            loading="lazy"
            width="40"
            height="40"
            alt="${champion.name} Q"
            class="w-9"
            fetchpriority="low"
          />
        </div>
        <div
          class="group relative transition-all duration-300 before:absolute before:left-0 before:h-full before:w-full before:leading-[36px] before:opacity-15 before:transition-all before:duration-300 before:content-['W'] after:absolute after:left-0 after:top-0 after:h-[36px] after:w-[36px] after:scale-[112%] after:border-[1px] after:border-white hover:-translate-y-1 before:hover:opacity-100"
        >
          <img
            src="${IMAGE_URLS[3]}"
            loading="lazy"
            width="40"
            height="40"
            alt="${champion.name} W"
            class="w-9"
            fetchpriority="low"
          />
        </div>
        <div
          class="group relative transition-all duration-300 before:absolute before:left-0 before:h-full before:w-full before:leading-[36px] before:opacity-15 before:transition-all before:duration-300 before:content-['E'] after:absolute after:left-0 after:top-0 after:h-[36px] after:w-[36px] after:scale-[112%] after:border-[1px] after:border-white hover:-translate-y-1 before:hover:opacity-100"
        >
          <img
            src="${IMAGE_URLS[4]}"
            loading="lazy"
            width="40"
            height="40"
            alt="${champion.name} E"
            class="w-9"
            fetchpriority="low"
          />
        </div>
        <div
          class="group relative transition-all duration-300 before:absolute before:left-0 before:h-full before:w-full before:leading-[36px] before:opacity-15 before:transition-all before:duration-300 before:content-['R'] after:absolute after:left-0 after:top-0 after:h-[36px] after:w-[36px] after:scale-[112%] after:border-[1px] after:border-white hover:-translate-y-1 before:hover:opacity-100"
        >
          <img
            src="${IMAGE_URLS[5]}"
            loading="lazy"
            width="40"
            height="40"
            alt="${champion.name} R"
            class="w-9"
            fetchpriority="low"
          />
        </div>
      </div>
      <p>Habilidades</p>
    </div>
    <div class="flex justify-between gap-4 p-2 text-xs uppercase tracking-wider">
      <div class="w-1/2">
        <img
          src="./img/${TAG}.webp"
          alt="${SPANISH_TAG} icon"
          width="32"
          height="32"
          class="mx-auto mb-1 w-8"
        />
        <p>${SPANISH_TAG}</p>
      </div>
      <div class="w-1/2">
        <div class="mx-auto mb-1 flex h-8 w-16 gap-1">
          <div class="my-auto h-3 w-5 -skew-x-[40deg] bg-custom-blue-2"></div>
          <div
            class="${DIFFICULTY_ARRAY[0]} my-auto h-3 w-5 -skew-x-[40deg] bg-custom-blue-2"
          ></div>
          <div
            class="${DIFFICULTY_ARRAY[1]} my-auto h-3 w-5 -skew-x-[40deg] bg-custom-blue-2"
          ></div>
        </div>
        <p>Dificultad</p>
      </div>
    </div>
    `;
  div.addEventListener("click", () => updateFavouriteChampion(champion));
  championsGrid.appendChild(div);
}
