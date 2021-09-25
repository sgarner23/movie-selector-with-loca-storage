const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const container = document.querySelector(".seat-container");
const seatCount = document.getElementById("count");
const movieSelection = document.getElementById("movie-select");
const cost = document.getElementById("cost");

populateUI();

function updateSeatCount() {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  const count = selectedSeats.length - 1;

  const total = count * movieSelection.value;

  const indexOfSelectedSeats = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  indexOfSelectedSeats.splice(0, 1);

  localStorage.setItem("selectedSeats", JSON.stringify(indexOfSelectedSeats));

  seatCount.textContent = count;
  cost.textContent = total;
  let jsonCost = cost.textContent;

  localStorage.setItem("cost", JSON.stringify(jsonCost));
  localStorage.setItem("count", JSON.stringify(count));
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const currentCost = JSON.parse(localStorage.getItem("cost"));
  const currentCount = JSON.parse(localStorage.getItem("count"));

  cost.textContent = currentCost;
  count.textContent = currentCount;

  if (selectedSeats.length > 0 && selectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  console.log(selectedSeats);
}

movieSelection.addEventListener("change", (e) => {
  updateSeatCount();
});

container.addEventListener("click", (e) => {
  if (!e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    updateSeatCount();
  }
});
