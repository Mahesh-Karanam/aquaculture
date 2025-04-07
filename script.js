function createGauge(canvasId, label, value, min = 0, max = 100) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [label],
        datasets: [{
          label: label,
          data: [value, max - value],
          backgroundColor: ['#00bcd4', '#e0e0e0'],
          borderWidth: 1
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        }
      }
    });
  }
  
  window.onload = function () {
    createGauge('tdsGauge', 'TDS', 40);
    createGauge('turbidityGauge', 'Turbidity', 60);
    createGauge('temperatureGauge', 'Temp', 28);
    createGauge('voltageGauge', 'Voltage', 220);
  
    document.getElementById('motorToggle').addEventListener('change', function () {
      alert('Motor turned ' + (this.checked ? 'ON' : 'OFF'));
    });
  };