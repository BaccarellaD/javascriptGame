class Block {

    constructor() {
        this.color1 = this.colorPicker();
        this.color2 = this.colorPicker();
        this.setPos(startx,starty);
        this.dx = 0;
        this.dy = 1;
        this.stopped = false;
        this.width = 40;
        this.height = 20;
    }

    private static colorPicker() {
        let colors = ["#ff0400",
            "#0100ff",
            "#00ff02"];

        let idx = Math.floor(Math.random() * 3);

        return colors[idx];

    }

    setPos(x,y) {

        this.x1 = x;
        this.y1 = y;
        this.x2 = x+20;
        this.y2 = y;
        this.bottomy = y;

    }

    switchWidthHeight() {
        let temp1 = this.width;
        this.width = this.height;
        this.height = temp1;
    }


    update() {

        if(!this.stopped && this.bottomy + this.dy > canvas.height - 20) {
            this.stopped = true;
            this.dy = 0;
        } else if(!this.stopped){
            if(count < speed) {
                count++;
            } else {
                count = 0;
            }
            this.dy = (count === speed) ? 20 : 0;
        }
        this.y1 = this.y1 + this.dy;
        this.x1 = this.x1 + this.dx;
        this.y2 = this.y2 + this.dy;
        this.x2 = this.x2 + this.dx;

        this.middlex  = (this.x1 > this.x2 ? this.x2: this.x1);
        this.middley  = (this.y1 > this.y2 ? this.y2: this.y1);

        this.bottomy = this.bottomy + this.dy;
        this.draw();
    }


    draw() {
        ctx.beginPath();
        ctx.rect(this.x1,this.y1,20,20);
        ctx.fillStyle = this.color1;
        ctx.fill();
        ctx.strokeRect(this.x1,this.y1,20,20);
        ctx.strokeStyle = "#000000";
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(this.x2,this.y2,20,20);
        ctx.fillStyle = this.color2;
        ctx.fill();
        ctx.strokeRect(this.x2,this.y2,20,20);
        ctx.strokeStyle = "#000000";
        ctx.closePath();
        //ctx.fillStyle = "#fffb00";
        //ctx.fillRect(this.middlex,this.middley,3,3);
        ctx.fillStyle = "#000000";
        ctx.font= ("30px Arial");
        if(!this.stopped) {
            // ctx.fillText(this.stopped+" "+this.x1 + " " + this.middlex + " " + this.y1 + " " + this.middley, this.middlex, this.middley - 40);
            info.innerHTML =
                "\nMiddle X: " +
                this.middlex +
                "\nmiddle Y: " +
                this.middley +
                "\nx1: "+
                this.x1 +
                "\ny1: " +
                this.y1 +
                "\nx2: "+
                this.x2 +
                "\ny2: " +
                this.y2 +
                "\nWidth: " +
                this.width +
                "\nHeight: " +
                this.height +
                "\nCount: " +
                count;
        }
    }

    rotate() {


        let x1 = this.x1;
        let x2 = this.x2;
        let y1 = this.y1;
        let y2 = this.y2;

        if(x1 < x2) {
            x2 = x1;
            y2 = y2 - 20;
            this.switchWidthHeight();
        }
        else if(x1 > x2) {
            x1 = x2;
            y1 = y1 - 20;
            this.switchWidthHeight();
        }
        else if(y2 < y1) {
            y2 = y1;
            x1 = x1 + 20;
            this.switchWidthHeight();
        }
        else if(y2 > y1){
            y1 = y2;
            x2 = x2 + 20;
            this.switchWidthHeight();
        }


        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;

    }
}