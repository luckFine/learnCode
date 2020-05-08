var Direction;
(function (Direction) {
    Direction[Direction["left"] = 37] = "left";
    Direction[Direction["up"] = 38] = "up";
    Direction[Direction["right"] = 39] = "right";
    Direction[Direction["down"] = 40] = "down";
})(Direction || (Direction = {}));
var Snack = /** @class */ (function () {
    function Snack(ops) {
        this.srr = [];
        this.jsSnack = ops.jsSnack;
        this.jsFood = ops.jsFood;
        this.jsBody = ops.jsBody;
        this.jsScore = ops.jsScore;
        this.timer = 0;
        this.srr;
        this.num = 0;
        this.jsSnackBody;
    }
    Snack.prototype.runLeft = function () {
        if (this.jsSnack.offsetLeft > 0) {
            this.jsSnack.style.left = this.jsSnack.offsetLeft - 1 + "px";
            this.jsSnack.style.top = this.jsSnack.offsetTop + "px";
            //记录小蛇的位置
            this.srr.push([this.jsSnack.offsetLeft, this.jsSnack.offsetTop]);
            this.num++; //记录数组的长度
        }
    };
    Snack.prototype.runTop = function () {
        if (this.jsSnack.offsetTop > 0) {
            this.jsSnack.style.top = this.jsSnack.offsetTop - 1 + "px";
            this.jsSnack.style.left = this.jsSnack.offsetLeft + "px";
            //记录小蛇的位置
            this.srr.push([this.jsSnack.offsetLeft, this.jsSnack.offsetTop]);
            this.num++; //记录数组的长度
        }
    };
    Snack.prototype.runRight = function () {
        if (this.jsSnack.offsetLeft + this.jsSnack.offsetWidth <= 450) {
            this.jsSnack.style.left = this.jsSnack.offsetLeft + 1 + "px";
            this.jsSnack.style.top = this.jsSnack.offsetTop + "px";
            //记录小蛇的位置
            this.srr.push([this.jsSnack.offsetLeft, this.jsSnack.offsetTop]);
            this.num++; //记录数组的长度
        }
    };
    Snack.prototype.runBottom = function () {
        if (this.jsSnack.offsetTop + this.jsSnack.offsetHeight <= 400) {
            this.jsSnack.style.top = this.jsSnack.offsetTop + 1 + "px";
            this.jsSnack.style.left = this.jsSnack.offsetLeft + "px";
            //记录小蛇的位置
            this.srr.push([this.jsSnack.offsetLeft, this.jsSnack.offsetTop]);
            this.num++; //记录数组的长度
        }
    };
    Snack.prototype.init = function () {
        var _this = this;
        //开始游戏
        this.pos();
        setInterval(function () {
            _this.eat();
        }, 10); //检测位置碰撞，并且吃掉食物；
        document.onkeydown = function (e) {
            var keycode = e.keyCode;
            switch (keycode) {
                //向左移动
                case Direction.left:
                    clearInterval(_this.timer);
                    _this.timer = setInterval(function () {
                        _this.runLeft();
                    }, 10);
                    break;
                //向上移动
                case Direction.up:
                    clearInterval(_this.timer);
                    _this.timer = setInterval(function () {
                        _this.runTop();
                    }, 10);
                    break;
                //向右移动
                case Direction.right:
                    clearInterval(_this.timer);
                    _this.timer = setInterval(function () {
                        _this.runRight();
                    }, 10);
                    break;
                //向下移动  
                case Direction.down:
                    clearInterval(_this.timer);
                    _this.timer = setInterval(function () {
                        _this.runBottom();
                    }, 10);
                    break;
            }
        };
    };
    Snack.prototype.pos = function () {
        this.jsFood.style.left = Math.floor(Math.random() * (430 - 20 + 1) + 20) + "px";
        this.jsFood.style.top = Math.floor(Math.random() * (380 - 20 + 1) + 20) + "px";
    };
    Snack.prototype.eat = function () {
        this.rectangleCrashExamine(this.jsSnack, this.jsFood);
    };
    Snack.prototype.rectangleCrashExamine = function (obj1, obj2) {
        var _this = this;
        var obj1Left = obj1.offsetLeft;
        var obj1Width = obj1.offsetLeft + obj1.offsetWidth;
        var obj1Top = obj1.offsetTop;
        var obj1Height = obj1.offsetTop + obj1.offsetHeight;
        var obj2Left = obj2.offsetLeft;
        var obj2Width = obj2.offsetLeft + obj2.offsetWidth;
        var obj2Top = obj2.offsetTop;
        var obj2Height = obj2.offsetTop + obj2.offsetHeight;
        //检测碰撞
        //碰撞检测原理：
        //蛇在实物的左边、右边、上边、下边的时候，说明没有发生碰撞，那么我们取反，就说明发生碰撞
        if (!(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top)) {
            //碰撞后身体
            this.jsSnackBody = document.createElement("div");
            this.jsSnackBody.setAttribute("class", "body");
            this.jsBody.appendChild(this.jsSnackBody);
            this.pos(); //怪物的位置随机变换
            setInterval(function () {
                _this.follow();
            }, 10); //身体跟随的定时器
        }
    };
    Snack.prototype.follow = function () {
        var bodyNum = document.getElementsByClassName("body");
        var place = 0;
        this.jsScore.innerHTML = String(bodyNum.length);
        for (var i = 0; i < bodyNum.length; i++) {
            place += 20;
            bodyNum[i].style.left = this.srr[this.num - place][0] + 'px';
            bodyNum[i].style.top = this.srr[this.num - place][1] + 'px';
        }
    };
    return Snack;
}());
