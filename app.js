let roads = [];

// Fetch CSV
fetch('roads.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').slice(1); // skip header
    lines.forEach(line => {
      if (!line.trim()) return;
      line = line.replace(/"/g, ''); // remove quotes
      const [Road, FirstLetter, Walk, Zone, Notes] = line.split(',');
      if (Road) {
        let letter = FirstLetter ? FirstLetter.trim().charAt(0).toUpperCase() : Road.trim().charAt(0).toUpperCase();
        if (!/^[A-Z]$/.test(letter)) return;
        roads.push({
          Road: Road.trim(),
          FirstLetter: letter,
          Walk: Walk ? Walk.trim() : '',
          Zone: Zone ? Zone.trim() : '',
          Notes: Notes ? Notes.trim() : ''
        });
      }
    });
    createAlphabet();
  })
  .catch(err => console.error('Error loading CSV:', err));

// Alphabet buttons
function createAlphabet() {
  const alphabetDiv = document.getElementById('alphabet');
  alphabetDiv.innerHTML = '';

  const letters = [...new Set(roads.map(r => r.FirstLetter))].sort();

  letters.forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.onclick = () => showRoads(letter);
    alphabetDiv.appendChild(btn);
  });
}

// Show roads for selected letter
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

  // Shrink alphabet buttons after selection
  document.getElementById('alphabet').classList.add('shrink');
}