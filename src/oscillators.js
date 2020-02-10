let phase = 0;

config.frameDivider = 1;
config.bufferSize = 512;

const process = block => {
  const { bufferSize, knobs, outputs, sampleRate, sampleTime } = block;

  const pitch = knobs[1] * 10 - 5;
  const freq = 261.6256 * Math.pow(2, pitch);
  const deltaPhase = config.frameDivider * sampleTime * freq;

  for (let i = 0; i < bufferSize; i++) {
    phase += deltaPhase;
    phase %= 1; // Wrap phase around range [0, 1]

    // noise output
    outputs[0][i] = Math.random() * 10.0 - 5.0;
    // sine output
    outputs[1][i] = Math.sin(2 * Math.PI * phase) * 5;
    // triangle output
    outputs[2][i] = Math.abs(((phase * 20.0) % 20.0) - 10.0) - 5.0;
    // square
    outputs[3][i] = phase >= 0.5 ? -5.0 : 5.0;
    // saw
    outputs[4][i] = Math.abs((phase * 10.0) % 10.0) - 5.0;
  }

  display(
    `BUFFER SIZE: ${bufferSize}\nSAMPLE RATE: ${sampleRate}\nFREQ: ${freq}`
  );
};
