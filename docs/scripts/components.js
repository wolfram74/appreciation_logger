Vue.component('gratitude-body', {
  template:`
    <div>
      <new-loggable-form>
      </new-loggable-form>

      <current-entry-fields>
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
  template:`
  <div class='current-entry-fields'>
    <h3> current epoch days entries</h3>
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
