var c = document.getElementById("c");
var ctx = c.getContext("2d");

var cw = c.width = window.innerWidth,
    cx = cw / 2;
var ch = c.height = window.innerHeight,
    cy = ch / 2;

var rad = Math.PI / 180;
var stopped = true;
var howMany = 100;
var Circles = [];
ctx.strokeStyle = "red";
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.globalAlpha = .75;

function Circle() {

    this.R = randomIntFromInterval(50, 200);
    this.X = randomIntFromInterval(this.R, cw - this.R);
    this.Y = randomIntFromInterval(this.R, ch - this.R);
    this.iX = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1); //positive or negative
    this.iY = 2 * Math.random() * (Math.random() < 0.5 ? -1 : 1); //positive or negative

    this.r = randomIntFromInterval(5, 50);
    this.r1 = randomIntFromInterval(this.R / 2, this.R);

    this.a = ~~(Math.random() * 360) + 1;
    this.x = this.X + this.r1 * Math.cos(this.a * rad);
    this.y = this.Y + this.r1 * Math.sin(this.a * rad);
    this.l = randomIntFromInterval(50, 80);
}

for (var i = 0; i < howMany; i++) {
    var circle = new Circle();
    Circles.push(circle);
}

function Draw() {
    ctx.fillRect(0, 0, cw, ch);

    for (var i = 0; i < Circles.length; i++) {
        var p = Circles[i];
        if (p.X < p.R || p.X > cw - p.R || p.Y < p.R || p.Y > ch - p.R) {
            p.iX *= -1;
            p.iY *= -1;
        }

        p.X += p.iX;
        p.Y += p.iY;
        p.a += 1;
        p.x = p.X + p.r1 * Math.cos(p.a * rad);
        p.y = p.Y + p.r1 * Math.sin(p.a * rad);
        p.gx = p.x + p.r * Math.cos(p.a * rad);
        p.gy = p.y + p.r * Math.sin(p.a * rad);

        /*ctx.beginPath();
        ctx.arc(p.X,p.Y,p.R, 0,2*Math.PI);
        ctx.stroke();*/
        ctx.save();

        ctx.fillStyle = Grd(p.gx, p.gy, p.r, p.l);

        heart(p.x, p.y, p.r, p.a);
        ctx.restore();
    }
    requestId = window.requestAnimationFrame(Draw);
}

function randomIntFromInterval(mn, mx) {
    return ~~(Math.random() * (mx - mn + 1) + mn);
}

function Grd(x, y, r, l) {
    grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, 'hsla(0, 99%,' + l + '%,.9)');
    grd.addColorStop(1, 'hsla(0, 99%,' + l + '%, 0.1)');
    return grd;
}

function heart(x, y, r, a) {

    ctx.beginPath();
    var x1 = x + r * Math.cos(a * rad);
    var y1 = y + r * Math.sin(a * rad);
    var cx1 = x + r * Math.cos((a + 22.5) * rad);
    var cy1 = y + r * Math.sin((a + 22.5) * rad);

    var cx2 = x + r * Math.cos((a - 22.5) * rad);
    var cy2 = y + r * Math.sin((a - 22.5) * rad);
    var chord = 2 * r * Math.sin(22.5 * rad / 2);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.arc(cx1, cy1, chord, (270 + a) * rad, (270 + a + 225) * rad);
    ctx.lineTo(x, y);
    ctx.moveTo(x1, y1);
    ctx.arc(cx2, cy2, chord, (90 + a) * rad, (90 + a + 135) * rad, true);
    ctx.lineTo(x, y);
    ctx.fill();
}

function start() {
    requestId = window.requestAnimationFrame(Draw);
    stopped = false;
}

function stopAnim() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
    }
    stopped = true;
}

window.addEventListener("load", start(), false);
c.addEventListener("click", function () {
    stopped == true ? start() : stopAnim();
}, false);

const btn = document.getElementById('btn');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const msgYes = document.getElementById('msgYes');
const messages = document.querySelectorAll('.message');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');

let currentMessage = 0;

btn.addEventListener('click', () => {
    messageTitle.classList.add('hide');
    messageText.classList.add('hide');
    btn.classList.add('hide');
    showNextMessage();
});

function showNextMessage() {
    if (currentMessage < messages.length) {
        const currentElement = messages[currentMessage];
        currentElement.style.display = 'block';
        currentElement.classList.add('show');
        currentMessage++;

        setTimeout(() => {
            if (currentMessage > 0) {
                const prevElement = messages[currentMessage - 1];
                prevElement.classList.remove('show');
                prevElement.style.display = 'none';
            }
            showNextMessage();
        }, 2500);
    } else {
        msgYes.style.display = 'block';
        msgYes.classList.add('show');
        btnYes.style.display = 'inline-block';
        btnNo.style.display = 'inline-block';
    }
}

btnYes.addEventListener('click', () => {
    window.location.href = 'start.html';
});

btnNo.addEventListener('click', () => {
    moveButtonRandomly(btnNo);
});

function moveButtonRandomly(button) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.random() * (screenWidth - button.offsetWidth);
    const randomY = Math.random() * (screenHeight - button.offsetHeight);

    button.style.position = 'absolute';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

setInterval(() => {
    btn.classList.add('shake');

    setTimeout(() => {
        btn.classList.remove('shake');
    }, 500);
}, 2000); 
<br>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pháo hoa</title>
    <style>
        body,
        html {
            height: 100%;
            width: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            overflow: hidden;
            flex-direction: column;
            text-align: center;
            position: relative;
        }
        #c {
            background-color: #ffffff;
        }
        canvas {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }

        #btn {
            height: 55px;
            width: 75px;
            cursor: pointer;
            background-color: #ce4f6a00;
            color: white;
            border: none;
            border-radius: 10px;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: opacity 0.3s ease;
        }

        #btnYes,
        #btnNo {
            padding: 10px 20px;
            font-size: 18px;
            cursor: pointer;
            background-color: #ce4f6a;
            color: white;
            border: none;
            border-radius: 10px;
            transition: all 0.3s ease-in-out;
            margin: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        h1,
        p {
            transition: opacity 0.3s ease;
            font-family: 'Times New Roman', 'Arial', sans-serif;
        }

        .hide {
            display: none;
        }

        .show {
            opacity: 1;
        }

        #btn img {
            width: 60px;
            height: 40px;
        }

        @keyframes shake {
            0% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-5px);
            }

            50% {
                transform: translateX(5px);
            }

            75% {
                transform: translateX(-5px);
            }

            100% {
                transform: translateX(5px);
            }
        }

        .shake {
            animation: shake 0.5s ease-in-out;
        }

        #btn:hover,
        #btnYes:hover,
        #btnNo:hover {
            background-color: #d37da8;
            transform: translateY(-4px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        #btn:active,
        #btnYes:active,
        #btnNo:active {
            transform: translateY(2px);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .message {
            display: none;
            font-size: 20px;
            margin: 10px;
            padding: 30px;
            border: 2px solid #f19fb3;
            border-radius: 8px;
            background-color: #ffffff;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 90%;
            overflow: hidden;
            word-wrap: break-word;
            transform: perspective(500px) rotateY(10deg);
            transition: all 0.3s ease-in-out;
        }

        .message.show {
            transform: perspective(500px) rotateY(0deg);
        }

        .div-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            max-width: 100%;
            overflow: hidden;
            margin: 10px 0;
        }

        .message-text {
            font-size: 18px;
            display: block;
            padding: 30px;
            border: 2px solid #f19fb3;
            border-radius: 10px;
            background-color: #ffffff;
            text-align: center;
            margin-bottom: 30px;
            transform: perspective(500px) rotateY(10deg);
            transition: all 0.3s ease-in-out;
        }

        .message-text.show {
            transform: perspective(500px) rotateY(0deg);
        }
    </style>
</head>

<body>
    <canvas id="c" width="948" height="586"></canvas>
    <div>
        <h1 id="messageTitle">Bạn có tin nhắn mới</h1>
        <p id="messageText">Xem ngay</p>
        <button id="btn">
            <img src="./letters.png" alt="Description">
        </button>
        <div class="message">Lâm Thị Thảo Nguyên</div>
        <div class="message">Còn vài giờ nữa là hết năm rồi nhỉ!</div>
        <div class="message">Tối ngày 31/12/2014 có một buổi pháo hoa đẹp lắm ,nhưng tiếc là mình không thể bên cạnh nhau</div>
        <div class="message">anh nghĩ chẳng có gì tuyệt vời hơn việc bên cạnh em,</div>
        <div class="message">nhìn những ánh sáng rực rỡ trên bầu trời.</div>
        <div class="message">🌟 Em có muốn cùng anh đi không?</div>
        <div class="message">Anh hứa sẽ không để em phải chờ lâu đâu,</div>
        <div class="message">anh muốn được nhìn thấy nụ cười của em khi pháo hoa nở rộ. 😘</div>

        <div id="msgYes" class="message-text" style="display: none;">Chắc chắn buổi tối đó sẽ còn đặc biệt hơn nếu có em bên cạnh. 💕</div>

        <div class="div-buttons">
            <button id="btnYes" style="display: none;">Ok anh</button>
            <button id="btnNo" style="display: none;">Suy nghĩ</button>
        </div>
    </div>
    <script src="./script.js"></script>

</body>
<iframe src="https://www.nhaccuatui.com/mh/background/RSFeBXvcUeKf" width="1" height="1" frameborder="0" allowfullscreen allow="autoplay"></iframe>


