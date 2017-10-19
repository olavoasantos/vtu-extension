let fs = require("fs");
let vtu = fs.readFileSync("./node_modules/vue-test-utils/dist/vue-test-utils.js", "utf-8");

let rgx = /var index = {((.|\n)*)};/g;
let exportString = `var index = {
    define: (module, name, callback) => {
      eval(module).prototype[name] = callback;
    },
    get: (variable) => {
      return eval(variable);
    },
    exportDefault: {
        !!??!!
    }
};`.replace("!!??!!", rgx.exec(vtu)[1]);

eval(vtu.replace(rgx, exportString));
