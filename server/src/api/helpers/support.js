//todo get current time
const getTime = () => {
   let date = new Date();
   const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
   const day = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  //  const day = `${date.toLocaleDateString()}`;
   return `${day} ${time}`;
};

// console.log(getTime()); // ex: 19:51:56 11/16/2021

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
   let shortValue = parseFloat(value / 1000 ** suffixNum);
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
const ordinalSuffix = number => {
   if (number <= 0) {
      return `number parameter is integer!`;
   }
   if (number > 3) {
      return `${number}th`;
   }
   const j = number % 10;
   const arr = ['', 'st', 'nd', 'rd'];
   return `${number}${arr[j]}`;
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
      return `max > min!`;
   }
   min = Math.ceil(min);
   max = Math.ceil(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
};

// for (let i = 1; i < 10; i++) {
//    console.log(getRandomInt(1, 10));
// }

module.exports = {
   getTime,
   numberWithCommas,
   compactNumber,
   ordinalSuffix,
   getRandomInt
};
