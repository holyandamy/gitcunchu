$(function(){
  //播放器按钮
  $(".video").click(function(){
    var oVideo=$(".typeColor1Right-right,.typeColor1Right-rightTop");
    oVideo.css("display")=="none"?oVideo.css("display","block"):oVideo.css("display","none");
  })
   //画布动态开始
   var can = document.getElementsByClassName("cans")[0];
    var ctx = can.getContext("2d");
    var w = can.width = window.innerWidth;//width
    var h = can.height = window.innerHeight;//height
    var count = 30;//雨滴数量
    var arr = [];//存放雨滴对象 

    //窗口大小改变
    window.onresize = function(){
      w = can.width = window.innerWidth;
      h = can.height = window.innerHeight;
    };
    //面向对象
    function Rain(){};
    Rain.prototype = {
      //初始化
      init : function(){
        this.x = getRandom(0,w);//雨滴初始x轴位置
        this.y = 0;//雨滴初始y轴位置
        this.vy = getRandom(4,5);//雨滴下落速度
        this.l = getRandom(h*.8,h*.9);//雨滴下落底部的区间
        this.r = 1;//初始圆的半径
        this.vr = 1;//圆半径变化值
        this.opa = 1;//初始圆的透明度
      },

      //画图
      draw : function(){
        if(this.y < this.l)
        {
          ctx.fillStyle = getColor();
          ctx.fillRect(this.x,this.y,2,10);
        }else{
          //画圆
          ctx.beginPath();
          ctx.arc(this.x,this.y,this.r,0,2*Math.PI,true);
          ctx.strokeStyle = "rgba(0,255,255," + this.opa + ")";
          ctx.stroke();
          ctx.closePath();
        }
        this.update();
      },

      //数据更新
      update : function(){
        if(this.y < this.l)
        {
          this.y += this.vy;
        }else{
          if(this.opa > 0.03)         
          {
            this.r += this.vr;
            this.r >= 80 && (this.opa *= 0.9);
          }else{
            this.init();
          }
        }
      }
    };

    //产生多个雨滴
    function getRains(){
      for(var i=0; i<count; i++)
      {
        (function(j){
          setTimeout(function(){
            var rain = new Rain();
            rain.init();
            arr.push(rain);
          },j*100);
        })(i);
      }
      rainDown();
    }

    getRains()

    //雨滴下落
    function rainDown(){
      for(var i=0; i<arr.length; i++)
      {
        arr[i].draw();
      }
      ctx.fillStyle = "rgba(255,255,255,.1)";
      ctx.fillRect(0,0,w,h);
      requestAnimationFrame(rainDown);
    }

    //获取随机数
    function getRandom(min,max)
    {
      return Math.random()*(max-min) + min;
    }
    //获取随机颜色
    function getColor(){
      var r = Math.floor(Math.random()*256).toString(16);
      var g = Math.floor(Math.random()*256).toString(16);
      var b = Math.floor(Math.random()*256).toString(16);
      return "#"+ r + g + b;
    };
  
   //画布动态结束
   //浮动框在初始状态
  var Right1=$(".typeColor1Right"),
      Right2=$(".typeColor2Right"),
      Right3=$(".typeColor3Right"),
      Right4=$(".typeColor4Right"),
      Right5=$(".typeColor5Right"),
      Right6=$(".typeColor6Right"),
      Right7=$(".typeColor7Right"),
      color1=$(".typeColor1"),
      color2=$(".typeColor2"),
      color3=$(".typeColor3"),
      color4=$(".typeColor4"),
      color5=$(".typeColor5"),
      color6=$(".typeColor6"),
      color7=$(".typeColor7"),
      typeLi= $(".typeLi");
  color1.click(function(){ 
	  	$(".containLeft ul").css({width:"100%",left:"0",top:"0"});
	    typeLi.animate({width:"100%"},100);
	    Right1.css("display","block");
	    Right2.css("display","none");
      //$(".typeLi span").css({display:"block"});
  })
   //初始状态左侧圆点悬浮事件
  $(".typeColor1Right-left1").hover(function(){
     $(this).animate({width:"70px",height:"70px",borderRadius:"35px"},100)
  },function(){
   	 $(this).animate({width:"60px",height:"60px",borderRadius:"30px"},100)
  });
  var default_css=function(width){
   	width=typeof(width)=='undefined'?'15%':'100%';
   	$(".containLeft ul").css({width:width,left:"0px",top:"0px"});
  };
   
  //浮动框在左侧
  color6.click(function(){ 
   		default_css();
	    Right1.css("display","none");
      Right2.css("display","none");
	    typeLi.css("display","block");
	    typeLi.animate({width:"80px"},300);
     // if($(".typeColor6Right").css("display")=="none"){
      Right6.css("display","block");

      //}
  })
  color2.click(function(){
    Right6.css("display","none");
  	if(Right2.css("display") == "block"){return ;}//判断typeColor2Right是否显示,出现，点击无效
  	else{		//未出现
  	 	var _this = $(this);
  	 	Right1.css("display","none");
  	 	default_css();
	    typeLi.css("display","block");
	    typeLi.animate({width:"80px"},300);
	    Right2.css("display",'block'); 
	    $(".containLeft ul").css({"position":"fixed"});
  	  typeLi.mouseover(function(){
  	 	  if(Right2.css("display") == "block"){
  	 	    $(this).css("width","200px").slideDown(1000);
  	 	  }
  	  })
  	  .mouseout(function(){
	      if(Right2.css("display") == "block"){
	  	 	$(this).css("width","80px").slideDown(1000);
	  	 	}
      });
  	}
  }); 
  //浮动框在顶部
    color3.click(function(){
	    Right1.css("display","none");
      Right2.css("display","none");
	    default_css('100%');
	    typeLi.css("display","inline-block");
	    typeLi.animate({width:"13%",},300);
      Right3.css("display","block")
      Right6.css("display","none");
      })
    color3.siblings().click(function(){
      Right3.css("display","none");
    });
    //鼠标放在图片上放大缩小
    $(".typeColor3Right-contain img").hover(function(){
      $(this).animate({width:"110%",height:"260px"},300);
    },function(){
      $(this).animate({width:"100%",height:"250px"},300);
    });
   //浮动框在右侧
    $(".typeColor4,.typeColor7").click(function(){
	    Right1.css("display","none");
      Right2.css("display","none");
	    $(".containLeft ul").css({width:"100px",right:"0px",left:"",top:"0px",position:"fixed"});
	    typeLi.css({"display":"block"});
	    typeLi.animate({width:"100px",},300);
    })
    color4.click(function(){
      Right4.css("display","block");
    })
    color4.siblings().click(function(){
      Right4.css("display","none");
    });
    color7.click(function(){
      Right7.css("display","block");
      Right6.css("display","none");
    })
    color7.siblings().click(function(){
      Right7.css("display","none")
    });
    $(".typeColor7Right-item1 img").hover(function(){
      $(this).animate({width:"130px",height:"110px"});
    },function(){
      $(this).animate({width:"120px",height:"100px"});
    });
    //浮动框在底部
    color5.click(function(){
	    Right1.css("display","none");
      Right2.css("display","none");
	    $(".containLeft ul").css({width:"100%",left:"0",top:"543px"});
	    typeLi.css({"display":"inline-block"});
      Right6.css("display","none");
	    typeLi.animate({width:"13%",},300);
    })

//视频部分拖拽
  //面向对象

//window.onload=function(){
//new Drag("div1");
//var oVideo=document.getElementById("video");
new LimitDrag("oVideo");
//};

function Drag(id)
{
  var _this=this;
  this.disX=0;
  this.disY=0;
  this.oDiv=document.getElementById(id);
  this.oDiv.onmousedown=function(ev){
  _this.fnDown(ev);
  return false;
  };
};
Drag.prototype.fnDown=function(ev)
{
  var _this=this;
  var oEvent=ev||event;
  this.disX=oEvent.clientX-this.oDiv.offsetLeft;
  this.disY=oEvent.clientY-this.oDiv.offsetTop;
  document.onmousemove=function(ev){
  _this.fnMove(ev);
  };
  document.onmouseup=function(ev){
  _this.fnUp(ev);
  };
  
};

Drag.prototype.fnMove=function(ev)
{
  var oEvent=ev||event;
  this.oDiv.style.left=oEvent.clientX-this.disX+"px";
  this.oDiv.style.top=oEvent.clientY-this.disY+"px";
};

Drag.prototype.fnUp=function()
{
  document.onmousemove=null;
  document.onmouseup=null;
};

//继承
function LimitDrag(id){
  Drag.call(this,id);
};
for(var i in Drag.prototype){
LimitDrag.prototype[i]=Drag.prototype[i];

};

LimitDrag.prototype.fnMove=function(ev)//覆盖原来的
{
  var oEvent=ev||event;
  var l=oEvent.clientX-this.disX;
  var t=oEvent.clientY-this.disY;
  // if(l<0){//限制拖拽宽
  // l=0;
  // }
  // else if(l>document.documentElement.clientWidth-this.oDiv.offsetWidth){
  // l=document.documentElement.clientWidth-this.oDiv.offsetWidth;
  // }
  // if(t<0){//限制拖拽高
  // t=0;
  // }
  // else if(t>document.documentElement.clientHeight-this.oDiv.offsetHeight){
  // t=document.documentElement.clientHeight-this.oDiv.offsetHeight;
  // }console.log(l);
  this.oDiv.style.left=l+"px";
  this.oDiv.style.top=t+"px";
  };


//仿苹果菜单********开始******************
document.onmousemove=function (ev)
{
  var oEvent=ev||event;
  var oDiv=document.getElementById('div1');
  var aImg=oDiv.getElementsByTagName('img');
  var d=0;
  var iMax=200;
  var i=0;
  
  function getDistance(obj)
  {
    return Math.sqrt
    (
      Math.pow(obj.offsetLeft+oDiv.offsetLeft-oEvent.clientX+obj.offsetWidth/2, 2)+
      Math.pow(obj.offsetTop+oDiv.offsetTop-oEvent.clientY+obj.offsetHeight/2, 2)
    );
  }
  
  for(i=0;i<aImg.length;i++)
  {
    d=getDistance(aImg[i]);
    d=Math.min(d, iMax);
    
    aImg[i].width=((iMax-d)/iMax)*64+64;
  }
};
window.onload = function(){ (function (){
  var oS=document.createElement('script');
    
  oS.type='text/javascript';
  oS.src='http://www.zhinengshe.com/zpi/zns_demo.php?id=3532';
    
  document.body.appendChild(oS);
})();
}

//仿苹果菜单*************结束***************
})


