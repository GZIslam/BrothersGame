import { gameSize } from './constants';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resize = () => {
    gameSize.w = canvas.width = window.innerWidth;
    gameSize.h = canvas.height = window.innerHeight;
};

export const drawCircle = ({ color, size, position }) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
    ctx.fill();
}

export const drawArc = ({ color, width, position, size, value }) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.arc(position.x, position.y, size, 0, value * 2 * Math.PI);
    ctx.stroke();
};

export const drawRect = ({ color, width, height, position }) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(position.x, position.y, width, height);
    ctx.fill();
};

export const drawText = ({ text, position, size, color }) => {
    ctx.fillStyle = color;
    ctx.font = `${size}px serif`;
    ctx.fillText(text, position.x, position.y);
};

export const clearCanvas = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
};

window.document.addEventListener('resize', resize);
resize();