function timeoutPromise(message: string, interval: number) {
    return new Promise((resolve, reject) => {
        if (message === '' || typeof message !== 'string') {
            reject('Message is empty or not a string');
        } else if (interval < 0 || typeof interval !== 'number') {
            reject('Interval is negative or not a number');
        } else {
            setTimeout(() => {
                resolve(message);
            }, interval);
        }
    });
}

timeoutPromise({} as any, 1000)
    .then(message => {
        alert(message);
    })
    .catch(e => {
        console.log('Error: ' + e);
    });