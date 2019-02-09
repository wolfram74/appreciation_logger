function humanDateYYMMDD(dayInMS){
  var dateObj = new Date(dayInMS)
  var year = dateObj.getYear()+1900
  var month = dateObj.getMonth()+1
  var day = dateObj.getDate()
  return `${year}-${month}-${day}`
}

Vue.component('gratitude-body', {
  template:`
    <div>
      <new-loggable-form>
      </new-loggable-form>

      <current-entry-fields
        v-bind:loggablesData=this.state.loggables
        v-bind:epochDate = this.currentEpochDay
      >
      </current-entry-fields>

      <review-old-entries>
      </review-old-entries>
    </div>
  `,
  data: function(){
    return {
      state:load(),
      temp:{dayOffSet:0}
    }
  },
  computed:{
    currentEpochDay: function(){
      var msPerDay =  1000*60*60*24
      var now = Date.now()
      var surplus = now%msPerDay
      var dayNow = now-surplus + msPerDay*this.temp.dayOffSet
      return dayNow
    }
  },
  methods:{
  }

})

Vue.component('new-loggable-form',{
  template:`
  <div class='new-loggable-div'>
    <h3> new form goes here</h3>
  </div>
  `
})

Vue.component('current-entry-fields',{
  props:['loggablesData', 'epochDate'],
  template:`
  <div class='current-entry-fields'>
    <h3> fill in entries for the days date: {{readableDate}}</h3>
    <ul>
      <current-string v-for='(loggable, index) in logsByType.string'
        v-bind:key=index
        v-bind:loggable=loggable
        v-bind:epochDate=this.epochDate
      >
      </current-string>
    </ul>
  </div>
  `,
  computed:{
    readableDate:function(){return humanDateYYMMDD(this.epochDate)},
    logsByType:function(){
      var strings = []
      var numbers = []
      for(var index=0; index<this.loggablesData.length; index++){
        var loggable = this.loggablesData[index]
        if(loggable.details.type==='string'){
          strings.push(loggable)
        }else{numbers.push(loggable)}
      }
      return {string:strings, number:numbers}
    }
  }

})

Vue.component('current-string',{
  props:['loggable', 'epochDate'],
  template:`
  <div class='current-string-entry'>
    <h3>{{loggable.details.label}}</h3>
  </div>
  `
})

Vue.component('review-old-entries',{
  template:`
  <div class='review-old-entries'>
    <h3> old entries table</h3>
  </div>
  `

})
