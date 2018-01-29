/**
* https://stackoverflow.com/questions/7840347/web-audio-api-waveshapernode
* @param {number} amount 0 < amout < 1 distortion level
* @param {number} numberOfSample size of Float32Array
* @return {Float32Array|null} curver property
*/
const createCurveForDistortion = (amount: number, numberOfSample: number): Float32Array | null => {
  if (amount > 0 && amount < 1) {
    const curves = new Float32Array(numberOfSample);
    const k = (2 * amount) / (1 - amount);
    for (let i:number = 0; i < numberOfSample; i += 1) {
      // LINEAR INTERPOLATION: x := (c - a) * (z - y) / (b - a) + y
      // a = 0, b = 2048, z = 1, y = -1, c = i
      const x = (((i - 0) * (1 - (-1))) / (numberOfSample - 0)) + (-1);
      curves[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
    }
    return curves;
  }
  return null; // default value
};

const useDistortion = (
  audioContext: AudioContext, source: AudioNode, distortionState: {
    connect: boolean,
    level: number
  }):void => {
  const distortion = audioContext.createWaveShaper();
  source.connect(distortion);
  distortion.connect(audioContext.destination);
  // 配列のサイズだけどあまり影響ないのでとりあえず4096
  const NUM_SAMPLES: number = 4096;
  distortion.curve = createCurveForDistortion(
    distortionState.level,
    NUM_SAMPLES
  );
};

export default {
  useDistortion
};
