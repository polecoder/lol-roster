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
    const storedChampionsData = localStorage.getItem('championsData');
    let fetchPromises;
    if (storedChampionsData) {
      const results = JSON.parse(storedChampionsData);
      allChampions.push(...results);
    } else {
      fetchPromises = CHAMPION_IDS.map(championID => {
        return fetch(`${CHAMPION_URL}/${championID}.json`)
          .then(response => response.json())
          .then(data => data.data[championID]);
      });
      console.log(fetchPromises);
    }

    try {
      if (fetchPromises) {
        // Espero a que todas las promesas se resuelvan, guardando los resultados (results[i] será el fetch de un campeón) en un array
        const results = await Promise.all(fetchPromises);
        // Guardo todos los valores de los fetch en un array usando el operador "spread", además los guardo en el localStorage
        allChampions.push(...results);
        localStorage.setItem('championsData', JSON.stringify(allChampions));
      }
      
      // Guardo los campeones en un array para cada rol, en este punto allChampions siempre está lleno, ya sea con localStorage o un fetch
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
  div.classList.add('w-[272px]', 'bg-custom-blue-1', 'text-white', 'text-center', 'relative', 'pb-2', 'transition-all', 'group', 'duration-200', 'animate-fade', 'mx-auto', 'before:absolute', 'before:w-[28px]', 'before:h-[28px]', 'before:bg-white', 'before:-top-[14px]', 'before:-right-[14px]', 'before:rotate-[45deg]', 'before:hover:translate-x-3', 'before:hover:-translate-y-3', 'before:transition-all', 'before:duration-500');
  div.innerHTML = `
    <div class="relative w-60 m-auto mt-4 mb-1">
      <div class="overflow-hidden relative">
        <img src="./img/loading.svg" width="40" height="40" class="animate-spin absolute top-[198px] left-[100px]" alt="Loading svg">
        <img src="${SPLASH_URL}${champion.id}_0.jpg" width="240" height="436" class="scale-105 group-hover:scale-[115%] -z-10 transition-all duration-300" alt="${champion.name} splash art">
      </div>
      <div class="bg-black bg-opacity-50 h-20 w-60 absolute z-10 bottom-0"></div>
      <div class="text-custom-gold-1">
        <h2 class="absolute z-20 bottom-10 w-60 uppercase font-custom-title italic font-semibold text-2xl">${champion.name}</h2>
        <p class="absolute z-20 bottom-3 w-60 uppercase font-custom-title italic text-xs">${champion.title}</p>
      </div>
    </div>
    <div class="uppercase text-xs tracking-wider pb-2 px-5">
      <div class="pt-4 pb-3 px-1 flex justify-between font-custom-title">
        <div class="relative group hover:-translate-y-1 transition-all duration-300 before:content-['P'] before:absolute before:left-0 before:w-full before:h-full before:leading-[36px] before:opacity-15 before:hover:opacity-100 before:transition-all before:duration-300 after:absolute after:top-0 after:left-0 after:w-[36px] after:h-[36px] after:scale-[112%] after:border-white after:border-[1px]">
          <img src="${PASSIVE_URL}${PASSIVE_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} passive" class="w-9">
        </div>
        <div class="relative group hover:-translate-y-1 transition-all duration-300 before:content-['Q'] before:absolute before:left-0 before:w-full before:h-full before:leading-[36px] before:opacity-15 before:hover:opacity-100 before:transition-all before:duration-300 after:absolute after:top-0 after:left-0 after:w-[36px] after:h-[36px] after:scale-[112%] after:border-white after:border-[1px]">
          <img src="${ABILITY_URL}${Q_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} Q" class="w-9">
        </div>
        <div class="relative group hover:-translate-y-1 transition-all duration-300 before:content-['W'] before:absolute before:left-0 before:w-full before:h-full before:leading-[36px] before:opacity-15 before:hover:opacity-100 before:transition-all before:duration-300 after:absolute after:top-0 after:left-0 after:w-[36px] after:h-[36px] after:scale-[112%] after:border-white after:border-[1px]">
          <img src="${ABILITY_URL}${W_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} W" class="w-9">
        </div>
        <div class="relative group hover:-translate-y-1 transition-all duration-300 before:content-['E'] before:absolute before:left-0 before:w-full before:h-full before:leading-[36px] before:opacity-15 before:hover:opacity-100 before:transition-all before:duration-300 after:absolute after:top-0 after:left-0 after:w-[36px] after:h-[36px] after:scale-[112%] after:border-white after:border-[1px]">
          <img src="${ABILITY_URL}${E_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} E" class="w-9">
        </div>
        <div class="relative group hover:-translate-y-1 transition-all duration-300 before:content-['R'] before:absolute before:left-0 before:w-full before:h-full before:leading-[36px] before:opacity-15 before:hover:opacity-100 before:transition-all before:duration-300 after:absolute after:top-0 after:left-0 after:w-[36px] after:h-[36px] after:scale-[112%] after:border-white after:border-[1px]">
          <img src="${ABILITY_URL}${R_PATH}" loading="lazy" width="40" height="40" alt="${champion.name} R" class="w-9">
        </div>
      </div>
      <p>Habilidades</p>
    </div>
    <div class="flex gap-4 p-2 uppercase text-xs tracking-wider justify-between">
      <div class="w-1/2">
        <img src="./img/${TAG}.webp" alt="${SPANISH_TAG} icon" width="32" height="32" class="w-8 mx-auto mb-1">
        <p>${SPANISH_TAG}</p>
      </div>
      <div class="w-1/2">
        <div class="w-16 h-8 mx-auto mb-1 flex gap-1">
          <div class="w-5 h-3 my-auto -skew-x-[40deg] bg-custom-blue-2"></div>
          <div class="w-5 h-3 my-auto -skew-x-[40deg] bg-custom-blue-2 ${DIFFICULTY_ARRAY[0]}"></div>
          <div class="w-5 h-3 my-auto -skew-x-[40deg] bg-custom-blue-2 ${DIFFICULTY_ARRAY[1]}"></div>
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

fetchAndDisplayChampions();
document.getElementById('loadMore').addEventListener('click', () => {
  for (let i = 0; ((indiceActual + i) < championsParaCargar.length) && (i < CHAMPIONS_PER_PAGE); i++) {
    displayChampion(championsParaCargar[indiceActual + i]);
  }
  indiceActual += CHAMPIONS_PER_PAGE;
  if (indiceActual >= championsParaCargar.length) {
    document.getElementById('loadMore').classList.add('hidden');
  }
});
