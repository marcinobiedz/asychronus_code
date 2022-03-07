let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 2000);
});

timeoutPromise
    .then(message => {
        alert(message);
    })