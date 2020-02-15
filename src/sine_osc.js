config.frameDivider = 1;
config.bufferSize = 1;

let phase = 0;
const channel = 0;
const C4 = 261.6256;

const setPhase = (currentPhase, delta) => {
  currentPhase += delta;
  currentPhase %= 1;
  return currentPhase;
};

const sineOsc = (pitch, base, divider, sampleTime) => {
  const freq = base * Math.pow(2, pitch);
  const delta = divider * sampleTime * freq;
  phase = setPhase(phase, delta);
  return Math.sin(2 * Math.PI * phase) * 5;
};

const process = block => {
  const { bufferSize, knobs, outputs, sampleTime } = block;
  const pitch = knobs[channel];
  const signal = sineOsc(pitch, C4, config.frameDivider, sampleTime);

  for (let i = 0; i < bufferSize; i++) {
    outputs[channel][i] = signal;
  }
};
