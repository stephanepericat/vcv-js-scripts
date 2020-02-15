/**
 * A simple demo displaying the options of the block object
 * @param {Object} block
 */
const process = block => {
  const options = [];

  for (let key in block) {
    options.push(key);
  }

  display(`Options:${options.join(",")}`);
};
