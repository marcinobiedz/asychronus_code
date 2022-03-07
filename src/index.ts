function loadAsset(url: string, type: XMLHttpRequestResponseType, callback: (arg: any) => void) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;

    xhr.onload = function () {
        callback(xhr.response);
    };

    xhr.send();
}

function displayImage(blob: Blob) {
    let objectURL = URL.createObjectURL(blob);

    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}

loadAsset('coffee.jpg', 'blob', displayImage);