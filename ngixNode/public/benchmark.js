//OJO! Correr uno a la vez y comentar el otro run
const autocannon = require("autocannon");
const { PassThrough } = require("stream");
function run(url) {
  const buf = [];
  const outputStream = new PassThrough();
  const inst = autocannon({
    url,
    connections: 100,
    duration: 20,
  });
  autocannon.track(inst, { outputStream });
  outputStream.on("data", (data) => buf.push(data));
  inst.on("done", function () {
    process.stdout.write(Buffer.concat(buf));
  });
}
/* console.log("Hiting infoConLog ...");
run("http://localhost:8080/infoConLog"); */
console.log("Hiting infoSinLog ...");
run("http://localhost:8080/infoSinLog");
