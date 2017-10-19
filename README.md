# vue-test-utils extension

Simple little trick to make vue-test-utils extendible.

## Installation

```
npm install --save-dev vtu-extension
```

## Example usage

Create a file `vue-test-util-ext.js` in you root directory:

```js
    // ./vue-test-util-ext.js
    var vtu = require("vtu-extension");

    module.exports = vtu.exportDefault;
```

Now you can extend the vue-test-utils classes like so:

```js
    // ./vue-test-util-ext.js
    var vtu = require("vtu-extension");

    /**
     * It checks if an element is hidden
     */
    vtu.define("Wrapper", "isHidden", function() {
        return this.hasStyle('display', 'none');
    });

    module.exports = vtu.exportDefault;
```

> **Careful!!** Notice that we are exporting `vtu.exportDefault`. This is necessary to maintain the default functionality of vue-test-utils.

On your test file, you should import `./vue-test-util-ext.js` instead of `vue-test-util` and now you have access to the method:

```js
    // ./specs/example.spec.js
    var vtu = require("./vue-test-util-ext");
    
    var example = {
        template: `<div class="hiddenDiv" v-show="false">This should be hidden</div>`
    }
    
    var wrapper = vtu.mount(example);
    wrapper.find(".hiddenDiv").isHidden() // return => true
```

## Methods

### define(module, methodName, callback)

Sets a new prototype function on a given `vue-test-utils` module.

* `module`: Are classes and objects contained in the original `vue-test-utils` file. e.g.: Wrapper, WrapperArray, ...
* `methodName`: The new method name
* `callback`: The callback function

#### Example

```js
    vtu.define("Wrapper", "isHidden", function() {
        return this.hasStyle('display', 'none');
    });
```

### get(name)

It gets variables and functions declared withing the `vue-test-utils` file.

* `name`: Is the name of the variable/function contained in the original `vue-test-utils` file.

#### Example

```js
    var throwError = vtu.get("throwError");

    if(somethingWentWrong) {
        throwError("Something went wrong"); // "[vue-test-utils]: Something went wrong"
    }
```

## Author
* [Olavo Amorim Santos](https://github.com/olavoasantos)
