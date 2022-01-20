// const Tesseract = require('tesseract.js');
// const { createWorker, setLogging } = Tesseract;
// const fs = require('fs');
// const ImageModel = require('../models/Image.model');
// const { getTime } = require('../helper/support');

// setLogging(false);

// const textFormImage = async (file, language, sender) => {
//    let text = null;
//    console.log('file get text: ', file);
//    const image_path = fs.readFileSync(`${file.path}`);

//    const worker = createWorker({
//       logger: m => console.log(`${Math.floor(m.progress * 100)}%`)
//    });

//    await worker.load();
//    await worker.loadLanguage(`${language}+chi_tra`);
//    await worker.initialize(`${language}+chi_tra`);
//    await worker.recognize(image_path).then(result => {
//       text = result.data.text;
//       console.log('result: ' + text);
//    });
//    const { data: pdfData } = await worker.getPDF('ORC result');
//    await worker.terminate();

//    //save resual in public folder
//    // const pathFile = {
//    //    pdf: `http://localhost:3000/pdf/${file.originalname}.pdf`,
//    //    txt: `http://localhost:3000/pdf/${file.originalname}.txt`
//    // };
//    fs.writeFileSync(`./public/pdf/${file.originalname}.pdf`, Buffer.from(pdfData));
//    fs.writeFileSync(`./public/txt/${file.originalname}.txt`, text);
//    console.log('handle and save resual with type .pdf and .txt');

//    // const pathImage = `http://localhost:3000/public/uploads/${file.originalname}`; // không cần có thể xử lý client

//    //save in database
//    const final_image = new ImageModel({
//       filename: file.originalname,
//       content: text,
//       language: language,
//       sender: sender,
//       create_date: `${getTime()}`
//    });
//    final_image.save();
//    return {
//       text,
//       filename: file.originalname
//    };
// };

// module.exports = textFormImage;
