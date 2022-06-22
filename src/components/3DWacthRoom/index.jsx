import React, { useRef, useEffect } from 'react'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from "stats.js"

export default function Index() {
    const threeWrapper = useRef();

    useEffect(() => {
        initThree();
    }, []);

    function initThree() {
        //创建场景对象Scene
        var scene = new THREE.Scene();

        //光源设置
        //点光源
        // var point = new THREE.PointLight(0xffffff);
        // point.position.set(400, 200, 300); //点光源位置
        // scene.add(point); //点光源添加到场景中
        // //环境光
        var ambient = new THREE.AmbientLight(0xffffff);
        scene.add(ambient);

        //相机设置
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比

        //透视投影相机
        var camera = new THREE.PerspectiveCamera(60, k, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

        // 创建几何体模型
        var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象

        // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
        var textureLoader = new THREE.TextureLoader();
        // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        textureLoader.load('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fres.jsvry.cn%2Fprod%2Farticle%2F2020%2F07%2F20%2F161737xwg97sq.jpg&refer=http%3A%2F%2Fres.jsvry.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658393648&t=656528b7e11f6059faef55b13a6f508f', function (texture) {
            var material = new THREE.MeshLambertMaterial({
                // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
                map: texture,//设置颜色贴图属性值
                side: THREE.DoubleSide //设置渲染模式，里面还是外面，还是双面
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            scene.add(mesh); //网格模型添加到场景中
        })

        
        // 摄像机放球体中心
        camera.position.set(10, 0, 0);                  

        // 控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        // 轨道控制器缩放上限最小最大值设置为1、2
        controls.minDistance = 1;
        controls.maxDistance = 2;

        // 性能监测
        var stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        threeWrapper.current.appendChild(stats.dom);

        // 渲染器
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);                //设置渲染区域尺寸
        renderer.setClearColor(0x000000, 1);            //设置背景颜色
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
  
         //执行渲染操作
         const animate = () => {
            stats.begin();
            renderer.render(scene, camera);
            stats.end();
            requestAnimationFrame(animate);
        }
        animate();
    }

    return (
        <div className="three-wrapper" ref={threeWrapper}></div>
    )
}
