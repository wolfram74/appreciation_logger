Vue.component('gratitude_body', {
  template:`
    <div>
      hello
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

