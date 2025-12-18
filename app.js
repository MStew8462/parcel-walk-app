const letterGrid = document.getElementById("letterGrid");
const walkGrid = document.getElementById("walkGrid");
const roadList = document.getElementById("roadList");

const roadTab = document.getElementById("roadTab");
const walkTab = document.getElementById("walkTab");

let roads = [];
let walksIndex = {};

fetch("roads.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);

    rows.forEach(row => {
      const [road, letter, walk] = row.split(",");

      const cleanRoad = road.trim();
      const cleanLetter = letter.trim().toUpperCase();
      const cleanWalk = walk.trim();

      roads.push({ road: cleanRoad, letter: cleanLetter, walk: cleanWalk });

      if (!walksIndex[cleanWalk]) {
        walksIndex[cleanWalk] = [];
      }
      walksIndex[cleanWalk].push(cleanRoad);
    });

    Object.values(walksIndex).forEach(list => list.sort());
    buildLetterGrid();
    buildWalkGrid();
  });

function buildLetterGrid() {
  const letters = [...new Set(roads.map(r => r.letter))].sort();
  letterGrid.innerHTML = "";

  letters.forEach(letter => {
    const btn = document.createElement("button");
    btn.className = "letter-btn";
    btn.textContent = letter;
    btn.onclick = () => showRoadsByLetter(letter);
    letterGrid.appendChild(btn);
  });
}

function buildWalkGrid() {
  walkGrid.innerHTML = "";

  Object.keys(walksIndex)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .forEach(walk => {
      const btn = document.createElement("button");
      btn.className = "walk-btn";
      btn.textContent = walk;
      btn.onclick = () => showWalk(walk);
      walkGrid.appendChild(btn);
    });
}

function showRoadsByLetter(letter) {
  roadList.innerHTML = "";

  roads
    .filter(r => r.letter === letter)
    .forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${r.road}</span><span class="walk">${r.walk}</span>`;
      roadList.appendChild(li);
    });
}

function showWalk(walk) {
  roadList.innerHTML = "";

  walksIndex[walk].forEach(road => {
    const li = document.createElement("li");
    li.textContent = road;
    roadList.appendChild(li);
  });
}

/* TAB SWITCHING */

roadTab.onclick = () => {
  roadTab.classList.add("active");
  walkTab.classList.remove("active");

  letterGrid.classList.remove("hidden");
  walkGrid.classList.add("hidden");
  roadList.innerHTML = "";
};

walkTab.onclick = () => {
  walkTab.classList.add("active");
  roadTab.classList.remove("active");

  letterGrid.classList.add("hidden");
  walkGrid.classList.remove("hidden");
  roadList.innerHTML = "";
};