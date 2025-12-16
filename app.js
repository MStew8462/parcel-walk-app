// Array to hold road data
let roads = [];

// Fetch the CSV file
fetch('roads.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n').slice(1); // skip header
    lines.forEach(line => {
      if (!line.trim()) return; // skip empty lines
      // Remove any hidden quotes
      line = line.replace(/"/g, '');
      const [Road, FirstLetter, Walk, Zone, Notes] = line.split(',');
      if (Road) {
        roads.push({ Road: Road.trim(), FirstLetter: FirstLetter ? FirstLetter.trim() : Road.trim().charAt(0).toUpperCase(), Walk: Walk ? Walk.trim() : '', Zone: Zone ? Zone.trim() : '', Notes: Notes ? Notes.trim() : '' });
      }
    });
    createAlphabet();
  })
  .catch(err => console.error('Error loading CSV:', err));

// Create alphabet buttons
function createAlphabet() {
  const alphabetDiv = document.getElementById('alphabet');

  // Get first letter of each road or use FirstLetter column
  const letters = [...new Set(
      roads.map(r => {
        const firstChar = r.FirstLetter.trim().charAt(0).toUpperCase();
        return /^[A-Z]$/.test(firstChar) ? firstChar : null; // only A-Z
      }).filter(Boolean)
    )].sort();

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
    .filter(r => r.FirstLetter.trim().charAt(0).toUpperCase() === letter)
    .sort((a, b) => a.Road.localeCompare(b.Road))
    .forEach(r => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${r.Road}</span><strong>${r.Walk}</strong>`;
      results.appendChild(li);
    });
}