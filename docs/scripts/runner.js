var devMode = false
function load(defaults){
  var defaultVals = {
    loggables:[],
    settings:{daysReviewed:7}
  }
  var devVals = genDevVals()
  if(devMode){return devVals}
  if(typeof defaults === 'undefined'){var noDefaults=true}
  if(!noDefaults){
    console.log("didn't load")
    return defaultVals
  }
  var loadedData = JSON.parse(
    localStorage.getItem('dailyLoggerState')
    ) || defaultVals;
  return loadedData
}

function save(stateObject){
  console.log('save triggered')
  localStorage.setItem('dailyLoggerState',
    JSON.stringify(stateObject)
  )
}

function genDevVals(){
  var msPerDay =  1000*60*60*24
  var now = Date.now()
  var surplus = now%msPerDay
  var dayNow = now-surplus
  var twoDaysAgo = dayNow - msPerDay*2
  return {
    loggables:[
      {
        details:{
          type:'string',
          label:'test str1',
          nullable:false,
          categories: []
        },
        entries:[{date:twoDaysAgo, value:'fart noise'}]
      },
      {
        details:{
          type:'string',
          label:'test str2',
          nullable:false,
          categories: []
        },
        entries:[{date:twoDaysAgo, value:'cats'},{date:dayNow, value:'bees'}]
      },
      {
        details:{
          type:'number',
          label:'test num1',
          nullable:true,
          categories: []
        },
        entries:[{date:twoDaysAgo, value:6}]
      },
      {
        details:{
          type:'number',
          label:'test num2',
          nullable:false,
          categories: []
        },
        entries:[{date:twoDaysAgo, value:5},{date:dayNow, value:8}]
      },
    ],
    settings:{daysReviewed:7}
  }
}

function mod(n,k){return ((n%k)+k)%k}

new Vue({el: "#gratitude-body"})

