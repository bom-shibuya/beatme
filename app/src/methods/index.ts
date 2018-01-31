import { getAudioBuffer, createSoundSource } from './Sounds';
import { useDistortion } from './Distortion';
import { useDelay } from './Delay';

const playSound = (
  audioContext: AudioContext,
  buffer: AudioBuffer,
  effectorState: any
) => {
  const source = createSoundSource(audioContext, buffer);
  let sound: AudioNode | null = null;

  // add compressor
  const compressor = audioContext.createDynamicsCompressor();
  source.connect(compressor);
  
  sound = useDistortion(
    audioContext,
    compressor,
    effectorState.distortion
  );

  sound = useDelay(
    audioContext,
    sound,
    effectorState.delay
  ).connect(audioContext.destination);

  source.start(0);
};


export default {
  getAudioBuffer,
  playSound
};
