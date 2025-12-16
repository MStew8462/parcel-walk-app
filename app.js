{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 let roads = [];\
\
fetch('roads.csv')\
  .then(response => response.text())\
  .then(data => \{\
    const lines = data.split('\\n').slice(1);\
    lines.forEach(line => \{\
      const [Road, FirstLetter, Walk] = line.split(',');\
      if (Road) \{\
        roads.push(\{ Road, FirstLetter, Walk \});\
      \}\
    \});\
    createAlphabet();\
  \});\
\
function createAlphabet() \{\
  const alphabetDiv = document.getElementById('alphabet');\
  const letters = [...new Set(roads.map(r => r.FirstLetter))].sort();\
\
  letters.forEach(letter => \{\
    const btn = document.createElement('button');\
    btn.textContent = letter;\
    btn.onclick = () => showRoads(letter);\
    alphabetDiv.appendChild(btn);\
  \});\
\}\
\
function showRoads(letter) \{\
  const results = document.getElementById('results');\
  results.innerHTML = '';\
\
  roads\
    .filter(r => r.FirstLetter === letter)\
    .sort((a, b) => a.Road.localeCompare(b.Road))\
    .forEach(r => \{\
      const li = document.createElement('li');\
      li.innerHTML = `<span>$\{r.Road\}</span><strong>$\{r.Walk\}</strong>`;\
      results.appendChild(li);\
    \});\
\}}