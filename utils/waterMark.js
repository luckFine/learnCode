var watermark = {}
var setWatermark = function (container, str, str2) {

    if (!container) {
        return;
    }

    var id = '1.23452384164.123412415'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    var can = document.createElement('canvas')
    can.width = 240
    can.height = 130

    var cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180)
    cans.font = '14px Vedana'
    cans.fillStyle = 'rgba(200, 200, 200, 0.70)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 20, can.height / 1.2)
    cans.fillText(str2, can.width / 18, can.height / 1)

    var div = container;
    div.id = id
    // div.style.pointerEvents = 'none'
    // div.style.top = '0'
    // div.style.left = '0'
    // div.style.position = 'abs'
    // div.style.zIndex = '100000'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') center repeat'
    return id
}

// 该方法只允许调用一次
watermark.set = function (container, str, str2) {
    var id = setWatermark(container, str, str2)
    setInterval(function () {
        if (document.getElementById(id) === null) {
            id = setWatermark(container, str, str2)
        }
    }, 500)
    window.onresize = function () {
        setWatermark(container, str, str2)
    }
}