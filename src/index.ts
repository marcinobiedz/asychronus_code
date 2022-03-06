const btn = document.querySelector('#my-button');

if (btn) {
    btn.addEventListener('click', () => {
        let myDate;
        for (let i = 0; i < 10000000; i++) {
            let date = new Date();
            myDate = date;
        }

        console.log(myDate);

        let pElem = document.createElement('p');
        pElem.textContent = 'This is a newly-added paragraph.';
        document.body.appendChild(pElem);
    });
}