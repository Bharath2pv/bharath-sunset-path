import { TweenMax, Quad, Expo } from "gsap";
const charming = require('charming')



export const animateTitles=()=> {
  const overlay = document.querySelector(".overlay");
  const title = document.querySelector(".contentTitle");
  charming(title);
  const titleLetters = Array.from(title.querySelectorAll("span"));

  TweenMax.to(overlay, 2, {
    ease: Quad.easeOut,
    opacity: 0,
  });

  TweenMax.set(titleLetters, { opacity: 0 });
  TweenMax.staggerTo(
    titleLetters,
    1.5,
    {
      ease: Expo.easeOut,
      startAt: { rotationX: -100, z: -1000 },
      opacity: 1,
      rotationX: 0,
      z: 0,
    },
    0.1
  );

  const glitch = (el, cycles) => {
    if (cycles === 0 || cycles > 3) return;
    TweenMax.set(el, {
      x: getRandomNumber(-20, 20),
      y: getRandomNumber(-20, 20),
      color: ["#f4d339", "#df003f", "#111111"][cycles - 1],
    });
    setTimeout(() => {
      TweenMax.set(el, { x: 0, y: 0, color: "#fff" });
      glitch(el, cycles - 1);
    }, getRandomNumber(20, 100));
  };

  const loop = (startAt) => {
    var timeout = setTimeout(() => {
      const titleLettersShuffled = titleLetters.sort(
        (a, b) => 0.5 - Math.random()
      );
      const lettersSet = titleLettersShuffled.slice(
        0,
        getRandomNumber(1, titleLetters.length + 1)
      );
      for (let i = 0, len = lettersSet.length; i < len - 1; ++i) {
        glitch(lettersSet[i], 3);
      }
      loop();
    }, startAt || getRandomNumber(500, 3000));
  };
  loop(1500);
}

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;