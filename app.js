let roads = [];
let letterGrid, walkGrid, results, roadTab, walkTab;

// Wait for the HTML to fully load before grabbing elements
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Grab the elements NOW (they are guaranteed to exist)
  letterGrid = document.getElementById("letterGrid");
  walkGrid = document.getElementById("walkGrid");
  results = document.getElementById("results");
  roadTab = document.getElementById("roadTab");
  walkTab = document.getElementById("walkTab");

  // 2. Set up click listeners
  roadTab.onclick = () => switchMode("road");
  walkTab.onclick = () => switchMode("walk");

  // 3. Load the Data
  loadData();
});

/* ---------- LOAD CSV ---------- */

function loadData() {
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
    switchMode("road"); // FORCE INITIAL VISIBILITY
  });

/* ---------- TAB SWITCHING ---------- */

roadTab.onclick = () => switchMode("road");
walkTab.onclick = () => switchMode("walk");

function switchMode(mode) {
  results.innerHTML = "";

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

/* ---------- DISPLAY ---------- */

function showRoadsByLetter(letter) {
  compactGrids();
  results.innerHTML = "";

  roads
    .filter(r => r.letter === letter)
    .sort((a, b) => a.road.localeCompare(b.road))
    .forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="road">${r.road}</span><span class="walk">${r.walk}</span>`;
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
      li.innerHTML = `<span class="road">${r.road}</span><span class="walk">${r.walk}</span>`;
      results.appendChild(li);
    });
}
