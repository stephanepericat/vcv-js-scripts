let phase = 0;

const process = block => {
  for (let i = 0; i < block.bufferSize; i++) {
    phase += block.sampleTime  * 20;

    if(phase > 1) {
      phase -= 1;
    }

    block.outputs[0][i] = phase * 5;
  }
}