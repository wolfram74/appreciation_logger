function load(defaults){
  var defaultVals = {
    loggables:[],
    settings:{daysReviewed:7}
  }
  var devVals = genDevVals()
  if(typeof defaults === 'undefined'){var noDefaults=true}
  if(!noDefaults){
    return defaultVals
  }
  console.log('not default')
  var loadedData = JSON.parse(
    localStorage.getItem('dailyLoggerState')
    ) || devVals;
  return loadedData
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
        entries:[{date:twoDaysAgo, value:6}]
      },
    ],
    settings:{daysReviewed:7}
  }
}

function mod(n,k){return ((n%k)+k)%k}

new Vue({el: "#gratitude-body"})

