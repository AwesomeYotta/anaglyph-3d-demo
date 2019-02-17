
import './assets/css/style.scss'

const testImg = require('./assets/img/test2.jpg')


const stage = new createjs.Stage('gameView');
(<HTMLCanvasElement>stage.canvas).width = window.innerWidth;
(<HTMLCanvasElement>stage.canvas).height = window.innerHeight


const container = new createjs.Container()
container.compositeOperation = 'lighter'
stage.addChild(container)


const img1 = new createjs.Bitmap(testImg)
container.addChild(img1)

const img2 = new createjs.Bitmap(testImg)
container.addChild(img2)

createjs.Ticker.addEventListener('tick', () => {
    stage.update()
})


var img = new Image()
img.onload = () => {
    img1.filters = [
        new createjs.ColorFilter(0, 1, 1, 1, 0, 0, 0)
    ]
    img1.cache(0, 0, img.width, img.height)
    img2.filters = [
        new createjs.ColorFilter(1, 0, 0, 1, 0, 0, 0)
    ]
    img2.cache(0, 0, img.width, img.height)
    img1.x = img.width / 2 
}
img.src = testImg
