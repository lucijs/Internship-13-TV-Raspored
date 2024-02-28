document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#pin").addEventListener("click", async (e) => {
    e.preventDefault();

    const oldPin = document.querySelectorAll(".pin input")[0].value;

    const storedPin = localStorage.getItem("parental-pin");
    if (oldPin !== storedPin) {
      alert("Neispravan stari PIN.");
      return;
    }

    const newPin = document.querySelectorAll(".pin input")[1].value;
    if (!correctPin(newPin)) {
      alert.log(
        "Neispravan unos. Pin mora zadovoljiti formu da se sastoji od 4 do 8 znamenki!"
      );
      return;
    }

    localStorage.setItem("parental-pin", newPin);
    document.querySelectorAll(".pin input")[1].value = "";
    document.querySelectorAll(".pin input")[0].value = "";
    alert("Uspješno ste promjenili pin");
  });
});

function correctPin(pin) {
  return /^\d{4,8}$/.test(pin);
}
