
// max delay time
const MAX_DELAY_TIME = 1;
let delay: DelayNode | null = null;
let dry: GainNode | null = null;
let wet: GainNode | null = null;
let feedback: GainNode | null = null;


const useDelay = (
  audioContext: AudioContext,
  source: AudioNode,
  delayState: {
    connect: boolean,
    delayTime: number,
    dry: number,
    wet: number,
    feedback: number
  }):AudioNode => {
  if (delayState.connect) {

    // if nodes is null, init setting
    if (delay === null) delay = audioContext.createDelay(MAX_DELAY_TIME);
    if (dry === null) dry = audioContext.createGain();
    if (wet === null) wet = audioContext.createGain();
    if (feedback === null) feedback = audioContext.createGain();


    // delay settings
    delay.delayTime.value = delayState.delayTime;
    dry.gain.value = delayState.dry;
    wet.gain.value = delayState.wet;
    feedback.gain.value = delayState.feedback;

    // source -> dry -> destination
    source.connect(dry);

    // source -> delay -> wet -> destination
    source.connect(delay);
    delay.connect(wet);
    wet.connect(audioContext.destination);

    // delay -> feedback -> destination (delay -> feedback ...) loop
    delay.connect(feedback);
    feedback.connect(delay);

    return dry;
  }
  return source;

};

export {
  useDelay
};
