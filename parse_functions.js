const fs = require('fs')
const events = require('events')
const readline = require('readline');
const { config } = require('process');
const config_class = require('./config_class')
const config_type = require('./enum_config_type');
const error_checking = require('./error_checking');
const check_type = require('./check_type');
const { timeEnd } = require('console');

module.exports = { parse }


async function parse(input) {
    var lineWithError = ""
    var hasError = false
    var errorType = error_checking.error_types.syntaxLine

    var lineCount = 0
    var config = new config_class.Config()
    let timeStarted = 0
    let timeEnded = 0

    try {
        // Read the file line by line
        const rl = readline.createInterface({
            input: fs.createReadStream(input),
            crlfDelay: Infinity
        });
        
        console.log('Reading file')
        timeStarted = Date.now() / 1000
        rl.on('line', (line) => {
            if (hasError) {
                return

            } else {
                // console.log(`Line ${lineCount}: "${line}"`);
                let output = parseLine(line)

                if (output[0] == "error") {
                    hasError = true
                    lineWithError = line
                    errorType = output[1]

                } else if (output[0] != undefined) {
                    let key = output[0]
                    let value = output[1]

                    if (!error_checking.hasErrorDuplicateKey(config.parameters, key)) {
                        // console.log('output:', output)
                        config.parameters[key] = value
                    } else {
                        hasError = true
                        lineWithError = line
                        errorType = error_checking.error_types.duplicate

                    }
                    
                }
                
            }            

            lineCount += 1
            // console.log()
        });
    
        await events.once(rl, 'close');
    
        timeEnded = Date.now() / 1000
        let timeElapsed = timeEnded - timeStarted
        console.log(`Done reading file. Time elapsed: ${timeElapsed.toFixed(3)}s\n`)

        if (hasError) {
            console.error(`Error: ${errorType.description}, in line ${lineCount} for value "${lineWithError}"`)
            
        } else {
            console.log('These are the loaded config values:')
            config.toString()
        }

    } catch (err) {
        console.error(err);
    }
}


function parseLine(line) {

    // First check if there's a comment anywhere in the line
    if (check_type.isComment(line)) {
        return []

    } else if (check_type.doesNeedSlice(line)) { // Check if line needs to slice off the comment
        line = sliceOffComment(line)
    }

    // Next check if there's a syntax error in the line
    if (error_checking.hasSyntaxErrorLine(line)) {
        return ["error", error_checking.error_types.syntaxLine]
    }

    // console.log("LINE IS VALID")
    let split = line.split('=')
    let key = split[0].trim() // The key in the file will be the first part of the line
    let value = split[split.length - 1].trim()
    let parsedValue
    // console.log('split:', split)
    // console.log('key:', key)
    // console.log('value:', value)

    if (check_type.isNumber(value)) {
        if (!error_checking.hasSyntaxErrorNumber(value)) {
            parsedValue = parseNumber(value)

        } else {
            return ["error", error_checking.error_types.syntaxNumber]
        }

    } else if (check_type.isBool(value.toLowerCase())) {
        value = value.toLowerCase() // If a bool, make lowercase 
        if (!error_checking.hasSyntaxErrorBool(value)) {
            parsedValue = parseBool(value)

        } else {
            return ["error", error_checking.error_types.synxtaxBool]
        }

    } else { // Should be a string
        parsedValue = parseString(value)
    }

    let output = [key, parsedValue]
    
    return output
}


function sliceOffComment(line) {
    let commentIndex = line.indexOf('#')
    line = line.slice(0, commentIndex)
    // console.log('slicing comment off:', line)
    return line
}


function parseString(line) {
    let split = line.split('=')
    let lastIndex = split.length - 1
    let value = split[lastIndex].trim()
    // console.log('value:', value)
    return value
}


function parseNumber(line) {
    let split = line.split('=')
    let lastIndex = split.length - 1
    let value = Number(split[lastIndex].trim())
    // console.log('value:', value)
    return value
}


function parseBool(line) {
    let split = line.split('=')
    let lastIndex = split.length - 1
    let value = convertValueToBool(split[lastIndex].trim())
    // console.log('value:', value)
    return value
}


function convertValueToBool(input) {
    // console.log('@convertValueToBool')
    // console.log('input:', input)
    if (input == "on" || input == "yes" || input == "true") {
        // console.log('return true')
        return true
    }
    
    // if any of the negative 
    return false
}




/// Old functions 
// function determineWhatToParse(line) {
//     // First check if there's a comment anywhere in the line
//     if (checkIfLineIsComment(line) == config_type.Config_Type.comment.description) {
//         return config_type.Config_Type.comment // If the whole line is a comment, return as a comment
//     } 

//     // Next check if there's a syntax error in the line
//     if (error_checking.hasSyntaxErrorLine(line)) {
//         return config_type.Config_Type.error
//     }

//     // console.log("LINE IS VALID")
//     let split = line.split('=')
//     let key = split[0].trim() // The key in the file will be the first part of the line
//     let value = split[split.length - 1].trim()
//     // console.log('split:', split)
//     // console.log('key:', key)
//     // console.log('value:', value)

//     // If no error, continue checking what config type it is
//     if (key == config_type.Config_Type.host.description) {
//         return config_type.Config_Type.host

//     } else if (key == config_type.Config_Type.server_id.description) {
//         if (error_checking.hasSyntaxErrorNumber(value)) {
//             return config_type.Config_Type.error
//         }
//         return config_type.Config_Type.server_id

//     } else if (key == config_type.Config_Type.server_load_alarm.description) {
//         if (error_checking.hasSyntaxErrorNumber(value)) {
//             return config_type.Config_Type.error
//         }
//         return config_type.Config_Type.server_load_alarm

//     } else if (key == config_type.Config_Type.user.description) {
//         return config_type.Config_Type.user

//     } else if (key == config_type.Config_Type.verbose.description) {
//         if (error_checking.hasSyntaxErrorBool(value)) {
//             return config_type.Config_Type.error
//         }
//         return config_type.Config_Type.verbose

//     } else if (key == config_type.Config_Type.test_mode.description) {
//         if (error_checking.hasSyntaxErrorBool(value)) {
//             return config_type.Config_Type.error
//         }
//         return config_type.Config_Type.test_mode

//     } else if (key == config_type.Config_Type.debug_mode.description) {
//         if (error_checking.hasSyntaxErrorBool(value)) {
//             return config_type.Config_Type.error
//         }
//         return config_type.Config_Type.debug_mode

//     } else if (key == config_type.Config_Type.log_file_path.description) {
//         return config_type.Config_Type.log_file_path

//     } else if (key == config_type.Config_Type.send_notifications.description) {
//         if (error_checking.hasSyntaxErrorBool(value)) {
//             return config_type.Config_Type.error
//         }
//         return config_type.Config_Type.send_notifications

//     } else {
//         console.log("this line has an invalid value:", line)
//         return config_type.Config_Type.error
//     }
        
// }


// function parseComment(line) {
//     console.log('@parseComment')
//     // do nothing
// }


// function parseHost(line) {
//     console.log('@parseHost')
//     return parseString(line)
// }


// function parseServerId(line) {
//     console.log('@parseServerId')
//     return parseNumber(line)
// }


// function parseServerLoad(line) {
//     console.log('@parseServerLoad')
//     return parseNumber(line)
// }


// function parseUser(line) {
//     console.log('@parseUser')
//     return parseString(line)
// }


// function parseVerbose(line) {
//     console.log('@parseVerbose')
//     return parseBool(line)
// }


// function parseTestMode(line) {
//     console.log('@parseTestMode')
//     return parseBool(line)
// }


// function parseDebugMode(line) {
//     console.log('@parseDebugMode')
//     return parseBool(line)
// }


// function parseLogFilePath(line) {
//     console.log('@parseLogFilePath')
//     return parseString(line)
// }


// function parseSendNotification(line) {
//     console.log('@parseSendNotification')
//     return parseBool(line)
// }