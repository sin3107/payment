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




// var httpArray = getHttpReq(); //return array

// function makeHttpRequest() {
//     _.each(httpArray, function (httpRequest) {
//         retryRequest(httpRequest);
//     });
// }

// function retryRequest(httpRequest) {

//     const MAX_RETRY = 2;
//     var retryCnt = 0;
//     Retry();

//     function Retry() {

//         request(httpRequest, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log(body)
//             }
//             else {
//                 if (retryCnt < MAX_RETRY) {
//                     retryCnt += 1;
//                     var currRetryIntervalMs = (1 << retryCnt) * 1000; //exponential back off logic
//                     setTimeout(Retry, currRetryIntervalMs);
//                 }
//                 else {
//                     console.log('http fail');
//                 }
//             }
//         });
//     }
// }

//
// https://stackoverflow.com/questions/35195725/nodejs-re-calling-function-on-error-callback-is-there-a-non-blocking-way