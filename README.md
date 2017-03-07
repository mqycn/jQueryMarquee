#jQueryMarquee

一共有三个可选参数，一个回调方法。

```
$(dom).marquee(options, callback);
```

 **options 可选参数：** 
```
options : {
    direction : 'top',
    pixels : 5,
    speed : 30,
}
```

 **direction** 
```
移动方向：
    左：left
    右：right
    上：top
    下：bottom；
```

 **pixels** 

```
每次移动的像素数
```

 **speed** 
```
两次移动之前的间隔时间数（毫秒）
```

调用方法如下：

```
$("scroll-a").marquee();
 
$("scroll-b").marquee({direction:'top'});

$("scroll-c").marquee({direction:'right',pixels:2,speed:30});
 
$("scroll-d").marquee({direction:"bottom",pixels:2,speed:30}, function(){
    console.log("执行了一次");
});
```