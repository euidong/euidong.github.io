const sharp = require("sharp");
const [_, __, filepath, width, height] = process.argv;

const outputDir = "./public/images";

if (width === undefined || isNaN(Number(width))) {
  console.log("wrong width");
  process.exit(1);
}

if (height !== undefined) {
  if (isNaN(Number(height))) {
    console.log("wrong height");
    process.exit(1);
  }
}

let f = filepath.split("/");
const filename = f[f.length - 1];

sharp(filepath)
  .resize(Number(width), height && Number(height), "cover")
  // .flatten({ background: { r: 255, g: 255, b: 255 } })
  .toFile(`${outputDir}/${filename}`, (err, info) => {
    if (err) {
      console.log("❌ Fail");
      console.log(err);
    } else {
      console.log("✅ Success");
      console.log(info);
    }
  });
