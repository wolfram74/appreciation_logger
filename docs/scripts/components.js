Vue.component('gratitude_body', {
  template:`
    <div>
      hello
    </div>
  `,
  data: function(){return load()},
  methods:{
    setCurrentEpochDay: function(){
      var msPerHour = 1000*60*60
      var msPerDay =  msPerHour*24
      var now = Date.now()
      var surplus = now%msPerDay
      var dayNow = now-surplus
      console.log(this.settings.currentEpochDay)
    }
  }

})
