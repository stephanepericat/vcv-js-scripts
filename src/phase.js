let phase = 0;

const process = block => {
  const { bufferSize, knobs, outputs, sampleTime } = block;
  const freq = 261.6256 * knobs[0];

  for (let i = 0; i < bufferSize; i++) {
    phase += sampleTime * freq;
    phase %= 1;

    outputs[0][i] = phase * 10 - 5;
  }

  display("Frequency: " + freq.toFixed(2));
};
