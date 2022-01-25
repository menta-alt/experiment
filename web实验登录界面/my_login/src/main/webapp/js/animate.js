function animate(obj, target, callback) {  //前面必须要加function关键字
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var step = (target - obj.offsetLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.offsetLeft == target) {
      //停止动画 本质停止定时器
      clearInterval(obj.timer);
      //回调函数写到定时器结束里面
      // if (callback) {
      //   //调用函数
      //   callback();
      // }
      callback && callback();  //短路的思想
    }

    obj.style.left = obj.offsetLeft + step + 'px';

  },15);
}