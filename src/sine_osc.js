config.frameDivider = 1;
config.bufferSize = 512;

let phase = 0;
const channel = 0;
const C4 = 261.6256;

const setPhase = (currentPhase, delta) => {
  currentPhase += delta;
  currentPhase %= 1;

  return currentPhase;
};

const cvToFrequency = (cv, base = C4) => base * Math.pow(2, cv);
const freqToDelta = (freq, sampleTime, divider = config.frameDivider) =>
  divider * sampleTime * freq;

const sineOsc = (pitch, sampleTime) => {
  const freq = cvToFrequency(pitch);
  const delta = freqToDelta(freq, sampleTime);
  phase = setPhase(phase, delta);

  return Math.sin(2 * Math.PI * phase) * 5;
};

const process = block => {
  const { bufferSize, knobs, outputs, sampleTime } = block;
  const pitch = knobs[channel];

  for (let i = 0; i < bufferSize; i++) {
    outputs[channel][i] = sineOsc(pitch, sampleTime);
  }
};
