const { Jimp } = require('jimp');

async function processImage(inputPath, outputPath) {
    try {
        const image = await Jimp.read(inputPath);
        console.log(`Processing ${inputPath}...`);

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
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
    await processImage('C:/Users/chair/.gemini/antigravity/brain/5348349a-fe86-470a-ad7d-9a630d995d0e/toy_drum_1776076355399.png', 'src/assets/toy_drum_transparent.png');
    await processImage('C:/Users/chair/.gemini/antigravity/brain/5348349a-fe86-470a-ad7d-9a630d995d0e/color_palette_1776076377593.png', 'src/assets/color_palette_transparent.png');
}

main();
