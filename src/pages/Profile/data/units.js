const heroesInfo = [
  {
    name: "Barbarian King",
    className: "king",
    src: "Barbarian_King.png",
  },
  {
    name: "Archer Queen",
    className: "queen",
    src: "Archer_Queen.png",
  },
  {
    name: "Grand Warden",
    className: "warden",
    src: "Grand_Warden.png",
  },
  {
    name: "Royal Champion",
    className: "rochamp",
    src: "Royal_Champion.png",
  },
];

const petsInfo = [
  {
    name: "L.A.S.S.I",
    className: "lassi",
    src: "L.A.S.S.I.png",
  },
  {
    name: "Electro Owl",
    className: "owl",
    src: "Electro_Owl.png",
  },
  {
    name: "Mighty Yak",
    className: "yak",
    src: "Mighty_Yak.png",
  },
  {
    name: "Unicorn",
    className: "unicorn",
    src: "Unicorn.png",
  },
];

const troopsInfo = [
  {
    name: "Barbarian",
    className: "barbarian",
    src: "Barbarian.png",
  },
  {
    name: "Archer",
    className: "archer",
    src: "Archer.png",
  },
  {
    name: "Giant",
    className: "giant",
    src: "Giant.png",
  },
  {
    name: "Goblin",
    className: "goblin",
    src: "Goblin.png",
  },
  {
    name: "Wall Breaker",
    className: "wallBreaker",
    src: "Wall_Breaker.png",
  },
  {
    name: "Balloon",
    className: "balloon",
    src: "Balloon.png",
  },
  {
    name: "Wizard",
    className: "wizard",
    src: "Wizard.png",
  },
  {
    name: "Healer",
    className: "healer",
    src: "Healer.png",
  },
  {
    name: "Dragon",
    className: "dragon",
    src: "Dragon.png",
  },
  {
    name: "P.E.K.K.A",
    className: "pekka",
    src: "P.E.K.K.A.png",
  },
  {
    name: "Baby Dragon",
    className: "babyDragon",
    src: "Baby_Dragon.png",
  },
  {
    name: "Miner",
    className: "miner",
    src: "Miner.png",
  },
  {
    name: "Electro Dragon",
    className: "electroDragon",
    src: "Electro_Dragon.png",
  },
  {
    name: "Yeti",
    className: "yeti",
    src: "Yeti.png",
  },
  {
    name: "Dragon Rider",
    className: "dragonRider",
    src: "Dragon_Rider.png",
  },
  {
    name: "Minion",
    className: "minion",
    src: "Minion.png",
  },
  {
    name: "Hog Rider",
    className: "hogRider",
    src: "Hog_Rider.png",
  },
  {
    name: "Valkyrie",
    className: "valkyrie",
    src: "Valkyrie.png",
  },
  {
    name: "Golem",
    className: "golem",
    src: "Golem.png",
  },
  {
    name: "Witch",
    className: "witch",
    src: "Witch.png",
  },
  {
    name: "Lava Hound",
    className: "lavaHound",
    src: "Lava_Hound.png",
  },
  {
    name: "Bowler",
    className: "bowler",
    src: "Bowler.png",
  },
  {
    name: "Ice Golem",
    className: "iceGolem",
    src: "Ice_Golem.png",
  },
  {
    name: "Headhunter",
    className: "headHunter",
    src: "Headhunter.png",
  },
];

const spellsInfo = [
  {
    name: "Lightning Spell",
    className: "lightning",
    src: "Lightning_Spell.png",
  },
  {
    name: "Healing Spell",
    className: "heal",
    src: "Healing_Spell.png",
  },
  {
    name: "Rage Spell",
    className: "rage",
    src: "Rage_Spell.png",
  },
  {
    name: "Jump Spell",
    className: "jump",
    src: "Jump_Spell.png",
  },
  {
    name: "Freeze Spell",
    className: "freeze",
    src: "Freeze_Spell.png",
  },
  {
    name: "Clone Spell",
    className: "clone",
    src: "Clone_Spell.png",
  },
  {
    name: "Invisibility Spell",
    className: "invisibility",
    src: "Invisibility_Spell.png",
  },
  {
    name: "Poison Spell",
    className: "poison",
    src: "Poison_Spell.png",
  },
  {
    name: "Earthquake Spell",
    className: "earthquake",
    src: "Earthquake_Spell.png",
  },
  {
    name: "Haste Spell",
    className: "haste",
    src: "Haste_Spell.png",
  },
  {
    name: "Skeleton Spell",
    className: "skeleton",
    src: "Skeleton_Spell.png",
  },
  {
    name: "Bat Spell",
    className: "bat",
    src: "Bat_Spell.png",
  },
];

const siegeMachinesInfo = [
  {
    name: "Wall Wrecker",
    className: "wallWrecker",
    src: "Wall_Wrecker.png",
  },
  {
    name: "Battle Blimp",
    className: "battleBlimp",
    src: "Battle_Blimp.png",
  },
  {
    name: "Stone Slammer",
    className: "stoneSlammer",
    src: "Stone_Slammer.png",
  },
  {
    name: "Siege Barracks",
    className: "siegeBarracks",
    src: "Siege_Barracks.png",
  },
  {
    name: "Log Launcher",
    className: "logLauncher",
    src: "Log_Launcher.png",
  },
  {
    name: "Flame Flinger",
    className: "flameFlinger",
    src: "Flame_Flinger.png",
  },
];

export const units = [
  { type: "영웅", value: "heroes", src: "coc_Heroes", info: heroesInfo },
  { type: "펫", value: "troops", src: "coc_Pets", info: petsInfo },
  { type: "병력", value: "troops", src: "coc_Troops", info: troopsInfo },
  { type: "마법", value: "spells", src: "coc_Spells", info: spellsInfo },
  {
    type: "시즈 머신",
    value: "troops",
    src: "coc_Siege_Machines",
    info: siegeMachinesInfo,
  },
];
