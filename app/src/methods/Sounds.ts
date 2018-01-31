// import library
import axios from 'axios';


// get AudioBuffer
const getAudioBuffer = (audioContext: AudioContext, uri: string, cb: (buffer:AudioBuffer) => void):void => {
  axios(uri, { responseType: 'arraybuffer' })
    .then(({ data }) => audioContext.decodeAudioData(
      data, (buffer: AudioBuffer) => { cb(buffer); }));
};

// create sound source
// use callbback function for mobile!!
const createSoundSource = (audioContext: AudioContext, buffer: AudioBuffer):AudioBufferSourceNode => {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  return source;
};

export {
  getAudioBuffer,
  createSoundSource
};

