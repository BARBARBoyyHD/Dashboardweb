const TopProduct = document.getElementById("TopProduct");
const ageBarchart = document.getElementById("ageBarChart");

fetch("./data/topProduct.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    Top5Product(data,"bar")
  });

function Top5Product(data,type) {
  new Chart(TopProduct, {
    type: type,
    data: {
      labels:data.map(row => row.ProductName),
      datasets: [
        {
          label: "Top 5 product ",
          data: data.map(row => row.revenue),
          borderWidth: 1,
          backgroundColor:'rgba(241, 196, 15, 1)',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        x:{
          ticks:{
            font:{
              size:9,
            },
          },
        },
      },
    },
  });
}
function age(data) {
  fetch("./data/genderandage.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // You need to return the parsed JSON data here
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching sales data:", error);
    });
  const ageGroups = ["Adults", "Young Adults", "Youth", "Seniors"];
  const years = ["2015", "2016"];
  const genders = ["Male", "Female"];

  // Create dataset objects for each gender
  const datasets = genders.map((gender) => {
    return {
      label: gender,
      data: ageGroups.map((ageGroup) => {
        return years.reduce((sum, year) => {
          return sum + (data[year][ageGroup][gender] || 0);
        }, 0);
      }),
      borderWidth: 1,
      backgroundColor:
        gender === "Male" ? "rgba(241, 196, 15, 1)" : "rgba(211, 84, 0, 1)",
      borderColor:
        gender === "Female" ? "rgba(241, 196, 15, 1)" : "rgba(211, 84, 0, 1)",
    };
  });

  // Create the bar chart
  new Chart(ageBarchart, {
    type: "bar",
    data: {
      labels: ageGroups,
      datasets: datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          barPercentage: 0.2,
        },
      },
    },
  });
}

// Fetch the JSON data and call the age function
fetch("./data/genderandage.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    age(data.salesData);
  })
  .catch((error) => {
    console.error("Error fetching sales data:", error);
  });

var data = {
  labels: ["Germany", "France", "UK"],
  datasets: [
    {
      data: [32.1, 28.5, 39.4],
      backgroundColor: [
        "rgba(243, 156, 18, 1)",
        "rgba(211, 84, 0, 1)",
        "rgba(241, 196, 15, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Konfigurasi pie chart
var options = {
  responsive: true,
  maintainAspectRatio: false,
};

// Menggambar pie chart
var ctx = document.getElementById("myPieChart").getContext("2d");
var myPieChart = new Chart(ctx, {
  type: "pie",
  data: data,
  options: options,
});

// Untuk Row 2 Menampilkan diagram garis
var sales = [
  {
    country: "United Kingdom",
    values: [2476886, 2600379],
    backgroundColor: "yellow",
  },
  {
    country: "Germany",
    values: [1925113, 1925113],
    backgroundColor: "red",
  },
  {
    country: "France",
    values: [1925113, 1800511],
    backgroundColor: "orange",
  },
];

// Konversi data penjualan ke format yang digunakan oleh Chart.js
var chartData = {
  labels: ["2015", "2016"],
  datasets: sales.map((countryData, index) => ({
    label: countryData.country,
    data: countryData.values,
    // borderColor: countryData.backgroundColor, Using the specified backgroundColor for each country
    borderWidth: 1,
    fill: false,
  })),
};

Top5Product();
age();
