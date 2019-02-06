function load(){
  var loadedData = JSON.parse(
    localStorage.getItem('dailyLoggerState')
    ) || {loggable:{}, settings:{currentEpochDay:0, daysReviewed:7, lastOpened:0}}
  return loadedData
}

function setCurrentEpochDay(){
  var msPerHour = 1000*60*60
  var msPerDay =  msPerHour*24
  var now = Date.now()
  var surplus = now%msPerDay
  var dayNow = now-surplus
}

new Vue({el: "#gratitude-body"})
