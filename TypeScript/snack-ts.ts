

enum Direction {
    left = 37,
    up = 38,
    right = 39,
    down = 40
}

interface Ops {
    jsSnack: HTMLElement
    jsFood: HTMLElement
    jsBody: HTMLElement
    jsScore: HTMLElement
}

class Snack {
    private jsSnack: HTMLElement
    private jsFood: HTMLElement
    private jsBody: HTMLElement
    private jsScore: HTMLElement
    private timer:number;
    private srr: Array<any> = [];
    private num:number ;
    private jsSnackBody: HTMLElement;
    constructor(ops: Ops | null) {
        this.jsSnack = ops.jsSnack
        this.jsFood = ops.jsFood
        this.jsBody = ops.jsBody
        this.jsScore = ops.jsScore
        this.timer = 0
        this.srr
        this.num = 0
        this.jsSnackBody
    }
    runLeft() {
        if (this.jsSnack.offsetLeft > 0) {
            this.jsSnack.style.left = this.jsSnack.offsetLeft - 1 + "px";
            this.jsSnack.style.top = this.jsSnack.offsetTop + "px";
            //记录小蛇的位置
            this.srr.push([this.jsSnack.offsetLeft, this.jsSnack.offsetTop]);
            this.num++;//记录数组的长度
        }
    }
    runTop() {
        if (this.jsSnack.offsetTop > 0) {
            this.jsSnack.style.top = this.jsSnack.offsetTop - 1 + "px";
            this.jsSnack.style.left = this.jsSnack.offsetLeft + "px";
            //记录小蛇的位置
            this.srr.push([this.jsSnack.offsetLeft, this.jsSnack.offsetTop]);
            this.num++;//记录数组的长度
        }
    }
    runRight() {
        if (this.jsSnack.offsetLeft + this.jsSnack.offsetWidth <= 450) {
            this.jsSnack.style.left = this.jsSnack.offsetLeft + 1 + "px";
            this.jsSnack.style.top = this.jsSnack.offsetTop + "px";
            //记录小蛇的位置
            this.srr.push([this.jsSnack.offsetLeft, this.jsSnack.offsetTop]);
            this.num++;//记录数组的长度
        }
    }
    runBottom() {
        if (this.jsSnack.offsetTop + this.jsSnack.offsetHeight <= 400) {
            this.jsSnack.style.top = this.jsSnack.offsetTop + 1 + "px";
            this.jsSnack.style.left = this.jsSnack.offsetLeft + "px";
            //记录小蛇的位置
            this.srr.push([this.jsSnack.offsetLeft, this.jsSnack.offsetTop]);
            this.num++;//记录数组的长度
        }
    }
    init() {
        //开始游戏
        this.pos()
        setInterval(() => {
            this.eat()
        }, 10);//检测位置碰撞，并且吃掉食物；
        document.onkeydown = (e: KeyboardEvent) => {
            const keycode = e.keyCode;
            switch (keycode) {
                //向左移动
                case Direction.left:
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.runLeft()
                    }, 10)
                    break;
                //向上移动
                case Direction.up:
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.runTop()
                    }, 10);
                    break;
                //向右移动
                case Direction.right:
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.runRight()
                    }, 10);
                    break;
                //向下移动  
                case Direction.down:
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.runBottom()
                    }, 10);
                    break;
            }
        }

    }
    pos() {
        this.jsFood.style.left = Math.floor(Math.random() * (430 - 20 + 1) + 20) + "px";
        this.jsFood.style.top = Math.floor(Math.random() * (380 - 20 + 1) + 20) + "px";
    }
    eat() {
        this.rectangleCrashExamine(this.jsSnack, this.jsFood);
    }
    rectangleCrashExamine(obj1, obj2) {
        const obj1Left = obj1.offsetLeft;
        const obj1Width = obj1.offsetLeft + obj1.offsetWidth;
        const obj1Top = obj1.offsetTop;
        const obj1Height = obj1.offsetTop + obj1.offsetHeight;
        const obj2Left = obj2.offsetLeft;
        const obj2Width = obj2.offsetLeft + obj2.offsetWidth;
        const obj2Top = obj2.offsetTop;
        const obj2Height = obj2.offsetTop + obj2.offsetHeight;
        //检测碰撞
        //碰撞检测原理：
        //蛇在实物的左边、右边、上边、下边的时候，说明没有发生碰撞，那么我们取反，就说明发生碰撞
        if (!(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top)) {
            //碰撞后身体
            this.jsSnackBody = document.createElement("div");
            this.jsSnackBody.setAttribute("class", "body");
            this.jsBody.appendChild(this.jsSnackBody);
            this.pos();//怪物的位置随机变换
            setInterval(() => {
                this.follow()
            }, 10);//身体跟随的定时器
        }
    }
    follow() {
        const bodyNum: any= document.getElementsByClassName("body");
        let place:number = 0;
        this.jsScore.innerHTML = String(bodyNum.length);
        for (var i = 0; i < bodyNum.length; i++) {
            place += 20;
            bodyNum[i].style.left = this.srr[this.num - place][0] + 'px';
            bodyNum[i].style.top = this.srr[this.num - place][1] + 'px';
        }
    }
}
