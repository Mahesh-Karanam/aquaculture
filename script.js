// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC9SYfsNkfGrfPFfRlCLSHXncwwZQJY--I",
  authDomain: "aquaculture-5e8a4.firebaseapp.com",
  databaseURL: "https://aquaculture-5e8a4-default-rtdb.firebaseio.com",
  projectId: "aquaculture-5e8a4",
  storageBucket: "aquaculture-5e8a4.firebasestorage.app",
  messagingSenderId: "465167971896",
  appId: "1:465167971896:web:53e1ec29b5acb56704d8cd"
});

const db = firebase.database();

// Chart config helper
function createGaugeChart(ctx, max) {
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [0, max],
        backgroundColor: ['#00bcd4', '#e0e0e0'],
        borderWidth: 0
      }]
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: '70%',
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false }
      }
    }
  });
}

// Initialize charts
const tdsChart = createGaugeChart(document.getElementById("tdsGauge"), 1000);
const turbidityChart = createGaugeChart(document.getElementById("turbidityGauge"), 100);
const temperatureChart = createGaugeChart(document.getElementById("temperatureGauge"), 50);
const voltageChart = createGaugeChart(document.getElementById("voltageGauge"), 240);

// Update chart values
function updateGauge(chart, value, max) {
  const clamped = Math.min(value, max);
  chart.data.datasets[0].data = [clamped, max - clamped];
  chart.update();
}

// Update diesel
function updateDiesel(value) {
  const progress = document.getElementById("dieselLevel");
  const text = document.getElementById("dieselText");
  const percent = Math.min(value, 100);
  progress.value = percent;
  text.textContent = percent + "%";
}

// Update status
function updateStatus(id, value) {
  const el = document.getElementById(id);
  const isOn = value === true || value === 1 || String(value).toLowerCase() === "on";
  el.textContent = isOn ? "ON" : "OFF";
  el.className = "status " + (isOn ? "on" : "off");
}

// Update motor toggle
function updateMotor(value) {
  const toggle = document.getElementById("motorToggle");
  toggle.checked = value === true || value === 1 || String(value).toLowerCase() === "on";
}

// Firebase listeners
db.ref("tds").on("value", snapshot => updateGauge(tdsChart, snapshot.val(), 1000));
db.ref("turbidity").on("value", snapshot => updateGauge(turbidityChart, snapshot.val(), 100));
db.ref("temperature").on("value", snapshot => updateGauge(temperatureChart, snapshot.val(), 50));
db.ref("voltage").on("value", snapshot => updateGauge(voltageChart, snapshot.val(), 240));
db.ref("diesel_level").on("value", snapshot => updateDiesel(snapshot.val()));
db.ref("grid_status").on("value", snapshot => updateStatus("gridStatus", snapshot.val()));
db.ref("generator_status").on("value", snapshot => updateStatus("generatorStatus", snapshot.val()));
db.ref("motor_control").on("value", snapshot => updateMotor(snapshot.val()));
