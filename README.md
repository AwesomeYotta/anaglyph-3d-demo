# anaglyph-3d-demo  

基于createjs的红蓝3d demo  
![](https://github.com/ndNovaDev/analyph-3d-demo/blob/master/result.png)
原理：左眼图去掉蓝绿通道，右眼图去掉红色通道，然后组合成一张图片
不光createjs，直接操作canvas也是可以实现的。
直接操作dom，并且应用svg filter应该也是可以实现的。

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev


