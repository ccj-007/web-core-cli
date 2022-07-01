; (function (window, document) {
  var sizeUI = 375 // 定义设计图尺寸
  var remBase = 37.5 // 定义基准值
  var docEl = document.documentElement
  var bodyEl = document.querySelector('body')

  setRemUnit()

  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) setRemUnit()
  })

  function setRemUnit () {
    var docFontSize = docEl.clientWidth / sizeUI * remBase
    docEl.style.fontSize = docFontSize + 'px'
    bodyEl.style.fontSize = 16 / docFontSize + 'rem'
    handleRemAdapt()
  }

  function handleRemAdapt () {
    var currentFontSize = parseInt(docEl.style.fontSize)
    var temp = currentFontSize
    for (var i = 0; i < 100; i++) {
      var realFontSize = parseInt(window.getComputedStyle(docEl).fontSize)
      var differ = realFontSize - currentFontSize
      if (Math.abs(differ) >= 1) {
        if (differ > 0) {
          temp--
        } else {
          temp++
        }
        docEl.style.fontSize = temp + 'px'
      } else {
        break
      }
    }
  }
})(window, document)
