// 获取时间
window.addEventListener('load', function () {
  // 获取元素
  var date = document.querySelector('.date')
  var sec = document.querySelector('.second')
  setInterval(function () {
    // 获取当前时间
    var d = new Date()
    var year = d.getFullYear() // 获取年
    var month = d.getMonth() + 1 // 获取月
    var day = d.getDate() // 获取日期
    var hour = d.getHours() // 获取小时
    var minute = d.getMinutes() // 获取分钟
    var second = d.getSeconds() // 获取秒

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (hour < 10) day = '0' + hour
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second

    // 拼接字符串
    var date_str = year + ' 年 ' + month + ' 月 ' + day + ' 日 '
    var sec_str = hour + ' : ' + minute + ' : ' + second

    date.innerHTML = date_str
    sec.innerHTML = sec_str
  }, 1000)
})
