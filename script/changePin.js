document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#pin").addEventListener("click", async (e) => {
    e.preventDefault();

    const oldPin = document.querySelectorAll(".pin input")[0].textContent;

    if (!checkOldPin(oldPin)) {
      alert("Neispravan pin");
      return;
    }

    const newPin = document.querySelectorAll(".pin input")[1].textContent;

    if (!correctPin(newPin)) {
      alert("Neispravan pin");
      return;
    }

    addNewPin(newPin);
  });
});

const filePath = "../data.json";
const checkOldPin = (pin) => {
  return new Promise((resolve) => {
    fetch(filePath)
      .then((r) => r.json())
      .then((json) => {
        resolve(json.pin === pin);
      });
  });
};

function correctPin(pin) {
  let len = 0;
  for (const char in pin) {
    len++;
    if (isNaN(parseInt(char))) {
      alert("Neispravan pin");
      return false;
    }
  }
  if (len < 4 || len > 8) {
    alert("Neispravan pin");
    return false;
  }
  return true;
}

function addNewPin(newPin) {
  const fs = require("fs");
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      // Parse the JSON data into a JavaScript object
      const jsonData = JSON.parse(data);

      // Modify the date value
      jsonData.pin = newPin; // Assuming you want to change the date of the first show

      // Convert the JavaScript object back to JSON
      const updatedJsonData = JSON.stringify(jsonData, null, 2);

      // Write the updated JSON back to the file
      fs.writeFile("data.json", updatedJsonData, "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("Date value updated successfully!");
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
}
