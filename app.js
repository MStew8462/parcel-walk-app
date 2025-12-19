let roads = [];

const letterGrid = document.getElementById("letterGrid");
const walkGrid = document.getElementById("walkGrid");
const results = document.getElementById("results");

const roadTab = document.getElementById("roadTab");
const walkTab = document.getElementById("walkTab");

/* ---------- LOAD CSV ---------- */

fetch("roads.csv")
  .then(res => res.text())
  .then(text => {
    const lines = text.trim().split("\n").slice(1);

    roads = lines.map(line => {
      const [road, walk] = line.split(",");
      return {
        road: road.trim(),
        walk: walk.trim(),
        letter: road.trim()[0].toUpperCase()
      };
    });

    buildLetterGrid();
    buildWalkGrid();
  });

/* ---------- TAB SWITCHING ---------- */

roadTab.onclick = () => switchMode("road");
walkTab.onclick = () => switchMode("walk");

function switchMode(mode) {
  results.innerHTML = "";

  // reset grid size when switching modes
  letterGrid.classList.remove("compact");
  walkGrid.classList.remove("compact");

  if (mode === "road") {
    roadTab.classList.add("active");
    walkTab.classList.remove("active");
    letterGrid.classList.remove("hidden");
    walkGrid.classList.add("hidden");
  } else {
    walkTab.classList.add("active");
    roadTab.classList.remove("active");
    walkGrid.classList.remove("hidden");
    letterGrid.classList.add("hidden");
  }
}

/* ---------- GRID BUILDERS ---------- */

function buildLetterGrid() {
  letterGrid.innerHTML = "";

  const letters = [...new Set(
    roads.map(r => r.letter).filter(l => l >= "A" && l <= "Z")
  )].sort();

  letters.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => showRoadsByLetter(letter);
    letterGrid.appendChild(btn);
  });
}

function buildWalkGrid() {
  walkGrid.innerHTML = "";

  const walks = [...new Set(roads.map(r => r.walk))]
    .sort((a, b) => parseInt(a) - parseInt(b));

  walks.forEach(walk => {
    const btn = document.createElement("button");
    btn.textContent = walk;
    btn.onclick = () => showRoadsByWalk(walk);
    walkGrid.appendChild(btn);
  });
}

/* ---------- COMPACT MODE ---------- */

function compactGrids() {
  letterGrid.classList.add("compact");
  walkGrid.classList.add("compact");
}

/* ---------- DISPLAY FUNCTIONS ---------- */

function showRoadsByLetter(letter) {
  compactGrids();
  results.innerHTML = "";

  roads
    .filter(r => r.letter === letter)
    .sort((a, b) => a.road.localeCompare(b.road))
    .forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="road">${r.road}</span>
        <span class="walk">${r.walk}</span>
      `;
      results.appendChild(li);
    });
}

function showRoadsByWalk(walk) {
  compactGrids();
  results.innerHTML = "";

  roads
    .filter(r => r.walk === walk)
    .sort((a, b) => a.road.localeCompare(b.road))
    .forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="road">${r.road}</span>
        <span class="walk">${r.walk}</span>
      `;
      results.appendChild(li);
    });
}