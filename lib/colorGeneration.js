/**
 * Generate an array of colors 
 * @param {number} count How many colors we want to generate?
 * @param {object} options An object with optional parameters 
 * @param {number} options.saturation
 * @param {boolean} options.consistentSaturation Same saturation for all the colors (default)
 * @param {number} options.minSaturation
 * @param {number} options.maxSaturation
 * @param {number} options.luminosity
 * @param {boolean} options.consistentLuminosity Same luminosity for all the colors (default)
 * @param {number} options.minLuminosity
 * @param {number} options.maxLuminosity
 * @returns 
 */
const generateRandomColors = (count = 10, { 
    saturation,
    consistentSaturation = true,
    minSaturation = 0,
    maxSaturation = 100,
    luminosity,
    consistentLuminosity = true,
    minLuminosity = 0,
    maxLuminosity = 100,
} = {}) => {
   
    // Min and max included
    const getRandomInt = (min, max) => 
        Math.floor(Math.random() * (max - min + 1) + min);

    const angle = 360 / count;
    const minAngle = getRandomInt(angle / 6, angle / 3); // min angle between the previous color and the current one to be generated

    const hues = [...Array(count)]
        .map((_, i, arr) => {
            const min = i * angle;
            const max = min + angle;
            const hue = getRandomInt(min, max); // Randomize hues
            if (i === 0) {
                return hue;
            }
            // Prevent colors from being too close to each other
            const prevHue = arr[i - 1];
            const distance = hue - prevHue;
            if (distance < minAngle) {
                return prevHue + minAngle; // Make sure that we have at least the minimum angle applied
            }
            return hue;
        });

    const randomSaturation = getRandomInt(minSaturation, maxSaturation);
    const randomLuminosity = getRandomInt(minLuminosity, maxLuminosity);

    return hues.map(hue => {
        const finalSaturation = consistentSaturation
            ? saturation || randomSaturation // randomSaturation is calculated only once since we want a consistent saturation
            : getRandomInt(minSaturation, maxSaturation); // if not consistent we randomize the saturation for each color

        const finalLuminosity = consistentLuminosity
            ? luminosity || randomLuminosity
            : getRandomInt(minLuminosity, maxLuminosity) // if not consistent we randomize the luminosity for each color

        return `hsl(${hue}, ${finalSaturation}, ${finalLuminosity})`;
    });
};
