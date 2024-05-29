// // Fetching bike sales data
let Rev = document.getElementById("Revenue"); // revenue
let prof = document.getElementById("profit"); // profit
let Isold = document.getElementById("Item-sold"); // item sold
function fetchDataAndCalculateTotals() {
  fetch("./data/productCategory.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log the data to check its structure

      if (!data.productCategory || !data.yearlyProfit || !data.yearlyItemSold) {
        throw new Error("Required properties are missing in the JSON data");
      }

      const totalRevenue = data.productCategory.reduce(
        (sum, sales) => sum + sales.revenue,
        0
      );
      const totalProfit = data.yearlyProfit.reduce(
        (sum, sales) => sum + sales.profit,
        0
      );
      const totalItemSold = data.yearlyItemSold.reduce(
        (sum, sales) => sum + sales.quantityOrdered,
        0
      );

      Rev.textContent = `$${totalRevenue}`;
      prof.textContent = `$${totalProfit}`;
      Isold.textContent = `${totalItemSold}`;

      console.log("Total Revenue:", totalRevenue);
      console.log("Total Profit:", totalProfit);
      console.log("Total Items Sold:", totalItemSold);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Call the function to fetch data and calculate totals

function country() {
  let countrySelect = document.getElementById("country");
  let yearSelect = document.getElementById("year");

  // Define a function to handle selection change
  function handleSelectionChange() {
    let total;
    let totalProf;
    let totalIsold;
    let selectedCountry = countrySelect.value;
    let selectedYear = yearSelect.value;
    console.log(`You selected ${selectedCountry} in ${selectedYear}`);
    if (!selectedCountry && !selectedYear) {
      fetchDataAndCalculateTotals();
    }
    if (selectedYear === "2015") {
      Rev.textContent = `$${6273281}`;
      prof.textContent = `$${2374621}`;
      Isold.textContent = `${84708}`;
    } else {
      Rev.textContent = `$${6621033}`;
      prof.textContent = `$${2598258}`;
      Isold.textContent = `${116107}`;
    }
    if (selectedCountry === "United Kingdom" && selectedYear === "2015") {
      console.log("It's UK 2015");
      Rev.textContent = `$${2220143}`;
      prof.textContent = `$${1014085}`;
      Isold.textContent = `${33439}`;
    } else if (selectedCountry === "France" && selectedYear === "2015") {
      console.log("It's UK 2015");
      Rev.textContent = `$${1871282}`;
      prof.textContent = `$${646498}`;
      Isold.textContent = `${26345}`;
    } else if (selectedCountry === "Germany" && selectedYear === "2015") {
      console.log("It's UK 2015");
      Rev.textContent = `$${1925113}`;
      prof.textContent = `$${714038}`;
      Isold.textContent = `24924`;
    } else if (
      selectedCountry === "United Kingdom" &&
      selectedYear === "2016"
    ) {
      console.log("It's UK 2016");
      Rev.textContent = `$${2600379}`;
      prof.textContent = `$${1103233}`;
      Isold.textContent = `43194`;
    } else if (selectedCountry === "France" && selectedYear === "2016") {
      console.log("It's France 2016");
      Rev.textContent = `$${1800511}`;
      prof.textContent = `$${635646}`;
      Isold.textContent = `36399`;
    } else if (selectedCountry === "Germany" && selectedYear === "2016") {
      console.log("It's Germany 2016");
      Rev.textContent = `$${2220143}`;
      prof.textContent = `$${859379}`;
      Isold.textContent = `36514`;
    } else {
      if (selectedCountry === "United Kingdom") {
        total = 2476886 + 2600379;
        totalProf = 1014085 + 1103233;
        totalIsold = 33439 + 43194;

        Rev.textContent = `$${total}`;
        prof.textContent = `$${totalProf}`;
        Isold.textContent = `${totalIsold}`;
      } else if (selectedCountry === "France") {
        total = 1871282 + 1800511;
        totalProf = 646498 + 635646;
        totalIsold = 26345 + 36399;

        Rev.textContent = `$${total}`;
        prof.textContent = `$${totalProf}`;
        Isold.textContent = `${totalIsold}`;
      } else if (selectedCountry === "Germany") {
        total = 1925113.0 + 2220143.0;
        totalProf = 714038.0 + 859379.0;
        totalIsold = 24924 + 36514;

        Rev.textContent = `$${total}`;
        prof.textContent = `$${totalProf}`;
        Isold.textContent = `${totalIsold}`;
      }
    }
  }

  // Add event listeners for both country and year selection
  countrySelect.addEventListener("change", handleSelectionChange);
  yearSelect.addEventListener("change", handleSelectionChange);
}

fetchDataAndCalculateTotals();
country();
