function load(defaults){
  var defaultVals = {
    loggable:{},
    settings:{daysReviewed:7}
  }
  if(typeof defaults !== undefined){
    return defaultVals
  }
  var loadedData = JSON.parse(
    localStorage.getItem('dailyLoggerState')
    ) || defaultVals
  return loadedData
}

function setCurrentEpochDay(){
  var msPerHour = 1000*60*60
  var msPerDay =  msPerHour*24
  var now = Date.now()
  var surplus = now%msPerDay
  var dayNow = now-surplus
}

function mod(n,k){return ((n%k)+k)%k}

new Vue({el: "#gratitude-body"})
