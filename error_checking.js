const config_class = require('./config_class')
const config_type = require('./enum_config_type');

module.exports = { hasSyntaxErrorLine, hasSyntaxErrorBool }

function hasSyntaxErrorLine(line) {
    // console.log('check for error')
    let split = line.split('=')

    // console.log('line:', line)
    // console.log('split:', split)


    if (line.indexOf('=') == -1) { // If there's no = 
        console.error('EREROR no = in line')
        return true // Return error

    } else if (split.length != 2) { // If the line doesn't follow the 'key = value' format, it's bad
        console.error('ERROR too many values')
        return true
    }
    
    return false
}

/*
    Description: Check if the bool input is valid
    @param: the given input to check
    @return: True if there is an error, False if no error
*/
function hasSyntaxErrorBool(input) {
    // console.log('@hasSyntaxErrorBool')
    if (input == 0 || input == 1) {
        // console.log('input is 0 or 1')
        return false

    } else if (input == "on" || input == "off") {
        // console.log('input is on or off')
        return false

    } else if (input == "true" || input == "false") {
        // console.log('input is true or false')
        return false 

    } else if (input == "yes" || input == "no") {
        // console.log('input is yes or no')
        return false

    } else if (input || !input) {
        // console.log('input is a natural bool')
        return false
    }
        
    return true
}