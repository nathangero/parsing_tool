/*
    Used to help determine what kind of line is being parsed
*/

const Config_Type = {
    host: Symbol("host"),
    server_id: Symbol("server_id"),
    server_load_alarm: Symbol("server_load_alarm"),
    user: Symbol("user"),
    verbose: Symbol("verbose"),
    test_mode: Symbol("test_mode"),
    debug_mode: Symbol("debug_mode"),
    log_file_path: Symbol("log_file_path"),
    send_notifications: Symbol("send_notifications"),
    comment: Symbol("comment"),
    error: Symbol("error")
}

module.exports = { Config_Type }