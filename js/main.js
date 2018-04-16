/**
 * Created by Minzer on 2017/7/7.
 */

var oPem = document.getElementById("turnOff");// 护眼模式按钮

var isPem = false;// 节流开关
// 添加点击事件
oPem.addEventListener("click",function () {
  if(!isPem){
    document.body.style.background = "rgb(199,237,204)";
    this.innerText = "普通模式";
    isPem = true;
  }else{
    document.body.style.background = "rgb(255,255,255)";
    this.innerText = "护眼模式";
    isPem = false;
  }
},false);

var oSecond = document.getElementById("second"); // 时间
var oScore = document.getElementById("score");// 分数
var oList1 = document.getElementsByClassName("list1")[0];// 第一张大香蕉图片
var oStart = document.getElementById("start");// 开始游戏按钮
var oUl = document.getElementsByTagName("ul")[0];// ul
var oBack = document.getElementsByClassName("back")[0];// 遮罩层
var oRestart = document.querySelector(".back h1 a");// 重新开始

var nPsec = 30.00;// 时间
var nLevel = 1;// 关卡级别
var nScore = 0;// 得分

// 给开始游戏添加点击事件
oStart.addEventListener("click",function () {
  this.remove();// 开始按钮被移除
  oPem.remove();// 护眼模式按钮被移除
  oList1.remove();// 初始香蕉图片被移除

  // 设定定时器，每10毫秒游戏时间-0.01秒，当时间结束时游戏停止并返回提示结果
  var timer = setInterval(function () {
    (function() {
      nPsec -= 0.01;
      nPsec = nPsec.toFixed(2);// 保留两位小数
      oSecond.innerText = nPsec;
      if(nPsec <= 0){
        clearInterval(timer);// 清除定时器
        if(nScore < 8){
          alert("GAME OVER! 等级：睁眼瞎");
        }else if(nScore < 12){
          alert("GAME OVER! 等级：重度近视");
        }else if(nScore < 20){
          alert("GAME OVER! 等级：火眼金睛");
        }else{
          alert("GAME OVER! 等级：超神");
        }
        oBack.style.display = "block";// 遮罩层显示
      }
    })();
  },10);

  app();// 调用app函数
  /**
   * 定义app方法，游戏主流程函数
   */
  function app(){
    nLevel += 1;// 等级自加
    // 动态创建li，img，并填充到ul里
    for(var i=0;i<nLevel*nLevel;i++){
      var oNewLi = document.createElement("li");
      oNewLi.style.width = 100/nLevel+"%";
      oNewLi.style.float = "left";
      oNewLi.style.backgroundColor = "rgb("+random(50,255)+","+random(50,255)+","+random(50,255)+")";
      var oImg = document.createElement("img");
      oImg.style.display = "block";
      oImg.style.width = "100%";
      oImg.src = "img/1.png";
      oNewLi.appendChild(oImg);
      oUl.appendChild(oNewLi);
    }
    // 随机产生一个放香蕉图片的下标
    var oIndex = random(0,nLevel*nLevel-1);

    var allImg = document.querySelectorAll("img");
    allImg[oIndex].src = "img/2.png";// 改变相应位置图片为香蕉图片

    // 获取到所有li，并给填充了香蕉图片的li添加点击事件
    var allLi = document.querySelectorAll("li");
    allLi[oIndex].addEventListener("click",function () {
      // 点击正确后进入下一关卡，遍历移除所有li
      for(var i=0;i<nLevel*nLevel;i++){
        allLi[i].remove();
      }
      nScore += 1;// 分数自加
      oScore.innerText = nScore;// 分数填充进页面
      // 当等级>10时，不再自增
      if(nLevel>10){
        nLevel = 10;
      }
      // 重新调用app函数，渲染下一关主体部分
      app();
    },false);

  }

},false);

// 给重新开始添加点击事件
oRestart.addEventListener("click",function () {
  oBack.style.display = "none";
  location.replace(location.href);// 网页刷新
},false);


/**
 * 定义产生指定范围内的随机数
 * @param start 开始范围
 * @param end 结束范围
 * @returns {number}
 */
function random(start,end) {
  return Math.round(Math.random()*(end-start)+start);
}



