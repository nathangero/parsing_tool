
function isComment(line) {
    let commentIndex = line.indexOf('#')

    if (commentIndex == 0) {
        return true
    }

    return false
}


function doesNeedSlice(line) {
    let commentIndex = line.indexOf('#')

    if (commentIndex > 0) {
        return true
    }

    return false
}


function isBool(input) {
    if (input == 0 || input == 1) {
        // console.log('input is 0 or 1')
        return true

    } else if (input == "on" || input == "off") {
        // console.log('input is on or off')
        return true

    } else if (input == "true" || input == "false") {
        // console.log('input is true or false')
        return true 

    } else if (input == "yes" || input == "no") {
        // console.log('input is yes or no')
        return true

    }
        
    return false
}


// Checks if the string has numbers in it. Error checking will come after this function is called
function isNumber(input) {
    var numCheck = new RegExp("\\d")
    if (numCheck.test(input)) {
        // console.info('has numbers')
        return true
    }

    return false
}


module.exports = { isBool, isNumber, isComment, doesNeedSlice }