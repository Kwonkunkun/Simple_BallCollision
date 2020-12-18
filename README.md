# Simple_BallCollision
[클론코딩한 영상](https://www.youtube.com/watch?v=sLCiI6d5vTM)

## 개요
- 위의 영상을 참고하여 html, css, javascript로 공이 화면 및 오브젝트에 충돌시 튕기게 만듬

## 동작
<img width="500" alt="gif" src="https://user-images.githubusercontent.com/59603575/102585452-cfd30d80-414b-11eb-8b38-7f1818d97d6a.gif">

## 추가사항
### 공의 크기, 스피드, 방향, 색을 랜덤으로
```javascript
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
```
### 블록을 드래그해서 사용자가 원하는 곳으로 움직일수 있도록 만듬

```javascript
mouseEvent() {
    //블록 드래그
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
```
