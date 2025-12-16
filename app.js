let roads = [];

fetch('roads.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').slice(1);
    lines.forEach(line => {
      const [Road, FirstLetter, Walk] = line.split(',');
      if (Road) {
        roads.push({ Road, FirstLetter, Walk });
      }
    });
    createAlphabet();
  });

function createAlphabet() {
  const alphabetDiv = document.getElementById('alphabet');
  const letters = [...new Set(roads.map(r => r.FirstLetter))].sort();

  letters.forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.onclick = () => showRoads(letter);
    alphabetDiv.appendChild(btn);
  });
}

function showRoads(letter) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  roads
    .filter(r => r.FirstLetter === letter)
    .sort((a, b) => a.Road.localeCompare(b.Road))
    .forEach(r => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${r.Road}</span><strong>${r.Walk}</strong>`;
      results.appendChild(li);
    });
}