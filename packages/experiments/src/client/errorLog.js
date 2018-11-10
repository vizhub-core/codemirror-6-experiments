export const errorLog = callback => error =>
  error ? console.log(error) : callback();
