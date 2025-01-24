/* eslint-disable prettier/prettier */
export function wait(time: number = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(""), time);
  });
}
