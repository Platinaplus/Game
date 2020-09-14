const cards = Array.from(document.querySelectorAll(".card"));
let flag = (lastFlag = gameOver = hasRotatedCard = false);
let firstCard, secondCard, firstCardMem, secondCardMem;
let modal = document.querySelector(".modal_overlay");
let i = clickCount = 0;

const rotateCard = (event) => {
  clickCount = clickCount +1;
  if (clickCount == 1) {myTimer()}
  const target1 = event.target;
  if (target1.classList.contains("mem")) return;
  if (flag) {
    cards.forEach((card) => {
      if (card.lastElementChild.style.backgroundColor == "rgb(244, 67, 54)") {
        card.classList.remove("anime");
        card.lastElementChild.style.backgroundColor = "white";
      }
    });
  }
  if (gameOver) return;
  const target = event.target.parentElement;
  if (target === firstCard) return;
  target.classList.add("anime");
  if (!hasRotatedCard) {
    hasRotatedCard = true;
    firstCard = target;
    firstCardMem = target.lastElementChild;
  } else {
    hasRotatedCard = false;
    secondCard = target;
    secondCardMem = target.lastElementChild;
    checkEmoji();
  }
};

const cardDisabled = () => {
  setTimeout(() => {
    firstCardMem.style.backgroundColor = "#5AD66F";
    secondCardMem.style.backgroundColor = "#5AD66F";
  }, 200);
  firstCard.removeEventListener("click", rotateCard);
  secondCard.removeEventListener("click", rotateCard);
  i = i + 1;
  if (i == 6) {
    lastFlag = true;
    modal.style.visibility = "visible";
  }
};

const notRotatedCard = () => {
  flag = true;
  gameOver = true;
  setTimeout(() => {
    reset();
  }, 500);
  setTimeout(() => {
    firstCardMem.style.backgroundColor = "#F44336";
    secondCardMem.style.backgroundColor = "#F44336";
  }, 200);
};

const checkEmoji = () => {
  const isEqual = firstCard.dataset.emoji === secondCard.dataset.emoji;
  isEqual ? cardDisabled() : notRotatedCard();
};

cards.forEach((card) => {
  card.addEventListener("click", rotateCard);
  const random = Math.floor(Math.random() * cards.length);
  card.style.order = random;
});

const reset = () => {
  gameOver = hasRotatedCard = false;
  firstCard = secondCard = null;
};

const myTimer = () => {
  let time = document.querySelector(".timer");
  let date = new Date();
  date.setSeconds(00);
  date.setMinutes(01);
  timer = setInterval(() => {
    date.setSeconds(date.getSeconds() - 1);

    if (date.getSeconds() < 10) {
      time.innerHTML = "0" + date.getMinutes() + ":" + "0" + date.getSeconds();
    } else {
      time.innerHTML = "0" + date.getMinutes() + ":" + date.getSeconds();
    }
    if (date.getSeconds() == 0) {
      clearInterval(timer);
      modal.style.visibility = "visible";
      document.getElementById("a").innerHTML = "L";
      document.getElementById("b").innerHTML = "o";
      document.getElementById("c").innerHTML = "s";
      document.getElementById("d").innerHTML = "e";
      document.querySelector(".button").innerHTML = "Try again";
    } else if (lastFlag) clearInterval(timer);
  }, 1000);
};

