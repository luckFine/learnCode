function Snack(ops) {

    var timer;//创建定时器为全局变量
    var srr = [];//记录蛇行动的位置
    var timer1
    var num = 0;//记录数组的长度
    var jsSnackBody;//么米吃掉一个食物，蛇的身体 


    this.jsDiv = ops.jsDiv
    this.jsSnack = ops.jsSnack
    this.jsFood = ops.jsFood
    this.jsBody = ops.jsBody
    this.jsScore = ops.jsScore
    var self = this
    this.init = function () {
    //开始游戏
        this.pos()
        var self = this
        timer1 = setInterval(self.eat, 10);//检测位置碰撞，并且吃掉食物；
        document.onkeydown = function (e) {
            var evt = e || window.event;
            switch (evt.keyCode) {
                //向左移动
                case 37:
                    clearInterval(timer);
                    timer = window.setInterval(runLeft, 10)
                    function runLeft() {
                        if (self.jsSnack.offsetLeft > 0) {
                            self.jsSnack.style.left = self.jsSnack.offsetLeft - 1 + "px";
                            self.jsSnack.style.top = self.jsSnack.offsetTop + "px";
                            //记录小蛇的位置
                            srr.push([self.jsSnack.offsetLeft, self.jsSnack.offsetTop]);
                            num++;//记录数组的长度
                        }
                    }
                    break;
                //向上移动
                case 38:
                    clearInterval(timer);
                    timer = window.setInterval(runTop, 10);
                    function runTop() {
                        if (self.jsSnack.offsetTop > 0) {
                            self.jsSnack.style.top = self.jsSnack.offsetTop - 1 + "px";
                            self.jsSnack.style.left = self.jsSnack.offsetLeft + "px";
                            //记录小蛇的位置
                            srr.push([self.jsSnack.offsetLeft, self.jsSnack.offsetTop]);
                            num++;//记录数组的长度
                        }
                    }

                    break;
                //向右移动
                case 39:
                    clearInterval(timer);
                    timer = window.setInterval(runRight, 10);
                    function runRight() {
                        if (self.jsSnack.offsetLeft + self.jsSnack.offsetWidth <= 450) {
                            self.jsSnack.style.left = self.jsSnack.offsetLeft + 1 + "px";
                            self.jsSnack.style.top = self.jsSnack.offsetTop + "px";
                            //记录小蛇的位置
                            srr.push([self.jsSnack.offsetLeft, self.jsSnack.offsetTop]);
                            num++;//记录数组的长度
                        }
                    }
                    break;
                //向下移动  
                case 40:
                    clearInterval(timer);
                    timer = window.setInterval(runBottom, 10);
                    function runBottom() {
                        if (self.jsSnack.offsetTop + self.jsSnack.offsetHeight <= 400) {
                            self.jsSnack.style.top = self.jsSnack.offsetTop + 1 + "px";
                            self.jsSnack.style.left = self.jsSnack.offsetLeft + "px";
                            //记录小蛇的位置
                            srr.push([self.jsSnack.offsetLeft, self.jsSnack.offsetTop]);
                            num++;//记录数组的长度
                        }
                    }
                    break;
            }
        }

    }
    this.pos = function() {
        this.jsFood.style.left = parseInt(Math.random() * (430 - 20 + 1) + 20) + "px";
        this.jsFood.style.top = parseInt(Math.random() * (380 - 20 + 1) + 20) + "px";
    }
    this.eat = function () { 
        self.rectangleCrashExamine(self.jsSnack, self.jsFood);
    }
    this.rectangleCrashExamine = function (obj1, obj2) {
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
            jsSnackBody = document.createElement("div");
            jsSnackBody.setAttribute("class", "body");
            this.jsBody.appendChild(jsSnackBody);
            this.pos();//怪物的位置随机变换
            setInterval(this.follow, 10);//身体跟随的定时器
        }        
    }
    this.follow = function () {
        //检查一共添加了多少身体
        var bodyNum = document.getElementsByClassName("body");
        //记录得分
        self.jsScore.innerHTML = bodyNum.length;
        //蛇每次移动1个像素，那么新的身体应该跟随在当前数组的倒数第20个数组的位置;依次加等;
        var place = 0;
        for (var i = 0; i < bodyNum.length; i++) {
            place += 20;
            bodyNum[i].style.left = srr[num - place][0] + 'px';
            bodyNum[i].style.top = srr[num - place][1] + 'px';
        }            
    }
}
