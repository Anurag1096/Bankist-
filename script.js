'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(val => val.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// The following line of code will select all the elements which have class name of section
const allSection = document.querySelectorAll('.section');

console.log(allSection);
console.log(document.documentElement);
console.log(document.head);
document.querySelector('testimonial');

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  "we use cookied for improve funcnality and analytics <button class = 'btn btn-close-cookie'>Got it!</button>";

header.prepend(message);
header.append(message);

document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '104%';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);

// Data attributes
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add('e', 'yt');
logo.classList.remove('t');
logo.classList.toggle('ee');
logo.classList.contains('er');

// Dont use cause it will override all the existing classes and it will only be applied on an single class.

logo.className = 'Anurag';

// Adding smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // Bellow code gets the coordinates of the div in the section variable
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);
  console.log(e.target.getBoundingClientRect());
  // To see the current scroll position
  console.log('Current scroll X/y', window.pageXOffset, pageYOffset);
  // To see the current height and width
  console.log(
    'current height and width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// const navLink1 = document.querySelector('.fea');
// const navLink2 = document.querySelector('.ope');
// const navLink3 = document.querySelector('.tes');
// const section2 = document.querySelector('#section--2');
// const section3 = document.querySelector('#section--3');

// smooth scrolling in navbar
// navLink1.addEventListener('click', function (e) {
//   e.preventDefault();
//   // section1.scrollIntoView({ behavior: 'smooth' });
//   this.style.backgroundColor = randomColour();
//   console.log('feature', e.target);
//   // To stop the bubbling effect
//   e.stopPropagation();
// });
// In the following code you select all the class with the name of  nav__link and you loop over it .

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// Using Event delegation in page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed components

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');
// Using event delegation and dom Traversing

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause this help in preventing the error which arises when we click outside the tabs
  if (!clicked) return;
  // Remove classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Active tab
  clicked.classList.add('operations__tab--active');
  // Activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const hoverFade = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = 0.5;
  }
};

nav.addEventListener('mouseover', hoverFade.bind(0.5));

nav.addEventListener('mouseout', hoverFade.bind(1));

// Sticky navigation
// const initialCord = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY >= initialCord.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Sticky navigation using Inter section observer API.

const header1 = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});

headerObserver.observe(header1);

// Reveling elements when scrolling

const allSection1 = document.querySelectorAll('.section');

const revelSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserve = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
});

allSection1.forEach(function (section) {
  sectionObserve.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const lazyLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(function (imgTar) {
  imgObserver.observe(imgTar);
});

// /////////////////////////////////////////////
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColour();
//   console.log('Link', e.target);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   e.preventDefault();
// this.style.backgroundColor = randomColour();
// });

// navLink2.addEventListener('click', function (e) {
//   e.preventDefault();
//   section2.scrollIntoView({ behavior: 'smooth' });
// });

// navLink3.addEventListener('click', function (e) {
//   e.preventDefault();
//   section3.scrollIntoView({ behavior: 'smooth' });
// });

// List of different events
const h1 = document.querySelector('h1');

const alertH1 = function () {
  alert('ghwogh');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// generating random colour
const randInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min + 1);

const randomColour = () =>
  `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;

console.log(randomColour(0, 255));

// In an event handler the (this) keyword points to the element on which the keyword is attached

const h1x = document.querySelector('h1');
console.log(h1x.querySelectorAll('.highlight'));

// changing the closest elements style
// The closest method finds the parent element far above the dom tree
// h1x.closest('.header').style.background = 'var(--gradient-secondary)';
