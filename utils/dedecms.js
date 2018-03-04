function api(param, callback) {
    let array = []
    let time = 0
    for (let key in param) {
        let val = param[key]
        wx.request({
            url: `https://www.sz-qibang.com/api/index.php?m=jk&c=${val}`,
            success: (ret) => {
                array[key] = ret.data
                time++
                if (param.length == time) {
                    callback(array)
                }
            },
            fail: (err) => {
                console.log(err)
            }
        })
    }
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function formatTime(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
    var returnArr = []
    var date = new Date(number * 1000)
    returnArr.push(date.getFullYear())
    returnArr.push(formatNumber(date.getMonth() + 1))
    returnArr.push(formatNumber(date.getDate()))
    returnArr.push(formatNumber(date.getHours()))
    returnArr.push(formatNumber(date.getMinutes()))
    returnArr.push(formatNumber(date.getSeconds()))
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i])
    }
    return format
}

module.exports = {
    api: api,
    formatTime: formatTime
}