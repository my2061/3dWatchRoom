

![Untitled.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8274edaf90d34f1f83ded8a19c1556bc~tplv-k3u1fbpfcp-watermark.image?)

## 仓库地址：https://github.com/my2061/3DWatchRoom.git



## 基础概念

```webgl和threeJs的关系？```

###### Three.js是基于原生WebGL封装运行的三维引擎，在所有WebGL引擎中，Three.js是国内文资料最多、使用最广泛的三维引擎。



``关系好比jquery和javascript。``



在ThreeJs里，一个基础的3d世界是由```场景（Scene）```、```相机（Camera）```、```渲染器（renderer）```组成的。

#### 1. 场景

```js
// 创建场景
var scene = new THREE.Scene();
// 后续向场景里添加模型，光源等...
scene.add(xxx);
```

#### 2. 相机

**相机分为两种：**

- 正投影相机：OrthographicCamera

![](http://www.webgl3d.cn/upload/threejs60OrthographicCamera.png)

正交摄像机是一个矩形可视区域，物体只有在这个区域内才是可见的，物体无论距离摄像机是远或事近，物体都会被渲染成一个大小。一般应用场景是2.5d游戏如跳一跳

```js
/**
 * 正投影相机设置
 */
var width = window.innerWidth;      //窗口宽度
var height = window.innerHeight;    //窗口高度
var k = width / height;             //窗口宽高比
var s = 150;                        //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position);      //设置相机方向(指向的场景对象)
```

- 透视投影相机：PerspectiveCamera

透视摄像机是最常用的摄像机类型，模拟人眼的视觉，近大远小（透视）。Fov表示的是视角，Fov越大，表示眼睛睁得越大，离得越远，看得更多。通常用来模拟现实。

```js
var width = window.innerWidth;      		//窗口宽度
var height = window.innerHeight;   		 	//窗口高度
var k = width / height; 								// 渲染窗口的比例
var camera = new THREE.PerspectiveCamera(60, k, 1, 1000); // 相机设置
camera.position.set(200, 300, 200);     // 设置相机在3d空间的位置：x，y，z
camera.lookAt(scene.position);          // 设置相机在目前位置上拍摄角度

PerspectiveCamera( fov, aspect, near, far )
```

| 参数   | 含义                                                         |                 默认值                 |
| ------ | ------------------------------------------------------------ | :------------------------------------: |
| fov    | 表示能看到的角度范围，人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度（比如打吃鸡的第一人称的视角范围） |                   45                   |
| aspect | 表示渲染窗口的长宽比，如果一个网页上只有一个全屏的canvas画布且画布上只有一个窗口，那么aspect的值就是网页窗口客户区的宽高比 | window.innerWidth / window.innerHeight |
| near   | 表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 |                  0.1                   |
| far    | 表示的是距离相机多远的位置截止渲染，如果设置的值偏小，会有部分场景看不到。 |                  1000                  |

![image](http://www.webgl3d.cn/upload/threejs60PerspectiveCamera.png)

#### 3. 渲染器

```js
var renderer = new THREE.WebGLRenderer();       //创建渲染器
renderer.setSize(width, height);                //设置渲染区域尺寸
renderer.setClearColor(0x000000, 1);            //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
renderer.render(scene, camera);                 //传入场景，相机渲染
```

大部分情况不可能只渲染一帧，所以一般处理方法用```requestAnimationFrame```循环渲染

```js
const animate = () => {
    //mesh.rotateY(0.01);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
```

#### 模型

有了场景、相机、渲染器就构建出了一个3d世界了，但是没东西我看啥呀，那么就可以往场景里加一些模型或几何体了。

##### 几何体

WebGL只能绘制```点、线段、三角形```。

所以如果想绘制出来一个圆形或者几何体是非常复杂的，好在ThreeJs直接封装好了一些常用的几何体。

```js
//长方体 参数：长，宽，高
var geometry = new THREE.BoxGeometry(100, 100, 100);
// 球体 参数：半径60  经纬度细分数40,40
var geometry = new THREE.SphereGeometry(60, 40, 40);
// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
var geometry = new THREE.CylinderGeometry( 50, 50, 100, 25 );
// 正八面体
var geometry = new THREE.OctahedronGeometry(50);
// 正十二面体
var geometry = new THREE.DodecahedronGeometry(50);
// 正二十面体
var geometry = new THREE.IcosahedronGeometry(50);
```

这里我们需要用到的是球体内贴3D场景图，所以了解一些球体网格模型的参数设置等。

| 参数           | 含义                     |
| -------------- | ------------------------ |
| radius         | 球体半径                 |
| widthSegments  | 控制球面精度，水平细分数 |
| heightSegments | 控制球面精度，垂直细分数 |


#### 材质

有了几何体后后，我们可以设置材质。

http://www.webgl3d.cn/Three.js/

```js
var material = new THREE.MeshLambertMaterial({
    color: 0xffffff, //颜色
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中
```

##### 模型

实际开发中，大多数项目，通常是3D美术设计师或建筑、机械等行业工程师提供的由3dmx、blender、substence、Solidworks等软件创建好的三维模型文件。

格式：.STL、FBX、GLTF文件等等...，不同的文件需要不同的加载器去加载。

模型下载：
国外：https://sketchfab.com/ 
国内：https://www.ddd.online/
...


#### 光源

- 点光源（一束光、手电筒）

```js
var point = new THREE.PointLight(0xffffff); //光的颜色
point.position.set(400, 200, 300);          //点光源位置
scene.add(point);                           //将给点光源添加到场景中
```

- 环境光（太阳光）

```js
var ambient = new THREE.AmbientLight(0xff0000); //光的颜色
scene.add(ambient);                             //添加到场景中
```

## 开始构建3D世界

#### 1. 创建场景 

```js
var scene = new THREE.Scene();
```

#### 2. 创建透视相机 

```js
//相机设置
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比

//透视投影相机
var camera = new THREE.PerspectiveCamera(60, k, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
```

#### 3. 渲染器
```js
// 渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);                //设置渲染区域尺寸
renderer.setClearColor(0x000000, 1);            //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
```

#### 4. 创建模型（球体）

```js
var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
```

#### 5. 加载全景图纹理

```js
 // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
 var textureLoader = new THREE.TextureLoader();
 textureLoader.load('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fres.jsvry.cn%2Fprod%2Farticle%2F2020%2F07%2F20%2F161737xwg97sq.jpg&refer=http%3A%2F%2Fres.jsvry.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658393648&t=656528b7e11f6059faef55b13a6f508f', function (texture) {
    var material = new THREE.MeshLambertMaterial({
        // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
        map: texture,//设置颜色贴图属性值
        side: THREE.DoubleSide //设置渲染模式，里面还是外面，还是双面
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
})
```

#### 6. 设置光源（只需要环境光）

```js
var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);
```

#### 7. 设置相机位置

```js
// 摄像机放球体中心
camera.position.set(10, 0, 0);
```

#### 8. 控制器

光有画面，我想拖拉拽咋办？绑定鼠标事件？然后再控制position、scale等等？

threeJs内置了轨道控制器：```OrbitControls```

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 将相机、渲染器的dom传给轨道控制器即可
const controls = new OrbitControls(camera, renderer.domElement);
// 轨道控制器缩放上限最小最大值设置为1、2
controls.minDistance = 1;
controls.maxDistance = 2;
```

#### 9. 性能监控-stats.js

**https://github.com/mrdoob/stats.js**

```js
import Stats from "stats.js"
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
stats.begin();
// 被监控的代码放在这里
stats.end();
document.body.appendChild(stats.dom);
```

| 参数           | 解释                     |
| -------------- | ------------------------ |
| FPS         | 在最后一秒渲染的帧。数字越高越好。      |
| MS  | 毫秒需要渲染一个帧。数字越低越好。 |
| MB | 分配的内存大小。 |
|CUSTOM | 自定义面板支持。 |

#### 10. 渲染

```js
//执行渲染操作
const animate = () => {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animate);
}
animate();
```

