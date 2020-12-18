"use strict";
import { Ball } from "./ball.js";
import { Block } from "./block.js";

const ballColors = ["#f8a5c2", "#f5cd79"];

function randomBoolean() {
    return Math.random() < 0.5 ? 1 : -1;
}

class App {
    constructor() {
        this.init();
    }

    init() {
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        document.body.append(this.canvas);

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.block = new Block(300, 30, 150, 300);

        this.balls = (() => {
            let ret = new Array();
            for (let i = 0; i < 2; i++) {
                ret.push(
                    new Ball(
                        this.stageWidth,
                        this.stageHeight,
                        Math.random() * 30 + 15,
                        randomBoolean() * (Math.random() * 5 + 8),
                        ballColors[i]
                    )
                );
            }
            return ret;
        })();

        console.log(this.balls);

        // this.ball = new Ball(
        //     this.stageWidth,
        //     this.stageHeight,
        //     30,
        //     10,
        //     ballColors[1]
        // );

        //block drag를 추가
        this.mouseEvent();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    mouseEvent() {
        //여기서 한번 비교해보자구
        this.isClicked = false;
        this.mouseX;
        this.mouseY;
        this.canvas.addEventListener("mousedown", (event) => {
            //여기서 block을 잡고 있는건지 확인
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
            if (
                this.block.x < this.mouseX &&
                this.block.maxX > this.mouseX &&
                this.block.y < this.mouseY &&
                this.block.maxY > this.mouseY
            ) {
                console.log("catch block");
                this.isClicked = true;
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
            if (this.isClicked === false) {
                return;
            }
            const dx = event.clientX - this.mouseX;
            const dy = event.clientY - this.mouseY;

            console.log(`${dx}, ${dy}`);
            this.block.init(300, 30, this.block.x + dx, this.block.y + dy);

            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            console.log("move");
        });

        this.canvas.addEventListener("mouseup", () => {
            this.isClicked = false;
        });
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    //재귀적으로 애니메이션 계속 호출해야함..!
    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.block.draw(this.ctx);
        //this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);

        this.balls.forEach((element) => {
            element.draw(
                this.ctx,
                this.stageWidth,
                this.stageHeight,
                this.block
            );
        });

        window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};
