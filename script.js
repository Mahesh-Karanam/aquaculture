const firebaseConfig = {

      apiKey: "AIzaSyDIbt5_7E7WFawzenvi88yXUDQmnwzUr7w",

      authDomain: "dummy-29891.firebaseapp.com",

      databaseURL: "https://dummy-29891-default-rtdb.asia-southeast1.firebasedatabase.app",

      projectId: "dummy-29891",

      storageBucket: "dummy-29891.appspot.com",

      messagingSenderId: "858783429956",

      appId: "1:858783429956:web:e52849ac5e66d075d15311"

    };

    firebase.initializeApp(firebaseConfig);

    const db = firebase.database();

 

    function createGauge(id, max) {

      return new Chart(document.getElementById(id), {

        type: 'doughnut',

        data: {

          datasets: [{

            data: [0, max],

            backgroundColor: ['#00c0f0', '#e0e0e0'],

            borderWidth: 0

          }]

        },

        options: {

          cutout: '70%',

          plugins: {

            legend: { display: false },

            tooltip: { enabled: false }

          }

        }

      });

    }

 

    const turbGauge = createGauge("turbGauge", 100);

    const tempGauge = createGauge("tempGauge", 50);

    const voltGauge = createGauge("voltGauge", 300);

 

    db.ref("sensor/turbidity").on("value", snap => {

      let v = snap.val() || 0;

      turbGauge.data.datasets[0].data = [v, 100 - v];

      turbGauge.update();

      document.getElementById("turbVal").textContent = `${v}`;

    });

 

    db.ref("sensor/temperature").on("value", snap => {

      let v = snap.val() || 0;

      tempGauge.data.datasets[0].data = [v, 50 - v];

      tempGauge.update();

      document.getElementById("tempVal").textContent = `${v}°C`;

    });

 

    db.ref("sensor/voltage").on("value", snap => {

      let v = snap.val() || 0;

      voltGauge.data.datasets[0].data = [v, 300 - v];

      voltGauge.update();

      document.getElementById("voltVal").textContent = `${v}V`;

    });

 

    db.ref("sensor/diesel").on("value", snap => {

      let v = snap.val() || 0;

      document.getElementById("dieselBar").style.width = v + "%";

      document.getElementById("dieselText").textContent = `${v}%`;

    });

 

    db.ref("control/grid_status").on("value", snap => {

      let on = snap.val();

      let el = document.getElementById("gridStatus");

      el.textContent = on ? "ON" : "OFF";

      el.className = "status " + (on ? "on" : "off");

    });

 

    db.ref("control/generator_status").on("value", snap => {

      let on = snap.val();

      let el = document.getElementById("genStatus");

      el.textContent = on ? "ON" : "OFF";

      el.className = "status " + (on ? "on" : "off");

    });

 

    const motorToggle = document.getElementById("motorToggle");

    db.ref("control/relay").on("value", snap => {

      motorToggle.checked = snap.val() || false;

    });

    motorToggle.addEventListener("change", () => {

      db.ref("control/relay").set(motorToggle.checked);

    });
