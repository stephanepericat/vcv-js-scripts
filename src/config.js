/**
 * A simple demo displaying the options of the config object
 */
const process = () => {
  const options = [];

  for (let key in config) {
    options.push(key);
  }

  display(`Options:${options.join(",")}`);
};
