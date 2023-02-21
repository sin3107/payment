function requestRetry(url, data, retryTimes, retryDelay, callback) {
    var cntr = 0;

    function run() {
        // try your async operation
        request(url, function(err, data) {
            ++cntr;
            if (err) {
                if (cntr >= retryTimes) {
                    // if it fails too many times, just send the error out
                    callback(err);
                } else {
                    // try again after a delay
                    setTimeout(run, retryDelay);
                }
            } else {
                // success, send the data out
                callback(null, data);
            }
        });
    }
    // start our first request
    run();
}


requestRetry(someUrl, someData, 10, 500, function(err, data) {
    if (err) {
        // still failed after 10 retries
    } else {
        // got successful result here
    }
});