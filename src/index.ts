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
    await timeoutPromiseResolve(5000);
    await timeoutPromiseReject(2000);
    await timeoutPromiseResolve(3000);
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