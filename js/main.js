const PATCH_VERSION = "14.4.1";

const CHAMPION_URL = `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/data/es_AR/champion`;
const SPLASH_URL = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/`;
const PASSIVE_URL = `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/passive/`;
const ABILITY_URL = `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/spell/`;

const CHAMPIONS_PER_PAGE = 12;
/* 
IMPORTANTE! Los IDs de los campeones deben estar en orden alfabético.
Por más parecidos que parezcan a los nombres de los campeones, estos NO son iguales. Por ejemplo:

Aurelion Sol !== AurelionSol
Bel'veth !== Belveth
Wukong !== MonkeyKing

Utilizar los IDs en vez de los nombres, es NECESARIO para que el fetch de los campeones funcione correctamente.
Estos IDs fueron extraídos desde la URL: `https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/champion.json`
*/
const CHAMPION_IDS = [
  "Aatrox",
  "Ahri",
  "Akali",
  "Akshan",
  "Alistar",
  "Amumu",
  "Anivia",
  "Annie",
  "Aphelios",
  "Ashe",
  "AurelionSol",
  "Azir",
  "Bard",
  "Belveth",
  "Blitzcrank",
  "Brand",
  "Braum",
  "Briar",
  "Caitlyn",
  "Camille",
  "Cassiopeia",
  "Chogath",
  "Corki",
  "Darius",
  "Diana",
  "DrMundo",
  "Draven",
  "Ekko",
  "Elise",
  "Evelynn",
  "Ezreal",
  "Fiddlesticks",
  "Fiora",
  "Fizz",
  "Galio",
  "Gangplank",
  "Garen",
  "Gnar",
  "Gragas",
  "Graves",
  "Gwen",
  "Hecarim",
  "Heimerdinger",
  "Hwei",
  "Illaoi",
  "Irelia",
  "Ivern",
  "Janna",
  "JarvanIV",
  "Jax",
  "Jayce",
  "Jhin",
  "Jinx",
  "KSante",
  "Kaisa",
  "Kalista",
  "Karma",
  "Karthus",
  "Kassadin",
  "Katarina",
  "Kayle",
  "Kayn",
  "Kennen",
  "Khazix",
  "Kindred",
  "Kled",
  "KogMaw",
  "Leblanc",
  "LeeSin",
  "Leona",
  "Lillia",
  "Lissandra",
  "Lucian",
  "Lulu",
  "Lux",
  "Malphite",
  "Malzahar",
  "Maokai",
  "MasterYi",
  "Milio",
  "MissFortune",
  "MonkeyKing",
  "Mordekaiser",
  "Morgana",
  "Naafiri",
  "Nami",
  "Nasus",
  "Nautilus",
  "Neeko",
  "Nidalee",
  "Nilah",
  "Nocturne",
  "Nunu",
  "Olaf",
  "Orianna",
  "Ornn",
  "Pantheon",
  "Poppy",
  "Pyke",
  "Qiyana",
  "Quinn",
  "Rakan",
  "Rammus",
  "RekSai",
  "Rell",
  "Renata",
  "Renekton",
  "Rengar",
  "Riven",
  "Rumble",
  "Ryze",
  "Samira",
  "Sejuani",
  "Senna",
  "Seraphine",
  "Sett",
  "Shaco",
  "Shen",
  "Shyvana",
  "Singed",
  "Sion",
  "Sivir",
  "Skarner",
  "Smolder",
  "Sona",
  "Soraka",
  "Swain",
  "Sylas",
  "Syndra",
  "TahmKench",
  "Taliyah",
  "Talon",
  "Taric",
  "Teemo",
  "Thresh",
  "Tristana",
  "Trundle",
  "Tryndamere",
  "TwistedFate",
  "Twitch",
  "Udyr",
  "Urgot",
  "Varus",
  "Vayne",
  "Veigar",
  "Velkoz",
  "Vex",
  "Vi",
  "Viego",
  "Viktor",
  "Vladimir",
  "Volibear",
  "Warwick",
  "Xayah",
  "Xerath",
  "XinZhao",
  "Yasuo",
  "Yone",
  "Yorick",
  "Yuumi",
  "Zac",
  "Zed",
  "Zeri",
  "Ziggs",
  "Zilean",
  "Zoe",
  "Zyra",
];

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
      console.log(fetchPromises);
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

const championsGrid = document.getElementById("championsGrid");
function displayChampion(champion) {
  /***************/
  /* DATA DRAGON */
  /***************/
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
    `${SPLASH_URL}${champion.id}_0.jpg`,
    `${PASSIVE_URL}${PASSIVE_PATH}`,
    `${ABILITY_URL}${Q_PATH}`,
    `${ABILITY_URL}${W_PATH}`,
    `${ABILITY_URL}${E_PATH}`,
    `${ABILITY_URL}${R_PATH}`,
  ];

  /**************/
  /* CLOUDINARY */
  /**************/
  const CLOUDINARY_URL = "https://res.cloudinary.com";
  const CLOUD_NAME = "dak46kbmg";
  const SPLASH_TRANSFORMATIONS = "w_240,h_436,c_auto,f_webp";
  const ABILITY_TRANSFORMATIONS = "w_40,h_40,c_auto,f_webp";
  const IMAGE_URLS = [
    `${CLOUDINARY_URL}/${CLOUD_NAME}/image/fetch/${SPLASH_TRANSFORMATIONS}/${ALL_PATHS[0]}`,
    `${CLOUDINARY_URL}/${CLOUD_NAME}/image/fetch/${ABILITY_TRANSFORMATIONS}/${ALL_PATHS[1]}`,
    `${CLOUDINARY_URL}/${CLOUD_NAME}/image/fetch/${ABILITY_TRANSFORMATIONS}/${ALL_PATHS[2]}`,
    `${CLOUDINARY_URL}/${CLOUD_NAME}/image/fetch/${ABILITY_TRANSFORMATIONS}/${ALL_PATHS[3]}`,
    `${CLOUDINARY_URL}/${CLOUD_NAME}/image/fetch/${ABILITY_TRANSFORMATIONS}/${ALL_PATHS[4]}`,
    `${CLOUDINARY_URL}/${CLOUD_NAME}/image/fetch/${ABILITY_TRANSFORMATIONS}/${ALL_PATHS[5]}`,
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
        <img
          src="${IMAGE_URLS[0]}"
          width="240"
          height="436"
          class="-z-10 scale-105 transition-all duration-300 group-hover:scale-[115%]"
          alt="${champion.name} splash art"
          fetchpriority="high"
        />
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
  championsGrid.appendChild(div);
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
