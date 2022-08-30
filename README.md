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
1. Where the repo is saved, run "node main.js FILE_NAME". FILE_NAME is the name of the config file that will be loaded in
2. The program will run and read in the argument for FILE_NAME.

* Example: run "node main.js ./config.txt" assuming the config.txt file is in the same folder as the code

## Additional information
* For number 3, when you say "we should be able to get the values of the config parameters in code," do you mean the program should allow the user to retrieve the config values after loading them in, or would simply displaying the config values after parsing be sufficient?
    * Display the config values after parsing.

* For number 4, would there be any other inputs other than what was listed? For example would there be 0's or 1's?
    * This is a good question, but for this exercise, it's just as listed.

* Is a valid input only basically "key = value" (such as in the example) or would there be other valid values afterwards? So it could be "host = test.com test.org". If the input is only "key = value" then are lines that don't match that structure invalid?
    * Since it is just as listed, you can use the provided config file to see all exceptions.

* What happens if there's a missing config value? So if "verbose" is missing, how should that be handled? Should there be a default value (like "false" for verbose), or should the program throw an error and say the whole file is invalid?
    * The presence of a key value is not important. It's important to parse the ones that are available. You shouldn't, for example, look for a "verbose" value. Just whatever the file gives you.

* What happens if there's a duplicate config value? So if "verbose" appeared twice in the file, should I overwrite it (so if first was true then second was false, save false) or throw an error saying the whole file in invalid?
    * Again, we would accept just parsing the file provided, but in a real world scenario, I would prefer to have an error thrown at a duplicate value.

* Can there be multiple values on one line? so "host = test.com server_id = 84928"
    * No, not at this time.

* Do I need to do some valid URL checking for the host value, or can I assume all the URL inputs will be correct?
    * No, I don't believe that's the job of a config parser. Maybe another tool that is using its values, but from a microservice ideology, just parsing the values should be sufficient.

* Are server_ids only numbers or should I expect letters too? Could there this value also be a double/float?
    * Server_ids are only integers.

* What exactly is the input for "user"? is it a name, a predefined class I need to worry about, or something else?
    * Again, you don't need to validate the data, just present the data as it is written in the config file.

* Are the values listed in the valid config file all the values I need to parse through?
    * Yes.

* Should I expect comments to appear in a single line such as "host = test.com #this url works" ?
    * This would be a good bonus feature of the parser, but not needed for approval.
