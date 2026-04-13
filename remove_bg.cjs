const { Jimp } = require('jimp');

async function processImage(inputPath, outputPath) {
    try {
        const image = await Jimp.read(inputPath);
        console.log(`Processing ${inputPath}...`);
        
        // Remove white background (make transparent)
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            if (r > 240 && g > 240 && b > 240) {
                this.bitmap.data[idx + 3] = 0;
            } else if (r > 220 && g > 220 && b > 220) {
                const avg = (r + g + b) / 3;
                const alpha = Math.max(0, 255 - (avg - 220) * (255 / 35));
                this.bitmap.data[idx + 3] = alpha;
            }
        });
        
        await image.write(outputPath);
        console.log(`Saved to ${outputPath}`);
    } catch (err) {
        console.error(`Error processing ${inputPath}:`, err);
    }
}

async function main() {
    await processImage('C:/Users/chair/.gemini/antigravity/brain/5348349a-fe86-470a-ad7d-9a630d995d0e/toy_rocket_1776075889614.png', 'src/assets/toy_rocket_transparent.png');
    await processImage('C:/Users/chair/.gemini/antigravity/brain/5348349a-fe86-470a-ad7d-9a630d995d0e/cute_monkey_1776075935855.png', 'src/assets/cute_monkey_transparent.png');
    await processImage('C:/Users/chair/.gemini/antigravity/brain/5348349a-fe86-470a-ad7d-9a630d995d0e/toy_puzzle_1776075961315.png', 'src/assets/toy_puzzle_transparent.png');
}

main();
