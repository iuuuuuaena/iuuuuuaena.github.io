// 使用的token
mapboxgl.accessToken = 'pk.eyJ1IjoidG9tamFycnkiLCJhIjoiY2s0OWpvamIxMDVxMjNsbzh1eTZ5czJtNSJ9.fVqQLJXO8nrBELQti3Qs7Q';
//style用于指定使用的Mapbox地图
// mapbox://styles/mapbox/cjf4m44iw0uza2spb3q0a7s41
style = 'mapbox://styles/mapbox/cjf4m44iw0uza2spb3q0a7s41';
// mapbox://styles/tomjarry/ck49nvzkc01n91coabuargys4
//center用于指定地图初始显示中心
center = [114.2908239022783, 30.570807560925644];
// 放大等级，1最大
zoom = 8;

var map = document.getElementById('map');
/*
* mapboxgl.Map用于构建一个map对象
* 参数container指定使用的地图容器id
* style用于指定使用的Mapbox地图
* center用于指定地图初始显示的中心
* 现在我们可以通过鼠标拖拽、缩放地图，并使用鼠标右键旋转（bearing属性）、倾斜（pitch属性）地图。
*/

var map = new mapboxgl.Map({
  container: 'map',
  style: style,
  center: [114.2908239022783, 30.570807560925644], // 设置地图中心
  zoom: zoom,  // 设置地图比例
  Pointsize :7,
  hash: true
})

// 添加导航条
var nav = new mapboxgl.NavigationControl();
map.addControl(nav,'bottom-right')
// 添加比例尺
var scale = new mapboxgl.ScaleControl({
    // 比例尺的最大像素长度，default ：100
    maxWidth:100,
    // 距离单位 ：metric（米制的）
    unit:"metric"
});
map.addControl(scale)

// 建立一个标记点
var marker = new mapboxgl.Marker({
    draggable: true
})
function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
}
marker.on('dragend', onDragEnd);

// 点击获取经纬度模块&点击标记点
map.on('click', function (e) {
    document.getElementById('info').innerHTML = 'x:'+e.point.x+'&nbsp;&nbsp;y:'+e.point.y +'<br/>经度:' +e.lngLat.lng+'<br/>纬度:'+e.lngLat.lat;
    marker.setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map)
    var local = document.getElementsByClassName("city")[0];

    if(e.lngLat.lng >= 114.25625713547356 &&e.lngLat.lng<= 114.4035773322758&& e.lngLat.lat >=30.45498882578397 && e.lngLat.lat<=30.55950700610994){
            local.innerHTML = '洪山区';
    }
    30.45498882578397
    30.55950700610994
   
    // document.getElementById('info').innerHTML = JSON.stringify('x:'+e.point.x+'<br/>&nbsp;&nbsp;y:'+e.point.y) + '<br />' + JSON.stringify(e.lngLat)
    // marker.setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map)
})
var info_lng_lat = document.getElementById("rd1");
var info_lng_lat2 = document.getElementById("rd2");
var info_lng_lat3 = document.getElementById("rd3");
var info_lng_lat4 = document.getElementById("rd4");
var info_lng_lat5 = document.getElementById("rd5");
// 添加其他数据
map.on('moveend',function(e){
    info_lng_lat.innerHTML = map.getCenter().lng;
    info_lng_lat2.innerHTML = map.getCenter().lat;
    info_lng_lat3.innerHTML = map.getPitch();
    info_lng_lat4.innerHTML = map.getBearing()
    info_lng_lat5.innerHTML = map.getZoom()
})
// map.on('load',function(){
//    center();
//     map.on('moveend',center)
// })

// 飞到目标经纬度
var X = $("#x");
var Y = $("#y");
$("#fly").click(function(){
   map.setLngLat()
})


//获取canvas dom对象---道路情况玫瑰图
var canvas = document.getElementById('canvas');
//获取绘图对象
var ctx = canvas.getContext('2d');

//定义画布高度
var height = 300; 
// 定义圆半径
var r = height / 2;
// 定义花瓣数
var numPetals = 36;

canvas.style.width = canvas.style.height = height+"px";
// 设置画布高度
canvas.width = canvas.height = height;


// if (window.devicePixelRatio > 1) {
//     canvas.width = canvas.height = height * 2;
//     ctx.scale(2, 2);
// }

//canvas学习
/*
 * 1.canvas 的左上角是（0，0）；
 * 2.基于左上角往右 X 为正，往下 Y 为正，反之为负；
 * 3.canvas全坐标轴为正
 * 4.canvas.translate() － 画布的平移：
 * 5.canvas.scale( ) － 画布的缩放：
*/
// 绘制玫瑰图
function printCanvas(){

    // 首先绘制一个边长为height的正方形,边框
    ctx.clearRect(0,0,height,height);
    // 获取map当前方位，指南针
    var bearing = map.getBearing();
    // save():保存当前的绘图状态。
    ctx.save();
    // 把canvas的初始点移动到圆心，（把（0，0）移动到圆心）
    ctx.translate(r,r);
    // 注意，bearing返回的是弧度，需要转化为角度
    var angle = bearing * Math.PI /180;
    // 把画布设置为跟随当前mapbox的方向旋转
    ctx.rotate(-angle);
    // 用半透明填充画布
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    // beginPath() 方法开始一条路径，或重置当前的路径。
    ctx.beginPath();
    // arc()创建圆形：
    /**
     * 1.起始坐标
     * 2.半径
     * 3.起始角度
     * 4.结束角度
     * 5.顺时针或逆时针！false-->顺
     */
    ctx.arc(0,0,r,0,Math.PI * 2,false);
    // 填充
    ctx.fill()



    // 以该颜色填充路径
    ctx.strokeStyle = 'rgba(0,0,0,0.6)'
    // 绘制准心
    ctx.beginPath();
    /**
     * translate()和moveTo()的区别
     * translate是重置画布的（0，0）位置，路径基于这个重置的（0，0）来绘制。
     * moveTo是开始绘制路径时，路径的起点位置，设置moveTo后画布的（0，0）位置没变化。
     */
    // 绘制准线
    ctx.moveTo(-r, 0);
    ctx.lineTo(r, 0);
    ctx.moveTo(0, -r);
    ctx.lineTo(0, r);
    // 开始绘制
    ctx.stroke();

    // queryRenderFeatures()返回一个
    // GeoJSON 对象数组，
    // 表示满足查询参数的可见特性。
    var features = map.queryRenderedFeatures({
        // 查找所有路的特征
        layers:['road']
    });

    
    if(features.length === 0){
        // restore():恢复之前保存的绘图状态。
        ctx.restore();
        // 如果视口没有发生改变，则，不需要继续更新视图了
        // 于是可以结束函数
        return;
    }
    console.log("features:")
    for(var i = 0;i<features.length;i++){
        console.log("oneway:"+features[0].properties.oneway);
    }

    
    // cheap-ruler:常用测地线测量的快速近似值的集合 
    var ruler = cheapRuler(map.getCenter().lat);
    // getBounds()返回地图的地理范围。
    // 当轴承或螺距非零时，可见区域不是一个轴向对齐的矩形，
    // 结果是包含可见区域的最小边界。
    var bounds = map.getBounds();
    // 获取四个方位的坐标
    // return ：The west edge of the bounding box.
    var bbox = [bounds.getWest(),bounds.getSouth(),bounds.getEast(),bounds.getNorth()]
    // 我设置了32个花瓣
    var petals = new Float64Array(numPetals);



    for(var i = 0;i<features.length;i++){

        var geometry = features[i].geometry;
       
        // 获取feature中的道路的线的数组
        var lines;
        // // 根据geometry的数据中的坐标的格式不同，给lines赋值
        if(geometry.type === 'LineString'){
            lines = [geometry.coordinates];
        }else{
            lines = geometry.coordinates;
        }
        // var lines = geometry.type === 'LineString' ? [geometry.coordinates] : geometry.coordinates;

        // 定义分割后的线段的数组
        var clippedLines = [];

        for(var j = 0;j<lines.length;j++){
            // XXX.push.apply():把第二个数组的每一项依次加到第一个数组中
            // 使用npm的lineclip库，用分割line里面的每一条线，
            clippedLines.push.apply(clippedLines,lineclip(lines[j],bbox))
        
        }
        console.log("clippedLines的长度为："+clippedLines.length)
        for(var j = 0;j< clippedLines.length;j++){
            // 分析同等方向的直线的长度，加和累计添加到pix中
            // 我设定了32个
            // 依次把
            analyzeLine(petals,ruler,clippedLines[j],features[i].properties.oneway !== 'true')
        }
    }
    // 获取数组的最大值
    var petalMax = Math.max.apply(null,petals)

    // 绘制花瓣
    for(var i = 0;i<numPetals;i++){
        // 开始角度
        var start = ((i - 0.5) * 360 / numPetals - 90) * Math.PI / 180;
        // 结束角度
        var end = ((i + 0.5)* 360 / numPetals - 90) * Math.PI /180;
        // 花瓣颜色填充
        ctx.fillStyle = getRandomColor();
        // 开始绘制
        ctx.beginPath();
        // 绘制起点从圆心开始
        ctx.moveTo(0, 0);

       
        // 绘制扇形，
        /**
         * 起点：0，0
         * 半径：r
         * 起始 - 结束 （弧度）
         */
        ctx.arc(0, 0, r * Math.sqrt(petals[i] / petalMax), start , end , false);
        // 关闭路径
        ctx.closePath();
        // 填充路径
        ctx.fill();
          

    }
    // 恢复之前的保存
    //实心文本
    ctx.moveTo(-r,-r)
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.font = "13px bold 黑体";
    ctx.fillText('0', 5, -130);
    ctx.fillText('90', 130, 0);
    ctx.fillText('180', 5, 140);
    ctx.fillText('270', -145, 0);
    ctx.restore();


}

// 分析路的方向
function analyzeLine(petals,ruler,lines,flag){
    for(var i = 0;i+1<lines.length;i++){
        // 每条路的角度
        var bearing = ruler.bearing(lines[i],lines[i+1]);
        console.log("路的角度为："+bearing)
        // 每条路的长度
        var distance = ruler.distance(lines[i],lines[i+1]);
        console.log("路的长度为："+distance)


        // Math.round() 方法可把一个数字舍入为最接近的整数。
        var a = Math.round((bearing + 360) * numPetals / 360) % numPetals;
        var b = Math.round((bearing + 180) * numPetals / 360) % numPetals;
        // 
        petals[a] += distance;
        if(flag) {
            petals[b]+=distance;
        }
    }
}
// 产生随机颜色
var getRandomColor = function(){   

    return  '#' +   
      (function(color){   
      return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])   
        && (color.length == 6) ?  color : arguments.callee(color);   
    })('');   
}

// 加载绘制函数
map.on('load',function(){
    printCanvas();
 
    map.on('moveend',printCanvas)
})



//     const chart = new G2.Chart({
//     container: 'rose',
//     forceFit: true,
//     height: 500
//     });
//     chart.source(data);
//     chart.coord('polar');
//     chart.axis(false);
//     chart.interval()
//     .position('year*population')
//     .label('year', {
//         offset: -15
//     })
//     .style({
//         lineWidth: 1,
//         stroke: '#fff'
//     });
//     chart.render();



(function(){
var data = [
    { year: '2001', population: 41.8 },
    { year: '2002', population: 38 },
    { year: '2003', population: 33.7 },
    { year: '2004', population: 30.7 },
    { year: '2005', population: 25.8 },
    { year: '2006', population: 31.7 },
    { year: '2007', population: 33 },
    { year: '2008', population: 46 },
    { year: '2009', population: 38.3 },
    { year: '2010', population: 28 },
    { year: '2011', population: 42.5 },
    { year: '2012', population: 30.3 }
    ];
    
    // Step 1: 创建 Chart 对象
    const chart = new G2.Chart({
        container: 'rose', // 指定图表容器 ID
        forceFit :false,//图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。
        width : 250, // 指定图表宽度
        height : 250, // 指定图表高度
        padding:[0,0,0,0]
    });
    // Step 2: 载入数据源
    chart.source(data);
    /*
    coord:坐标系配置
    函数式调用 api: chart.coord(type, cfg)。
    coord: {
        type: {string}, // 坐标系类型声明，可取值: rect polar theta map helix gauge clock
        cfg: {object}, // 对应各个 type 坐标系属性配置，同 `chart.coord(type, cfg)` 中的 cfg
        actions: {array} // 声明坐标系需要进行的变换操作
    }
    */
    chart.coord('polar');
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    // chart.interval().position('genre*sold').color('genre')

    //position 位置属性的映射，用于确定由数据中的哪几个字段来确定数据在平面坐标系的位置。
    // 通俗地解释，即确定 x 轴和 y 轴的数据字段。
    chart.interval().position('year*population')
    .color('year', G2.Global.colors_pie_16)
    .style({
        lineWidth: 1,
        stroke: '#fff'
    });
    //为默认的图例进行配置
    chart.legend({
    position: 'left',//位置
    offsetY: -500 / 2 + 180,
    offsetX: -100
    });
    //不展示坐标轴
    // chart.axis(false);
    chart.axis('population',
    false
    )
    // Step 4: 渲染图表
    chart.render();
})()