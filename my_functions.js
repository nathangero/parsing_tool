const fs = require('fs')
const events = require('events')
const readline = require('readline');
const { config } = require('process');
const config_class = require('./config_class')
const config_type = require('./enum_config_type');
const error_checking = require('./error_checking');

module.exports = { parse }


async function parse(input) {
    var lineWithError = ""
    var lineCount = 0
    var config = new config_class.Config()
    var hasError = false

    try {
        // Read the file line by line
        const rl = readline.createInterface({
            input: fs.createReadStream(input),
            crlfDelay: Infinity
        });
    
        rl.on('line', (line) => {
            if (hasError) {
                return

            } else {
                console.log(`Line ${lineCount}: "${line}"`);
                switch (determineWhatToParse(line)) {
                    case config_type.Config_Type.host:
                        config.host = parseHost(line)
                        break
    
                    case config_type.Config_Type.server_id:
                        config.server_id = parseServerId(line)
                        break
    
                    case config_type.Config_Type.server_load_alarm:
                        config.server_load_alarm = parseServerLoad(line)
                        break
    
                    case config_type.Config_Type.user:
                        config.user = parseUser(line)
                        break
    
                    case config_type.Config_Type.verbose:
                        config.verbose = parseVerbose(line)
                        break
    
                    case config_type.Config_Type.test_mode:
                        config.test_mode = parseTestMode(line)
                        break
    
                    case config_type.Config_Type.debug_mode:
                        config.debug_mode = parseDebugMode(line)
                        break
    
                    case config_type.Config_Type.log_file_path:
                        config.log_file_path = parseLogFilePath(line)
                        break
    
                    case config_type.Config_Type.send_notifications:
                        config.send_notifications = parseSendNotification(line)
                        break
    
                    case config_type.Config_Type.comment:
                        parseComment(line)
                        break
    
                    case config_type.Config_Type.error:
                        console.error(`Line ${lineCount} has an error`)
                        hasError = true
                        lineWithError = line
                        break
                }
            }

            

            lineCount += 1
            console.log()
        });
    
        await events.once(rl, 'close');
    
        console.log('Reading file line by line with readline done.\n');

        if (hasError) {
            console.error(`Error in line ${lineCount} for value "${lineWithError}"`)
        } else {
            console.log('These are the loaded config values:')
            config.toString()
        }

    } catch (err) {
        console.error(err);
    }
}


function checkIfLineHasComment(line) {
    let commentIndex = line.indexOf('#')

    if (commentIndex == 0) {
        return config_type.Config_Type.comment.description

    } else if (commentIndex > 0) {
        line.slice(0, commentIndex)
        return line

    } else if (commentIndex == -1) { // No comment found in the line
        return line
    }
}


function determineWhatToParse(line) {
    // First check if there's a comment anywhere in the line
    if (checkIfLineHasComment(line) == config_type.Config_Type.comment.description) {
        return config_type.Config_Type.comment // If the whole line is a comment, return as a comment
    } 

    // Next check if there's a syntax error in the line
    if (error_checking.hasSyntaxErrorLine(line)) {
        return config_type.Config_Type.error
    }

    // console.log("LINE IS VALID")
    let split = line.split('=')
    let key = split[0].trim() // The key in the file will be the first part of the line
    let value = split[split.length - 1].trim()
    // console.log('split:', split)
    // console.log('key:', key)
    // console.log('value:', value)

    // If no error, continue checking what config type it is
    if (key == config_type.Config_Type.host.description) {
        return config_type.Config_Type.host

    } else if (key == config_type.Config_Type.server_id.description) {
        if (error_checking.hasSyntaxErrorNumber(value)) {
            return config_type.Config_Type.error
        }
        return config_type.Config_Type.server_id

    } else if (key == config_type.Config_Type.server_load_alarm.description) {
        if (error_checking.hasSyntaxErrorNumber(value)) {
            return config_type.Config_Type.error
        }
        return config_type.Config_Type.server_load_alarm

    } else if (key == config_type.Config_Type.user.description) {
        return config_type.Config_Type.user

    } else if (key == config_type.Config_Type.verbose.description) {
        if (error_checking.hasSyntaxErrorBool(value)) {
            return config_type.Config_Type.error
        }
        return config_type.Config_Type.verbose

    } else if (key == config_type.Config_Type.test_mode.description) {
        if (error_checking.hasSyntaxErrorBool(value)) {
            return config_type.Config_Type.error
        }
        return config_type.Config_Type.test_mode

    } else if (key == config_type.Config_Type.debug_mode.description) {
        if (error_checking.hasSyntaxErrorBool(value)) {
            return config_type.Config_Type.error
        }
        return config_type.Config_Type.debug_mode

    } else if (key == config_type.Config_Type.log_file_path.description) {
        return config_type.Config_Type.log_file_path

    } else if (key == config_type.Config_Type.send_notifications.description) {
        if (error_checking.hasSyntaxErrorBool(value)) {
            return config_type.Config_Type.error
        }
        return config_type.Config_Type.send_notifications

    } else {
        console.log("this line has an invalid value:", line)
        return config_type.Config_Type.error
    }
        
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
    
    // console.log('return false')
    return false
}



function parseComment(line) {
    console.log('@parseComment')
    // do nothing
}


function parseHost(line) {
    console.log('@parseHost')
    return parseString(line)
}


function parseServerId(line) {
    console.log('@parseServerId')
    return parseNumber(line)
}


function parseServerLoad(line) {
    console.log('@parseServerLoad')
    return parseNumber(line)
}


function parseUser(line) {
    console.log('@parseUser')
    return parseString(line)
}


function parseVerbose(line) {
    console.log('@parseVerbose')
    return parseBool(line)
}


function parseTestMode(line) {
    console.log('@parseTestMode')
    return parseBool(line)
}


function parseDebugMode(line) {
    console.log('@parseDebugMode')
    return parseBool(line)
}


function parseLogFilePath(line) {
    console.log('@parseLogFilePath')
    return parseString(line)
}


function parseSendNotification(line) {
    console.log('@parseSendNotification')
    return parseBool(line)
}