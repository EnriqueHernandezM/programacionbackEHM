const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
process.on("message", (msg) => {
  let sum = [];
  let operador = msg.limite || 100000000;
  for (let i = 0; i < operador; i++) {
    sum.push(random(1, 1000));
  }
  process.send({ type: "sum", data: sum });
});
