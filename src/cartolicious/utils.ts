export const randomRGBAGenerator = (): [number, number, number, number] => {
  function randColor() {
    return Math.ceil(Math.random() * 255);
  }

  return [randColor(), randColor(), randColor(), 1];
};
