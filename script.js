// ========== Task 2: Interactive Quiz ==========
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Python"],
    answer: "CSS"
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["React", "Laravel", "Django"],
    answer: "React"
  }
];

let index = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');

function loadQuestion() {
  const q = quizData[index];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  resultEl.textContent = "";
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.answer) score++;
      index++;
      if (index < quizData.length) loadQuestion();
      else showResult();
    };
    optionsEl.appendChild(btn);
  });
}
function showResult() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  resultEl.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
}
loadQuestion();

// ========== Task 3: Weather App ==========
const apiKey = "f9d44bd7e30bc2b4c6f80224c0ae2112"; // ✅ Your real OpenWeatherMap key

document.getElementById("search").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  const weatherResult = document.getElementById("weather-result");

  if (city === "") {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        weatherResult.innerHTML = `
          <h3>${data.name}</h3>
          <p>🌡️ Temp: ${data.main.temp}°C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>☁️ Weather: ${data.weather[0].description}</p>
        `;
      } else {
        weatherResult.innerHTML = "<p>City not found!</p>";
      }
    })
    .catch(() => {
      weatherResult.innerHTML = "<p>Error fetching data.</p>";
    });
});
