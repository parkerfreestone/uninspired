const titles = [
  "uninspired",
  "burnt-out",
  "disillusioned",
  "unmotivated",
  "apathetic",
  "disengaged",
  "jaded",
  "demoralized",
  "deflated",
  "listless",
  "stagnant",
  "directionless",
  "unfulfilled",
  "overwhelmed",
  "mechanical",
  "routine-bound",
  "checked-out",
  "bored",
];

const getRandomTitle = () => {
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const title = document.querySelector(".title");

  title.textContent = `${randomTitle}.xyz`;
  document.title = `${randomTitle}.xyz`;
};
