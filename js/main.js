const PATCH_VERSION = '14.4.1';

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
  'Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios', 'Ashe', 
  'AurelionSol', 'Azir', 'Bard', 'Belveth', 'Blitzcrank', 'Brand', 'Braum', 'Briar', 'Caitlyn', 
  'Camille', 'Cassiopeia', 'Chogath', 'Corki', 'Darius', 'Diana', 'DrMundo', 'Draven', 'Ekko', 
  'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 
  'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Hwei', 'Illaoi', 'Irelia', 
  'Ivern', 'Janna', 'JarvanIV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'KSante', 'Kaisa', 'Kalista', 
  'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Khazix', 'Kindred', 
  'Kled', 'KogMaw', 'Leblanc', 'LeeSin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 
  'Malphite', 'Malzahar', 'Maokai', 'MasterYi', 'Milio', 'MissFortune', 'MonkeyKing', 'Mordekaiser', 
  'Morgana', 'Naafiri', 'Nami', 'Nasus', 'Nautilus', 'Neeko', 'Nidalee', 'Nilah', 'Nocturne', 
  'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Qiyana', 'Quinn', 'Rakan', 
  'Rammus', 'RekSai', 'Rell', 'Renata', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze', 'Samira', 
  'Sejuani', 'Senna', 'Seraphine', 'Sett', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 
  'Skarner', 'Smolder', 'Sona', 'Soraka', 'Swain', 'Sylas', 'Syndra', 'TahmKench', 'Taliyah', 'Talon', 
  'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'TwistedFate', 'Twitch', 'Udyr', 
  'Urgot', 'Varus', 'Vayne', 'Veigar', 'Velkoz', 'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 
  'Warwick', 'Xayah', 'Xerath', 'XinZhao', 'Yasuo', 'Yone', 'Yorick', 'Yuumi', 'Zac', 'Zed', 'Zeri', 
  'Ziggs', 'Zilean', 'Zoe', 'Zyra'
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
    const fetchPromises = CHAMPION_IDS.map(championID => {
      return fetch(`${CHAMPION_URL}/${championID}.json`)
        .then(response => response.json())
        .then(data => data.data[championID]);
    });

    try {
      // Espero a que todas las promesas se resuelvan, guardando los resultados (results[i] será el fetch de un campeón) en un array
      const results = await Promise.all(fetchPromises);
      // Guardo todos los valores de los fetch en un array usando el operador "spread"
      allChampions.push(...results);
      allAssassins = allChampions.filter(champion => champion.tags[0] == 'Assassin');
      allFighters = allChampions.filter(champion => champion.tags[0] == 'Fighter');
      allMages = allChampions.filter(champion => champion.tags[0] == 'Mage');
      allMarksmans = allChampions.filter(champion => champion.tags[0] == 'Marksman');
      allSupports = allChampions.filter(champion => champion.tags[0] == 'Support');
      allTanks = allChampions.filter(champion => champion.tags[0] == 'Tank');
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

const championsGrid = document.getElementById('championsGrid');
function displayChampion(champion) {
  const TAG = champion.tags[0].toLowerCase();
  const SPANISH_TAG = TAG === 'fighter' ? 'Luchador':
                      TAG === 'tank' ? 'Tanque':
                      TAG === 'mage' ? 'Mago':
                      TAG === 'assassin' ? 'Asesino':
                      TAG === 'support' ? 'Soporte':
                      TAG === 'marksman' ? 'Tirador':
                      'Desconocido';
  const DIFFICULTY_ARRAY = champion.info.difficulty <= 3 ? ["opacity-25", "opacity-25"]:
                           champion.info.difficulty <= 6  ? ["", "opacity-25"]:
                           ["", ""];
  const PASSIVE_PATH = champion.passive.image.full;
  const Q_PATH = champion.spells[0].image.full;
  const W_PATH = champion.spells[1].image.full;
  const E_PATH = champion.spells[2].image.full;
  const R_PATH = champion.spells[3].image.full;
  const div = document.createElement('div');
  div.classList.add('w-[272px]', 'bg-custom-blue-1', 'text-white', 'text-center', 'relative', 'pb-2', 'hover:scale-105', 'transition-all', 'duration-200', 'animate-fade', 'mx-auto');
  div.innerHTML = `
    <div class="w-full h-full bg-transparent absolute scale-x-112 scale-y-105">
      <div class="w-[28px] h-[28px] bg-white absolute top-0 right-0 rotate-45"></div>
    </div>
    <div class="relative w-60 m-auto mt-4 mb-1">
      <img src="${SPLASH_URL}${champion.id}_0.jpg" loading="lazy" width="240" height="436" alt="${champion.name} splash art">
      <div class="bg-black bg-opacity-50 h-20 w-60 absolute z-10 bottom-0"></div>
      <div class="text-custom-gold-1">
        <h3 class="absolute z-20 bottom-10 w-60 uppercase font-custom-title italic font-semibold text-2xl">${champion.name}</h3>
        <p class="absolute z-20 bottom-3 w-60 uppercase font-custom-title italic text-xs">${champion.title}</p>
      </div>
    </div>
    <div class="uppercase text-xs tracking-wider pb-2 px-5">
      <div class="pt-4 pb-3 px-1 flex justify-between font-custom-title">
        <div class="relative group hover:-translate-y-1 transition-all duration-200">
          <p class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-15 select-none group-hover:opacity-100 transition-all duration-200">P</p>
          <div class="w-full h-full absolute scale-112 border-white border-1"></div>
          <img src="${PASSIVE_URL}${PASSIVE_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} passive" class="w-9">
        </div>
        <div class="relative group hover:-translate-y-1 transition-all duration-200">
          <p class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-15 select-none group-hover:opacity-100 transition-all duration-200">Q</p>
          <div class="w-full h-full absolute scale-112 border-white border-1"></div>
          <img src="${ABILITY_URL}${Q_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} Q" class="w-9">
        </div>
        <div class="relative group hover:-translate-y-1 transition-all duration-200">
          <p class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-15 select-none group-hover:opacity-100 transition-all duration-200">W</p>
          <div class="w-full h-full absolute scale-112 border-white border-1"></div>
          <img src="${ABILITY_URL}${W_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} W" class="w-9">
        </div>
        <div class="relative group hover:-translate-y-1 transition-all duration-200">
          <p class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-15 select-none group-hover:opacity-100 transition-all duration-200">E</p>
          <div class="w-full h-full absolute scale-112 border-white border-1"></div>
          <img src="${ABILITY_URL}${E_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} E" class="w-9">
        </div>
        <div class="relative group hover:-translate-y-1 transition-all duration-200">
          <p class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-15 select-none group-hover:opacity-100 transition-all duration-200">R</p>
          <div class="w-full h-full absolute scale-112 border-white border-1"></div>
          <img src="${ABILITY_URL}${R_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} R" class="w-9">
        </div>
      </div>
      <p>Habilidades</p>
    </div>
    <div class="flex gap-4 p-2 uppercase text-xs tracking-wider justify-between">
      <div class="w-1/2">
        <img src="./img/${TAG}.webp" alt="${SPANISH_TAG} icon" class="w-8 mx-auto mb-1">
        <p>${SPANISH_TAG}</p>
      </div>
      <div class="w-1/2">
        <div class="w-16 h-8 mx-auto mb-1 flex gap-1">
          <div class="w-5 h-3 my-auto -skew-x-40 bg-custom-blue-2"></div>
          <div class="w-5 h-3 my-auto -skew-x-40 bg-custom-blue-2 ${DIFFICULTY_ARRAY[0]}"></div>
          <div class="w-5 h-3 my-auto -skew-x-40 bg-custom-blue-2 ${DIFFICULTY_ARRAY[1]}"></div>
        </div>
        <p>Dificultad</p>
      </div>
    </div>
    `;
  championsGrid.appendChild(div);
}


let championsParaCargar = allChampions;
const roleButtons = document.querySelectorAll('.role-btn');
roleButtons.forEach(button => button.addEventListener('click', () => {
  championsGrid.innerHTML = '';
  document.getElementById('loadMore').classList.remove('hidden');
  indiceActual = 0;
  const role = button.id;
  championsParaCargar = role === 'assassin' ? allAssassins:
                        role === 'fighter' ? allFighters:
                        role === 'mage' ? allMages:
                        role === 'marksman' ? allMarksmans:
                        role === 'support' ? allSupports:
                        role === 'tank' ? allTanks:
                        allChampions;
  for (let i = 0; i < CHAMPIONS_PER_PAGE; i++) {
    displayChampion(championsParaCargar[indiceActual + i]);
  }
  indiceActual += CHAMPIONS_PER_PAGE;
  // Sacar la clase 'role-active' de todos los botones y agregarla al botón clickeado
  roleButtons.forEach(button => button.classList.remove('role-active'));
  button.classList.add('role-active');
}));

document.addEventListener('DOMContentLoaded', fetchAndDisplayChampions);
document.getElementById('loadMore').addEventListener('click', () => {
  for (let i = 0; ((indiceActual + i) < championsParaCargar.length) && (i < CHAMPIONS_PER_PAGE); i++) {
    displayChampion(championsParaCargar[indiceActual + i]);
  }
  indiceActual += CHAMPIONS_PER_PAGE;
  if (indiceActual >= championsParaCargar.length) {
    document.getElementById('loadMore').classList.add('hidden');
  }
});
