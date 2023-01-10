function formatTime(time, cFormat) {
  let date = parseTimeObj(time)
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

function parseTimeObj(time) {

  let dateTime = null
  if (time) {
    if (typeof time == 'number') {
      if ((time + '').length === 10) {
        time = +time * 1000
      }
      dateTime = new Date(parseInt(time))
    } else if (typeof time === 'string') {

      if (time.length === 19) { // 2021-09-16 00:51:00
        // time = time.substring(0, 19)
        time = time.replace(new RegExp('-','g'), '/')
      }
      dateTime = new Date(time) // 2021-09-16T00:51:00+08:00
    } else if (typeof time === 'object') {
      dateTime = time
    }
  } else {
    dateTime = new Date()
  }
  return dateTime
}

export {
  formatTime
}

