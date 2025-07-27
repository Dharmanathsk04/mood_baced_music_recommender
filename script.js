let defaultMoods = {
  happy: {
    text: "🎵 Try this upbeat track: 'Happy - Pharrell Williams'",
    link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs"
  },
  sad: {
    text: "💔 A comforting song: 'Let Her Go - Passenger'",
    link: "https://www.youtube.com/watch?v=RBumgq5yVrA"
  },
  angry: {
    text: "🔥 Release the anger with: 'In The End - Linkin Park'",
    link: "https://www.youtube.com/watch?v=eVTXPUF4Oz4"
  },
  relaxed: {
    text: "🌿 Chill out with: 'Weightless - Marconi Union'",
    link: "https://www.youtube.com/watch?v=UfcAVejslrU"
  }
};

function getMoods() {
  const saved = localStorage.getItem("customMoods");
  return saved ? { ...defaultMoods, ...JSON.parse(saved) } : defaultMoods;
}

function displayMoodButtons() {
  const moodContainer = document.getElementById("moodButtons");
  moodContainer.innerHTML = "";
  const allMoods = getMoods();

  for (let mood in allMoods) {
    const btn = document.createElement("button");
    btn.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
    btn.onclick = () => recommend(mood);
    moodContainer.appendChild(btn);
  }
}

function recommend(mood) {
  const allMoods = getMoods();
  const suggestion = allMoods[mood];
  document.getElementById("suggestion").innerHTML = `
    ${suggestion.text}<br>
    <a href="${suggestion.link}" target="_blank" style="color:#ffd700; text-decoration:underline;">🎵 Listen Now</a>
  `;
}

function addCustomMood() {
  const mood = document.getElementById("newMood").value.trim().toLowerCase();
  const text = document.getElementById("newText").value.trim();
  const link = document.getElementById("newLink").value.trim();

  if (!mood || !text || !link) {
    alert("Please fill all fields.");
    return;
  }

  let savedMoods = JSON.parse(localStorage.getItem("customMoods")) || {};
  savedMoods[mood] = { text, link };
  localStorage.setItem("customMoods", JSON.stringify(savedMoods));

  displayMoodButtons();

  document.getElementById("newMood").value = "";
  document.getElementById("newText").value = "";
  document.getElementById("newLink").value = "";

  alert("🎉 Mood added successfully!");
}

window.onload = displayMoodButtons;
