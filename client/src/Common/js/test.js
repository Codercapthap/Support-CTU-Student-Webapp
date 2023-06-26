// const showCurentTimeZones = timezone => {
//    let date = new Date();
//    let strTime = date.toLocaleTimeString('en-US', {
//       timeZone: `${timezone}`
//    });
//    console.log(timezone, strTime);
// };

// showCurentTimeZones('Asia/Ho_Chi_Minh');
// showCurentTimeZones('America/Los_Angeles');

const image = '../../Assets/images/card-img.jpg';
const reader = new FileReader(image);
const str = reader.readAsDataURL();
console.log(str);
