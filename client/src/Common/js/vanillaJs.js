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

// check email valid
const emailValid = email => {
   let regex =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (regex.test(email)) {
      return true;
   } else if (email === '') {
      return false; // or more
   } else {
      return false;
   }
};
// console.log(emailValid('nam2001@gmail.com'));
// console.log(emailValid('nam2001gmail.com'));
// console.log(emailValid(''));

// check password valid
/**
 * rule:
 * - Phải có độ dài hơn 8
 * - Phải có từ viết Hoa.
 * - Phải có số
 */
const passwordValid = password => {
   let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
   if (regex.test(password)) {
      return true;
   } else if (password === '') {
      return false; // or more
   } else {
      return false;
   }
};

const setLocalStorageItem = (key, obj) => {
   // false
   // hanle obj...
   // parser to string
   const newObj = JSON.stringify(obj);
   localStorage.setItem(key, newObj);
};

const getLocalStorageItem = key => {
   // false
   const temp = localStorage.getItem(key);
   const obj = JSON.parse(temp);
   // hanle obj...
   return obj;
};

const generageTime = timestamp => {
   const data = new Date(timestamp);
   const result = `${data.getDay()}/${data.getMonth() + 1}/${data.getFullYear()}`;
   // console.log(result);
   return result;
};

const currentTime = (elemId = 'show-current-clock', wall = '/') => {
   let date = new Date();
   let hh = date.getHours();
   let mm = date.getMinutes();
   let ss = date.getSeconds();
   let session = 'AM';

   if (hh === 0) {
      hh = 12;
   }
   if (hh > 12) {
      hh = hh - 12;
      session = 'PM';
   }

   hh = hh < 10 ? `0${hh}` : hh;
   mm = mm < 10 ? `0${mm}` : mm;
   ss = ss < 10 ? `0${ss}` : ss;

   const time = `${hh}${wall}${mm}${wall}${ss}${wall}${session}}`;

   document.getElementById(elemId).innerText = time;
};

// example: currentTime();
/**
 *    let t = setTimeout(function () {
      currentTime();
      }, 1000);
      clearTimeout(t);
 */

const listTimeZones = [
   'Europe/Andorra',
   'Asia/Dubai',
   'Asia/Kabul',
   'Europe/Tirane',
   'Asia/Yerevan',
   'Antarctica/Casey',
   'Antarctica/Davis',
   'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
   'Antarctica/Mawson',
   'Antarctica/Palmer',
   'Antarctica/Rothera',
   'Antarctica/Syowa',
   'Antarctica/Troll',
   'Antarctica/Vostok',
   'America/Argentina/Buenos_Aires',
   'America/Argentina/Cordoba',
   'America/Argentina/Salta',
   'America/Argentina/Jujuy',
   'America/Argentina/Tucuman',
   'America/Argentina/Catamarca',
   'America/Argentina/La_Rioja',
   'America/Argentina/San_Juan',
   'America/Argentina/Mendoza',
   'America/Argentina/San_Luis',
   'America/Argentina/Rio_Gallegos',
   'America/Argentina/Ushuaia',
   'Pacific/Pago_Pago',
   'Europe/Vienna',
   'Australia/Lord_Howe',
   'Antarctica/Macquarie',
   'Australia/Hobart',
   'Australia/Currie',
   'Australia/Melbourne',
   'Australia/Sydney',
   'Australia/Broken_Hill',
   'Australia/Brisbane',
   'Australia/Lindeman',
   'Australia/Adelaide',
   'Australia/Darwin',
   'Australia/Perth',
   'Australia/Eucla',
   'Asia/Baku',
   'America/Barbados',
   'Asia/Dhaka',
   'Europe/Brussels',
   'Europe/Sofia',
   'Atlantic/Bermuda',
   'Asia/Brunei',
   'America/La_Paz',
   'America/Noronha',
   'America/Belem',
   'America/Fortaleza',
   'America/Recife',
   'America/Araguaina',
   'America/Maceio',
   'America/Bahia',
   'America/Sao_Paulo',
   'America/Campo_Grande',
   'America/Cuiaba',
   'America/Santarem',
   'America/Porto_Velho',
   'America/Boa_Vista',
   'America/Manaus',
   'America/Eirunepe',
   'America/Rio_Branco',
   'America/Nassau',
   'Asia/Thimphu',
   'Europe/Minsk',
   'America/Belize',
   'America/St_Johns',
   'America/Halifax',
   'America/Glace_Bay',
   'America/Moncton',
   'America/Goose_Bay',
   'America/Blanc-Sablon',
   'America/Toronto',
   'America/Nipigon',
   'America/Thunder_Bay',
   'America/Iqaluit',
   'America/Pangnirtung',
   'America/Atikokan',
   'America/Winnipeg',
   'America/Rainy_River',
   'America/Resolute',
   'America/Rankin_Inlet',
   'America/Regina',
   'America/Swift_Current',
   'America/Edmonton',
   'America/Cambridge_Bay',
   'America/Yellowknife',
   'America/Inuvik',
   'America/Creston',
   'America/Dawson_Creek',
   'America/Fort_Nelson',
   'America/Vancouver',
   'America/Whitehorse',
   'America/Dawson',
   'Indian/Cocos',
   'Europe/Zurich',
   'Africa/Abidjan',
   'Pacific/Rarotonga',
   'America/Santiago',
   'America/Punta_Arenas',
   'Pacific/Easter',
   'Asia/Shanghai',
   'Asia/Urumqi',
   'America/Bogota',
   'America/Costa_Rica',
   'America/Havana',
   'Atlantic/Cape_Verde',
   'America/Curacao',
   'Indian/Christmas',
   'Asia/Nicosia',
   'Asia/Famagusta',
   'Europe/Prague',
   'Europe/Berlin',
   'Europe/Copenhagen',
   'America/Santo_Domingo',
   'Africa/Algiers',
   'America/Guayaquil',
   'Pacific/Galapagos',
   'Europe/Tallinn',
   'Africa/Cairo',
   'Africa/El_Aaiun',
   'Europe/Madrid',
   'Africa/Ceuta',
   'Atlantic/Canary',
   'Europe/Helsinki',
   'Pacific/Fiji',
   'Atlantic/Stanley',
   'Pacific/Chuuk',
   'Pacific/Pohnpei',
   'Pacific/Kosrae',
   'Atlantic/Faroe',
   'Europe/Paris',
   'Europe/London',
   'Asia/Tbilisi',
   'America/Cayenne',
   'Africa/Accra',
   'Europe/Gibraltar',
   'America/Godthab',
   'America/Danmarkshavn',
   'America/Scoresbysund',
   'America/Thule',
   'Europe/Athens',
   'Atlantic/South_Georgia',
   'America/Guatemala',
   'Pacific/Guam',
   'Africa/Bissau',
   'America/Guyana',
   'Asia/Hong_Kong',
   'America/Tegucigalpa',
   'America/Port-au-Prince',
   'Europe/Budapest',
   'Asia/Jakarta',
   'Asia/Pontianak',
   'Asia/Makassar',
   'Asia/Jayapura',
   'Europe/Dublin',
   'Asia/Jerusalem',
   'Asia/Kolkata',
   'Indian/Chagos',
   'Asia/Baghdad',
   'Asia/Tehran',
   'Atlantic/Reykjavik',
   'Europe/Rome',
   'America/Jamaica',
   'Asia/Amman',
   'Asia/Tokyo',
   'Africa/Nairobi',
   'Asia/Bishkek',
   'Pacific/Tarawa',
   'Pacific/Enderbury',
   'Pacific/Kiritimati',
   'Asia/Pyongyang',
   'Asia/Seoul',
   'Asia/Almaty',
   'Asia/Qyzylorda',
   'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
   'Asia/Aqtobe',
   'Asia/Aqtau',
   'Asia/Atyrau',
   'Asia/Oral',
   'Asia/Beirut',
   'Asia/Colombo',
   'Africa/Monrovia',
   'Europe/Vilnius',
   'Europe/Luxembourg',
   'Europe/Riga',
   'Africa/Tripoli',
   'Africa/Casablanca',
   'Europe/Monaco',
   'Europe/Chisinau',
   'Pacific/Majuro',
   'Pacific/Kwajalein',
   'Asia/Yangon',
   'Asia/Ulaanbaatar',
   'Asia/Hovd',
   'Asia/Choibalsan',
   'Asia/Macau',
   'America/Martinique',
   'Europe/Malta',
   'Indian/Mauritius',
   'Indian/Maldives',
   'America/Mexico_City',
   'America/Cancun',
   'America/Merida',
   'America/Monterrey',
   'America/Matamoros',
   'America/Mazatlan',
   'America/Chihuahua',
   'America/Ojinaga',
   'America/Hermosillo',
   'America/Tijuana',
   'America/Bahia_Banderas',
   'Asia/Kuala_Lumpur',
   'Asia/Kuching',
   'Africa/Maputo',
   'Africa/Windhoek',
   'Pacific/Noumea',
   'Pacific/Norfolk',
   'Africa/Lagos',
   'America/Managua',
   'Europe/Amsterdam',
   'Europe/Oslo',
   'Asia/Kathmandu',
   'Pacific/Nauru',
   'Pacific/Niue',
   'Pacific/Auckland',
   'Pacific/Chatham',
   'America/Panama',
   'America/Lima',
   'Pacific/Tahiti',
   'Pacific/Marquesas',
   'Pacific/Gambier',
   'Pacific/Port_Moresby',
   'Pacific/Bougainville',
   'Asia/Manila',
   'Asia/Karachi',
   'Europe/Warsaw',
   'America/Miquelon',
   'Pacific/Pitcairn',
   'America/Puerto_Rico',
   'Asia/Gaza',
   'Asia/Hebron',
   'Europe/Lisbon',
   'Atlantic/Madeira',
   'Atlantic/Azores',
   'Pacific/Palau',
   'America/Asuncion',
   'Asia/Qatar',
   'Indian/Reunion',
   'Europe/Bucharest',
   'Europe/Belgrade',
   'Europe/Kaliningrad',
   'Europe/Moscow',
   'Europe/Simferopol',
   'Europe/Kirov',
   'Europe/Astrakhan',
   'Europe/Volgograd',
   'Europe/Saratov',
   'Europe/Ulyanovsk',
   'Europe/Samara',
   'Asia/Yekaterinburg',
   'Asia/Omsk',
   'Asia/Novosibirsk',
   'Asia/Barnaul',
   'Asia/Tomsk',
   'Asia/Novokuznetsk',
   'Asia/Krasnoyarsk',
   'Asia/Irkutsk',
   'Asia/Chita',
   'Asia/Yakutsk',
   'Asia/Khandyga',
   'Asia/Vladivostok',
   'Asia/Ust-Nera',
   'Asia/Magadan',
   'Asia/Sakhalin',
   'Asia/Srednekolymsk',
   'Asia/Kamchatka',
   'Asia/Anadyr',
   'Asia/Riyadh',
   'Pacific/Guadalcanal',
   'Indian/Mahe',
   'Africa/Khartoum',
   'Europe/Stockholm',
   'Asia/Singapore',
   'America/Paramaribo',
   'Africa/Juba',
   'Africa/Sao_Tome',
   'America/El_Salvador',
   'Asia/Damascus',
   'America/Grand_Turk',
   'Africa/Ndjamena',
   'Indian/Kerguelen',
   'Asia/Bangkok',
   'Asia/Dushanbe',
   'Pacific/Fakaofo',
   'Asia/Dili',
   'Asia/Ashgabat',
   'Africa/Tunis',
   'Pacific/Tongatapu',
   'Europe/Istanbul',
   'America/Port_of_Spain',
   'Pacific/Funafuti',
   'Asia/Taipei',
   'Europe/Kiev',
   'Europe/Uzhgorod',
   'Europe/Zaporozhye',
   'Pacific/Wake',
   'America/New_York',
   'America/Detroit',
   'America/Kentucky/Louisville',
   'America/Kentucky/Monticello',
   'America/Indiana/Indianapolis',
   'America/Indiana/Vincennes',
   'America/Indiana/Winamac',
   'America/Indiana/Marengo',
   'America/Indiana/Petersburg',
   'America/Indiana/Vevay',
   'America/Chicago',
   'America/Indiana/Tell_City',
   'America/Indiana/Knox',
   'America/Menominee',
   'America/North_Dakota/Center',
   'America/North_Dakota/New_Salem',
   'America/North_Dakota/Beulah',
   'America/Denver',
   'America/Boise',
   'America/Phoenix',
   'America/Los_Angeles',
   'America/Anchorage',
   'America/Juneau',
   'America/Sitka',
   'America/Metlakatla',
   'America/Yakutat',
   'America/Nome',
   'America/Adak',
   'Pacific/Honolulu',
   'America/Montevideo',
   'Asia/Samarkand',
   'Asia/Tashkent',
   'America/Caracas',
   'Asia/Ho_Chi_Minh',
   'Pacific/Efate',
   'Pacific/Wallis',
   'Pacific/Apia',
   'Africa/Johannesburg'
];

const showCurentTimeZones = timezone => {
   let date = new Date();
   let strTime = date.toLocaleTimeString('en-US');
   console.log(timezone, strTime);
   // listTimeZone.forEach(timeZone => {
   //    let strTime = date.toLocaleString('en-US', {
   //       timeZone: `${timeZone}`
   //    });
   //    console.log(timeZone, strTime);
   // });
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
   varCSS,
   emailValid,
   passwordValid,
   setLocalStorageItem,
   getLocalStorageItem,
   generageTime
};
