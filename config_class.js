class Config {

    host
    server_id
    server_load_alarm
    user
    verbose
    test_mode
    debug_mode
    log_file_path
    send_notifications

    constructor() {

    }


    toString() {
        console.log('host:', this.host)
        console.log('server_id:', this.server_id)
        console.log('server_load_alarm:', this.server_load_alarm)
        console.log('user:', this.user)
        console.log('verbose:', this.verbose)
        console.log('test_mode:', this.test_mode)
        console.log('debug_mode:', this.debug_mode)
        console.log('log_file_path:', this.log_file_path)
        console.log('send_notifications:', this.send_notifications)
    }
}

module.exports = { Config }