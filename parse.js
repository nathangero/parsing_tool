const myFunctions = require('./my_functions')

var input = ""

process.argv.forEach(function (val, index, array) {
    if (index == 2) {
        // console.log(index + ': ' + val);
        input = val
    }

    if (index > 2) {
        console.log("can only handle the first config file provided")
        return
    }
    
});

if (input == "") {
    console.log("no file was provided")
}

myFunctions.parse(input)

