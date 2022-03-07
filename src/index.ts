function timeoutPromiseResolve(interval: number) {
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve("successful");
      }, interval);
    });
  };
  
  function timeoutPromiseReject(interval: number) {
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        reject("error");
      }, interval);
    });
  };
  
  async function timeTest() {
    const timeoutPromiseResolve1 = timeoutPromiseResolve(5000);
    const timeoutPromiseReject2 = timeoutPromiseReject(2000);
    const timeoutPromiseResolve3 = timeoutPromiseResolve(3000);
  
    const results = await Promise.all([timeoutPromiseResolve1, timeoutPromiseReject2, timeoutPromiseResolve3]);
    return results;
  }
  
  let startTime = Date.now();
  
  timeTest()
    .then(() => {})
    .catch(e => {
      console.log(e);
      let finishTime = Date.now();
      let timeTaken = finishTime - startTime;
      alert("Time taken in milliseconds: " + timeTaken);
    })