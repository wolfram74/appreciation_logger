Vue.component('gratitude_body', {
  template:`
    <div>
      hello
    </div>
  `,
  data: function(){return {state:load()}},
  computed:{
    currentEpochDay: function(){return 'fart'}
  },
  methods:{
    setCurrentEpochDay: function(){
      var msPerHour = 1000*60*60
      var msPerDay =  msPerHour*24
      var now = Date.now()
      var surplus = now%msPerDay
      var dayNow = now-surplus
      console.log(this.state.settings.currentEpochDay)
      var elapsed = now - this.state.settings.lastOpened
      if(this.state.settings.currentEpochDay===0){this.state.settings.currentEpochDay = dayNow; return}
      if( elapsed > 7*msPerHour){
        this.state.settings.currentEpochDay = dayNow; return
      }

    },
  }

})
