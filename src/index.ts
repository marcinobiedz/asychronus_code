const canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');

let alertBtn = document.querySelector('.alert');
let fillBtn = document.querySelector('.fill');

function degToRad(degrees: number) {
    return degrees * Math.PI / 180;
}

function random(min: number, max: number) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function expensiveOperation() {
    if(ctx){
        for (let i = 0; i < 1000000; i++) {
            ctx.fillStyle = 'rgba(0,0,255, 0.2)';
            ctx.beginPath();
            ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false);
            ctx.fill()
        }
    }
}

if(fillBtn && alertBtn){
    
    fillBtn.addEventListener('click', expensiveOperation);
    
    alertBtn.addEventListener('click', () =>
        alert('You clicked me!')
    );
}
