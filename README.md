# parsing_tool

## About
Please create a parsing tool that takes the example config file (provided below) and turns it into a usable object in the language of your choice (hash, JSON object, associative array, class, etc). The instructions for this are below.

1. Do not use existing "complete" configuration parsing libraries/functions, we want to see how you would write the code to do this.

2. Use of core and stdlib functions/objects such as string manipulation, regular expressions, etc is ok.

3. We should be able to get the values of the config parameters in code, via their name. How this is done specifically is up to you.

4. Boolean-like config values (on/off, yes/no, true/false) should return real booleans: true/false.

5. Numeric config values should return real numerics: integers, doubles, etc

6. Ignore or error out on invalid config lines, your choice.


## Valid config file example:
\# This is what a comment looks like, ignore it
\# All these config lines are valid
host = test.com
server_id=55331
server_load_alarm=2.5
user= user
\# comment can appear here as well
verbose =true
test_mode = on
debug_mode = off
log_file_path = /tmp/logfile.log
send_notifications = yes


## How to Run
1. Where the repo is saved, run "node parse.js FILE_NAME" 
2. The program will run and read in the argument for FILE_NAME.