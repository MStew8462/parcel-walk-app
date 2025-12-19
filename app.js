const selectorGrid = document.getElementById("selectorGrid");
const results = document.getElementById("results");

const roadTab = document.getElementById("roadTab");
const walkTab = document.getElementById("walkTab");

let roads = [];
let mode = "road"; // road | walk

fetch("roads.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);

    rows.forEach(row => {
      const [road, letter, walk] = row.split(",");
      roads.push({
        road: road.trim(),
        letter: letter.trim().toUpperCase(),
        walk: walk.trim()
      });
    });

    buildSelector();
  });

/* -------------------- MODE SWITCHING -------------------- */

roadTab.onclick = () => {
  mode = "road";
  roadTab.classList.add("active");
  walkTab.classList.remove("active");
  buildSelector();
  results.innerHTML = "";
};

walkTab.onclick = () => {
  mode = "walk";
  walkTab.classList.add("active");
  roadTab.classList.remove("active");
  buildSelector();
  results.innerHTML = "";
};

/* -------------------- BUILD GRID -------------------- */

function buildSelector() {
  selectorGrid.innerHTML = "";

  if (mode === "road") {
    const letters = [...new Set(roads.map(r => r.letter))].sort();

    letters.forEach(letter => {
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.onclick = () => showByLetter(letter);
      selectorGrid.appendChild(btn);
    });

  } else {
    const walks = [...new Set(roads.map(r => r.walk))].sort();

    walks.forEach(walk => {
      const btn = document.createElement("button");
      btn.textContent = walk;
      btn.onclick = () => showByWalk(walk);
      selectorGrid.appendChild(btn);
    });
  }
}

/* -------------------- RESULTS -------------------- */

function showByLetter(letter) {
  results.innerHTML = "";

  roads
    .filter(r => r.letter === letter)
    .sort((a, b) => a.road.localeCompare(b.road))
    .forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${r.road}</span><span class="walk">${r.walk}</span>`;
      results.appendChild(li);
    });
}

function showByWalk(walk) {
  results.innerHTML = "";

  roads
    .filter(r => r.walk === walk)
    .sort((a, b) => a.road.localeCompare(b.road))
    .forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${r.road}</span>`;
      results.appendChild(li);
    });
}