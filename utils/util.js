const formatTime = (date, isTime = false) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  let time = isTime ? [hour, minute, second].map(formatNumber).join(':') : '';
  return [year, month, day].map(formatNumber).join('-') + ' ' + time;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
