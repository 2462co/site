const fontFamilies = [
  "Rubik 80s Fade",
  "Rubik Iso",
  "Rubik Vinyl",
  "Rubik Spray Paint",
  "Rubik Gemstones",
  "Rubik Storm",
  "Rubik Moonrocks",
  "Rubik Dirt",
  "Rubik Marker Hatch",
  "Rubik Burned",
  "Rubik Maze",
  "Rubik Glitch",
  "Rubik Puddles",
  "Rubik Beastly",
];

function setRandomFont() {
  const randomIndex = Math.floor(Math.random() * fontFamilies.length);
  const siteTitle = document.getElementById("site-title");
  siteTitle.style.fontFamily = fontFamilies[randomIndex];
}

setInterval(setRandomFont, 500);
