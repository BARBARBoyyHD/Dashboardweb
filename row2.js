// Common Line chart options
const lineCommonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Year",
      },
    },
    y: {
      beginAtZero: false, // Ensure the y-axis does not begin at zero
      min: "Revenue", // Start the y-axis at 4000
      title: {
        display: true,
        text: "Revenue",
      },
    },
  },
};

// Common Bar chart options
const barCommonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Category",
      },
    },
    y: {
      title: {
        display: true,
        text: "Revenue",
      },
    },
  },
};

// Filtering logic

// Filter Untuk Bar Chart
const filteringByCat = document.getElementById("filteringByCategories");
const inputCheckboxCategories = filteringByCat.querySelectorAll(
  "input[type='checkbox']"
);

// Filter Untuk Bar Chart
const filteringByYears = document.getElementById("filteringByYears");
const inputCheckboxYears = filteringByYears.querySelectorAll(
  "input[type='checkbox']"
);
// Filter Untuk Line Chart
const filteringByLineYears = document.getElementById("filteringByYear");
const inputCheckboxLineYears = filteringByLineYears.querySelectorAll(
  "input[type='checkbox']"
);

let selectedCategories = [];
let selectedYears = [];
let selectedLineYears = [];

displayCharts([], [], []);

// Add event listeners for all category checkboxes
inputCheckboxCategories.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.value);
    } else {
      const index = selectedCategories.indexOf(checkbox.value);
      if (index > -1) {
        selectedCategories.splice(index, 1);
      }
    }
    displayCharts(selectedCategories, selectedYears, selectedLineYears);
  });
});

// Add event listeners for all year checkboxes
inputCheckboxYears.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      selectedYears.push(checkbox.value);
    } else {
      const index = selectedYears.indexOf(checkbox.value);
      if (index > -1) {
        selectedYears.splice(index, 1);
      }
    }
    displayCharts(selectedCategories, selectedYears, selectedLineYears);
  });
});

// Add event listeners for all line chart year checkboxes
inputCheckboxLineYears.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      selectedLineYears.push(checkbox.value);
    } else {
      const index = selectedLineYears.indexOf(checkbox.value);
      if (index > -1) {
        selectedLineYears.splice(index, 1);
      }
    }
    displayCharts(selectedCategories, selectedYears, selectedLineYears);
  });
});

// Function to check all checkboxes by default
function checkAllCheckboxes() {
  inputCheckboxCategories.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));
  });
  inputCheckboxYears.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));
  });
  inputCheckboxLineYears.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));
  });
}

// Call the function to check all checkboxes by default
checkAllCheckboxes();

// Draw the charts by category and year
const barCtx = document.getElementById("myBarChart").getContext("2d");
const lineCtx = document.getElementById("myLineChart").getContext("2d");
let myBarChart;
let myLineChart;

function displayCharts(filteringProduct, filteringYears, filteringLineYears) {
  console.log("Re-rendering charts");
  fetch("./data/productCategory.json")
    .then((res) => res.json())
    .then((data) => {
      // Filter data by selected years
      const filteredByYears = data.productCategory.filter(
        (item) =>
          filteringYears.length === 0 || filteringYears.includes(item.year)
      );

      // Separate data for each year if both 2015 and 2016 are selected
      let aggregatedData2015 = [];
      let aggregatedData2016 = [];

      if (filteringYears.includes("2015")) {
        aggregatedData2015 = filteredByYears.filter(
          (item) => item.year === "2015"
        );
      }

      if (filteringYears.includes("2016")) {
        aggregatedData2016 = filteredByYears.filter(
          (item) => item.year === "2016"
        );
      }

      const aggregatedData = [...aggregatedData2015, ...aggregatedData2016];

      // Aggregate data by category
      const aggregatedDataByCategory = aggregatedData.reduce((acc, current) => {
        const category = acc.find((item) => item.label === current.label);
        if (category) {
          category[current.year] = current.revenue;
        } else {
          const newCategory = { label: current.label };
          newCategory[current.year] = current.revenue;
          acc.push(newCategory);
        }
        return acc;
      }, []);

      const labelsProductCategory = aggregatedDataByCategory.map(
        (cat) => cat.label
      );
      const revenue2015 = aggregatedDataByCategory.map(
        (cat) => cat["2015"] || 0
      );
      const revenue2016 = aggregatedDataByCategory.map(
        (cat) => cat["2016"] || 0
      );

      let filteredLabels = [];
      let filteredRevenue2015 = [];
      let filteredRevenue2016 = [];

      if (filteringProduct.length) {
        aggregatedDataByCategory.forEach((category) => {
          if (filteringProduct.includes(category.label)) {
            filteredLabels.push(category.label);
            filteredRevenue2015.push(category["2015"] || 0);
            filteredRevenue2016.push(category["2016"] || 0);
          }
        });
      } else {
        filteredLabels = labelsProductCategory;
        filteredRevenue2015 = revenue2015;
        filteredRevenue2016 = revenue2016;
      }

      // Draw Bar Chart
      if (myBarChart) {
        myBarChart.destroy();
      }
      myBarChart = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: filteredLabels,
          datasets: [
            {
              label: "Revenue 2015",
              data: filteredRevenue2015,
              backgroundColor: "rgba(241, 196, 15, 100)",
              borderColor: "rgba(211, 84, 0, 1)",
              borderWidth: 1,
            },
            {
              label: "Revenue 2016",
              data: filteredRevenue2016,
              backgroundColor: "rgba(210, 120, 13, 1)",
              borderColor: "rgba(291, 66, 0, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: barCommonOptions,
      });

      // Draw Line Chart
      if (myLineChart) {
        myLineChart.destroy();
      }

      // Aggregate yearly revenue data
      let yearlyRevenue = data.yearlyRevenue;
      if (filteringLineYears.length) {
        yearlyRevenue = yearlyRevenue.filter((item) =>
          filteringLineYears.includes(item.year)
        );
      }
      const lineLabels = yearlyRevenue.map((item) => item.year);
      const lineData = yearlyRevenue.map((item) => item.revenue);

      myLineChart = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: lineLabels,
          datasets: [
            {
              label: "Yearly Revenue",
              data: lineData,
              borderColor: "rgba(255, 165, 0, 1)", // Orange-yellow color
              backgroundColor: "rgba(255, 165, 0, 0.2)", // Lighter orange-yellow shade
              borderWidth: 2, // Increase line thickness
              tension: 1, // Add smoothness to the line
              spanGaps: false, // Ensure no gaps in data
            },
          ],
        },
        options: lineCommonOptions,
      });
    });
}
