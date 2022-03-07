// Call the fetch() method to fetch the image, and store it in a variable
async function myFetch() {
    let response = await fetch('coffee.jpg');
    // Use a then() block to respond to the promise's successful completion
    // by taking the returned response and running blob() on it to transform it into a blob
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.blob();
    }
    // blob() also returns a promise; when it successfully completes it returns
    // The blob object in the callback
  }

  myFetch().then((blob) => {
    // Create an object URL that points to the blob object
    let objectURL = URL.createObjectURL(blob);
    // Create an <img> element to display the blob (it's an image)
    let image = document.createElement('img');
    // Set the src of the <img> to the object URL so the image displays it
    image.src = objectURL;
    // Append the <img> element to the DOM
    document.body.appendChild(image);
  }).catch(e => console.log(e));