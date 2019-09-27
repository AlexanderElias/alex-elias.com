
export default class Draw {

    constructor () {
        this.x = 0;
        this.y = 0;
        this.points = [];
        this.flag = false;
    }

    setup (canvas, option) {
        option = option || {};

        if (typeof canvas === 'string' || canvas.constructor === HTMLCanvasElement) {
            option.canvas = canvas;
        } else {
            option = canvas || option;
        }

        this.fill = option.fill || null;
        this.line = option.line || 'black';

        this.width = option.width || 1;
        this.quality = option.quality || 0.5;
        this.type = option.type || 'image/webp';
        this.canvas = typeof option.canvas === 'string' ? document.body.querySelector(option.canvas) : option.canvas;

        if (!option.canvas) {
            throw new Error('Signer - canvas option required');
        }

        this.context = this.canvas.getContext('2d', {
            desynchronized: true,
            preserveDrawingBuffer: true
        });

        this.canvas.style.cursor = 'crosshair';
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;

        if (this.fill) {
            this.context.fillStyle = this.fill;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.canvas.addEventListener('mouseup', this.tick.bind(this, this.change.bind(this, 'up')), false);
        this.canvas.addEventListener('mouseout', this.tick.bind(this, this.change.bind(this, 'out')), false);
        this.canvas.addEventListener('mousedown', this.tick.bind(this, this.change.bind(this, 'down')), false);
        this.canvas.addEventListener('mousemove', this.tick.bind(this, this.change.bind(this, 'move')), false);

        this.canvas.addEventListener('touchend', this.tick.bind(this, this.change.bind(this, 'up')), false);
        this.canvas.addEventListener('touchmove', this.tick.bind(this, this.change.bind(this, 'move')), false);
        this.canvas.addEventListener('touchstart', this.tick.bind(this, this.change.bind(this, 'down')), false);
    }

    tick (method, events) {

        if (events.type !== 'resize' && events.cancelable) {
            events.preventDefault();
        }

        window.requestAnimationFrame(method.bind(this, events));
    }

    up () {
        this.flag = false;
        this.points.length = 0;
    }

    out () {
        this.flag = false;
        this.points.length = 0;
    }

    down (x, y) {
        this.flag = true;
        this.points.push({ x, y });
    }

    move (x, y) {
        if (!this.flag) return;
        this.points.push({ x, y });

        this.context.beginPath();
        this.context.moveTo(this.points[0].x, this.points[0].y);

        for (var i = 1; i < this.points.length; i++) {
            this.context.lineTo(this.points[i].x, this.points[i].y);
        }

        this.context.strokeStyle = this.line;
        this.context.shadowColor = this.line;
        this.context.lineWidth = this.width;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.shadowBlur = 2;
        this.context.stroke();
        this.context.closePath();
    }

    change (type, e) {
        const bounds = this.canvas.getBoundingClientRect();
        const tx = e.touches ? e.touches[0].clientX : e.clientX;
        const ty = e.touches ? e.touches[0].clientY : e.clientY;
        const x = tx - bounds.left;
        const y = ty - bounds.top;
        this[type](x, y);
    }

    erase () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.fill) {
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = this.fill;
        }

    }

    async url () {
        const self = this;
        return new Promise(function (resolve) {
            self.canvas.toBlob(function (blob) {
                const reader = new FileReader();
                reader.onload = function () {
                    resolve(reader.result);
                };
                reader.readAsDataURL(blob);
            }, self.type, self.quality);
        });
    }

    async text () {
        const self = this;
        return new Promise(function (resolve) {
            self.canvas.toBlob(function (blob) {
                const reader = new FileReader();
                reader.onload = function () {
                    resolve(reader.result);
                };
                reader.readAsBinaryString(blob);
            }, self.type, self.quality);
        });
    }

    async buffer () {
        const self = this;
        return new Promise(function (resolve) {
            self.canvas.toBlob(function (blob) {
                const reader = new FileReader();
                reader.onload = function () {
                    resolve(reader.result);
                };
                reader.readAsArrayBuffer(blob);
            }, self.type, self.quality);
        });
    }

    async blob () {
        const self = this;
        return new Promise(function (resolve) {
            self.canvas.toBlob(function (blob) {
                resolve(blob);
            }, self.type, self.quality);
        });
    }

    async image (blob) {
        const self = this;
        return new Promise(function (resolve) {
            const image = new Image();
            image.src = URL.createObjectURL(blob);
            image.onload = function () {
                self.context.drawImage(image, 0, 0);
                resolve();
            };
        });
    }

}
