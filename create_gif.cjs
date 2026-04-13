const { Jimp } = require('jimp');
const GIFEncoder = require('gif-encoder-2');
const fs = require('fs');

async function createMonkeyGif() {
  console.log("Creating monkey gif...");
  const width = 300;
  const height = 300;
  
  const encoder = new GIFEncoder(width, height, 'neuquant', true); 
  encoder.createReadStream().pipe(fs.createWriteStream('src/assets/monkey.gif'));
  
  encoder.start();
  encoder.setRepeat(0);   
  encoder.setDelay(80);   
  encoder.setTransparent(0x00000000); 

  const monkey = await Jimp.read('src/assets/cute_monkey_transparent.png');
  monkey.resize({ w: 200 }); 
  
  const frames = 15;
  for (let i = 0; i < frames; i++) {
    const frame = new Jimp({ width, height, color: 0x00000000 }); 
    const yOffset = Math.sin((i / frames) * Math.PI * 2) * 15 + 25; 
    
    // add minor rotation
    const rot = Math.cos((i / frames) * Math.PI * 2) * 5;
    const clonedMonkey = monkey.clone().rotate(rot); 
    
    const posX = (width - clonedMonkey.bitmap.width) / 2;
    frame.composite(clonedMonkey, posX, yOffset);
    
    encoder.addFrame(frame.bitmap.data);
  }
  
  encoder.finish();
  console.log("Done creating monkey.gif");
}
createMonkeyGif().catch(console.error);
