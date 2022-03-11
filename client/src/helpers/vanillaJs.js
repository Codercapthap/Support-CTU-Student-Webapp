// Number ===========================================================================
//todo format number
const numberWithCommas = (number, separator = ',') => {
   const resuilt = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `${separator}`);

   return resuilt;
};

// console.log(numberWithCommas(123456)); // 123,456
// console.log(numberWithCommas(123456, '.')); // 123.456

//todo compactNumber (render view in watch video)
const compactNumber = value => {
   const suffixes = ['', 'k', 'm', 'b', 't'];
   let suffixNum = ~~(`${value}`.length / 3);
   let shortValue = value / 1000 ** suffixNum;
   if (shortValue <= 1) {
      shortValue *= 1000;
      suffixNum--;
   }
   const result = `${shortValue}${suffixes[suffixNum]}`;

   return result;
};

// console.log(compactNumber(10)); // 10
// console.log(compactNumber(100)); // 100
// console.log(compactNumber(1100)); //1.1k
// console.log(compactNumber(100100)); //100.1k
// console.log(compactNumber(99900)); // 99.9k
// console.log(compactNumber(22000000)); // 22m
// console.log(compactNumber(22200000)); //22.2m

// compactNumber
const ordinalSuffix = rank => {
   if (rank <= 0) {
      return `rank parameter is integer!`;
   }
   if (rank > 3) {
      return `${rank}th`;
   }
   const j = rank % 10;
   const arr = ['', 'st', 'nd', 'rd'];

   return `${rank}${arr[j]}`;
};

// console.log(ordinalSuffix(1)); // 1st
// console.log(ordinalSuffix(2)); // 2nd
// console.log(ordinalSuffix(3)); // 3rd
// console.log(ordinalSuffix(9)); // 9th
// console.log(ordinalSuffix(-1)); // number parameter is integer!
// console.log(ordinalSuffix(0)); // number parameter is integer!
// console.log(ordinalSuffix(10)); // 10th
// console.log(ordinalSuffix(11)); // 11th

//todo get random between min - max
const getRandomInt = (min, max) => {
   if (max <= min) {
      return -131313;
   }
   min = Math.ceil(min);
   max = Math.ceil(max);
   const result = Math.floor(Math.random() * (max - min + 1)) + min;

   return result;
};

// for (let i = 1; i < 10; i++) {
//    console.log(getRandomInt(1, 10));
// }

// HTML ==========================================================================
const encodeHTML = str => {
   return str.replace(/[^\w. ]/gi, c => '&#' + c.charCodeAt(0) + ';');
};

// app.innerHTML = encodeHTML('<img src="x" onerror="alert(1)">'); // <img src="x" onerror="alert(1)">

const decodeHTML = str => {
   const txt = document.createElement('textarea');
   txt.innerHTML = str;
   return txt.value;
};

// let decoded = decodeHTML('&lt;p&gt;In this course, you&amp;rsquo;ll learn:&lt;/p&gt;');
// Returns "<p>In this course, you'll learn:</p>"

// const getCookie = (name) => {
//    const value = '; ' + document.cookie;
//    const parts = value.split(`; ${name}=`);
//    const result = parts.pop().split(';').shift();

//    if (parts.length == 2) {
//       return result;
//    }
//    return `nothing in cookie ${name}`;
// };

// input: cookie_name -> output: value it

// String ===========================================================================
const shuffle = array => {
   let currentIndex = array.length;
   let temporaryValue, randomIndex;

   // While there remain elements to shuffle...
   while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }

   return array;
};

// let sandwiches = ['turkey', 'tuna', 'pb&j'];
// shuffle(sandwiches);
// console.log(sandwiches); // random array

// Time ===========================================================================
//todo get current time
const getTimestamp = () => {
   const date = new Date();
   const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
   const day = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
   //  const day = `${date.toLocaleDateString()}`;
   return `${day} ${time}`;
};

// console.log(getTime()); // ex: 19:51:56 11/16/2021

const getNextDay = dateName => {
   // The current day
   const date = new Date();
   const now = date.getDay();
   // Days of the week
   const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
   // The index for the day you want
   const day = days.indexOf(dateName.toLowerCase());
   // Find the difference between the current day and the one you want
   // If it's the same day as today (or a negative number), jump to the next week
   let diff = day - now;
   diff = diff < 1 ? 7 + diff : diff;
   // Get the timestamp for the desired day
   const nextDayTimestamp = date.getTime() + 1000 * 60 * 60 * 24 * diff;

   // Get the next day
   return new Date(nextDayTimestamp);
};

// Color ===========================================================================
//todo get random color
const getRandomColor = () => {
   const letters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   return color.toLowerCase();
};

const listColor = [
   '#fad06c',
   '#ff92a9',
   '#70c7e2',
   '#361041',
   '#f7f7ef',
   '#7f886b',
   '#8333ea',
   '#0d3745',
   '#be2623',
   '#ffc12e',
   '#c0ea6a',
   '#dfddc6',
   '#e96d72',
   '#c8d7d2',
   '#54486e',
   '#d9ef82',
   '#1f4171',
   '#9854cb',
   '#885574'
];

const themeColor = {
   dark: {
      primaryColor: '#34495e',
      secondaryColor: '#596275',
      fontColor: '#EFE1CE',
      bgColor: '#363945',
      headingColor: '#58B19F'
   },
   light: {
      primaryColor: '#064e48',
      secondaryColor: 'khaki',
      fontColor: '#424242',
      bgColor: '#d9eee1',
      headingColor: '#82b440'
   }
};

const varCSS = (name, value) => {
   if (name[0] != '-') name = '--' + name;
   if (value) document.documentElement.style.setProperty(name, value);
   return getComputedStyle(document.documentElement).getPropertyValue(name);
};

// ===========================================================================

module.exports = {
   numberWithCommas,
   compactNumber,
   ordinalSuffix,
   getRandomInt,
   encodeHTML,
   decodeHTML,
   shuffle,
   getTimestamp,
   getNextDay,
   getRandomColor,
   listColor,
   themeColor,
   varCSS
};
