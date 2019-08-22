const xLabels = [];
const yTemps = [];
async function chartIt() {
  await fetchData();
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xLabels,
      datasets: [
        {
          label: "# of Votes",
          data: yTemps,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: ["rgba(255, 99, 132, 1)"],
          fill:false,
          borderWidth: 1
        }
      ]
    }
  });
}

async function fetchData() {
  const response = await fetch("GLB.Ts+dSST.csv");
  var data = await response.text();
  data = data.split("\n").splice(2);
  data.forEach(row => {
    row = row.split(",");
    const year = row[0];
    xLabels.push(year);
    const temp = row[1];
    yTemps.push(parseFloat(temp)+14);
    console.log(year, temp);
  });
}

chartIt();
