window.addEventListener('load', function () {
  //1、获取元素
  var arrow_l = document.querySelector('.arrow-l')
  var arrow_r = document.querySelector('.arrow-r')
  var focus = document.querySelector('.focus')
  var focusWidth = focus.offsetWidth

  //2、鼠标经过focus 就显示隐藏的左右按钮
  focus.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block'
    arrow_r.style.display = 'block'
    clearInterval(timer)
    timer = null //清除定时器变量,让图片静止
  })
  //鼠标离开focus 就隐藏左右按钮
  focus.addEventListener('mouseleave', function () {
    arrow_l.style.display = 'none'
    arrow_r.style.display = 'none'
    timer = setInterval(function () {
      //手动调用点击事件
      arrow_r.click()
    }, 3500)
  })

  // 3、动态生成小圆圈，有几张图片就有几个小圆圈
  var ul = focus.querySelector('ul')
  var ol = focus.querySelector('.circle')
  for (var i = 0; i < ul.children.length; i++) {
    // 创建小li
    var li = document.createElement('li')
    // 用自定义属性记录当前小圆圈的索引号
    li.setAttribute('index', i)
    // 把小li插入到ol 里面
    ol.appendChild(li)

    // 4、小圆圈的排他思想，我们可以直接在生成小圆圈的同时直接绑定事件
    li.addEventListener('click', function () {
      // 干掉所有人 ，把所有的小li 清除current 类名
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      //留下我自己 当前的小li设置current属性
      this.className = 'current'

      // 5、点击小圆圈，移动图片 移动的是ul 不是li
      // 当我们点击了某个小li，就拿到当前li 的索引号
      var index = this.getAttribute('index')
      num = index //没有这句话图片不会跟着小圆点变化
      circle = index //没有这句话小圆点不会跟着变化
      animate(ul, -index * focusWidth)
    })
  }

  //把 ol 里面的第一个小li设置类名为 current
  ol.children[0].className = 'current'

  //6、克隆第一张图片放到ul最后,写在生成li的后面
  var first = ul.children[0].cloneNode(true)
  ul.appendChild(first)

  // 7、点击右侧按钮，图片滚动一张
  var num = 0
  // circle 控制小圆圈的播放
  var circle = 0
  // flag节流阀
  var flag = true
  arrow_r.addEventListener('click', function () {
    if (flag) {
      flag = false
      // 如果走到了最后一张复制的图片，此时ul要快速复原left为0
      if (num == ul.children.length - 1) {
        ul.style.left = 0
        num = 0
      }
      num++
      animate(ul, -num * focusWidth, function () {
        flag = true // 只有一张图片播放完了才展示下一张，点击多快都没有用
      })

      circle++
      //如果circle=4，说明走到克隆的那张图片了
      if (circle == ol.children.length) {
        circle = 0
      }

      circleChange()
    }
  })

  // 8.左侧按钮
  arrow_l.addEventListener('click', function () {
    if (flag) {
      flag = false
      if (num == 0) {
        num = ul.children.length - 1 //num=3
        ul.style.left = -num * focusWidth + 'px'
      }
      num--
      animate(ul, -num * focusWidth, function () {
        flag = true
      })

      circle-- //circle为序号
      // if (circle < 0) {
      //   circle = ol.children.length - 1;  //circle=2
      // }
      circle = circle < 0 ? ol.children.length - 1 : circle

      circleChange()
    }
  })

  function circleChange() {
    // 先清除其他小圆圈的current类名，
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = ''
    }
    // 当前的留下current
    ol.children[circle].className = 'current'
  }

  //自动播放模块
  var timer = setInterval(function () {
    //手动调用点击事件
    arrow_r.click()
  }, 2000)
})
