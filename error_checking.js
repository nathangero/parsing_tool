const config_class = require('./config_class')
const config_type = require('./enum_config_type');


const error_types = {
    syntaxLine:  Symbol("INVALID LINE"),
    synxtaxBool: Symbol("INVALID BOOL"),
    syntaxNumber: Symbol("INVALID NUMBER"),
    syntaxFilePath: Symbol("INVALID FILE PATH"),
    duplicate: Symbol("DUPLICATE"),
}

function hasSyntaxErrorLine(line) {
    // console.log('check for error')
    let split = line.split('=')

    if (line.indexOf('=') == -1) { // If there's no = 
        // console.error('* ERROR no "=" in line *')
        return true // Return error

    } else if (split.length != 2) { // If the line doesn't follow the 'key = value' format, it's bad
        // console.error('* ERROR too many values *')
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


/*
    Description: Check if the number input is valid
    @param: the given input to check
    @return: True if there is an error, False if no error
*/
function hasSyntaxErrorNumber(input) {
    // console.log('@hasSyntaxErrorNumber')

    var numCheck = new RegExp("^[0-9]*$|^[0-9]+.[0-9]+$")
    if (!numCheck.test(input)) {
        // console.error('is NOT only numbers')
        return true
    }
        
    return false
}


// Might not need it since we don't check for URL validity
// Check if the filepath is valid
function hasSyntaxErrorFilePath(input) {
    // Checks if there's a drive path, tilda, or just "/" then check if file path has appropriate "/" and "." extension at the end
    let pathCheck = new RegExp("/^(\s*|[~]|(?:[\w]\:|\/))(\/[a-z_\-\s0-9]+)+(\.)([a-zA-z]{1,})$/i")
    if (!pathCheck.test(input)) {
        return true
    }

    return false
}


/*
    Description: Check if the the key already exists in the dictionary
    @param dictionary: The dictionary to check
    @param input: The given input to check
    @return: True if there is a duplicate, False if no dupicate
*/
function hasErrorDuplicateKey(dictionary, input) {
    if (dictionary[input] != undefined) {
        return true
    }

    return false
}


module.exports = { error_types, hasSyntaxErrorLine, hasSyntaxErrorBool, hasSyntaxErrorNumber, hasErrorDuplicateKey }