function humanDateYYMMDD(dayInMS){
  var dateObj = new Date(dayInMS)
  var year = dateObj.getYear()+1900
  var month = dateObj.getMonth()+1
  var day = dateObj.getUTCDate()
  return `${year}-${month}-${day}`
}

Vue.component('gratitude-body', {
  template:`
    <div>
      <new-loggable-form
      v-on:submitCreate='parseForm'
      >
      </new-loggable-form>

      <current-entry-fields
        v-bind:loggablesData=this.state.loggables
        v-bind:epochDate = this.currentEpochDay

      >
      </current-entry-fields>

      <review-old-entries
        v-bind:loggablesData = this.state.loggables
        v-bind:epochDate = this.currentEpochDay
        v-bind:settings = this.state.settings
      >
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
    parseForm:function(formData){
      console.log('submission entered')
      console.log(formData)
      this.state.loggables.push(formData)
    }
  }

})

Vue.component('new-loggable-form',{
  template:`
  <form class='new-loggable-form'>
    <span> What label would you like to give the new log?</span>
    <input type = 'text' v-model='details.label'>
    <div class='type-select'>
      <span> This new log is tracking a </span>
      <br>
      <input type="radio" id="t_num" value="number" v-model="details.type">
      <label for="t_num">Number</label>
      <br>
      <input type="radio" id="t_str" value="string" v-model="details.type">
      <label for="t_str">String</label>
      <br>
    </div>
    <button
      v-on:click='finishCreate'>
      Go!
    </button>

  </form>
  `,
  data: function(){
    return {
      details:{
        label:'',type:'number',
        nullable:false,categories:[]
      },
      entries:[]
    }
  },
  methods:{
    finishCreate:function(event){
      event.preventDefault()
      var outputData = JSON.parse(JSON.stringify(this.$data))
      console.log(outputData,'attempting emission')
      this.$emit('submitCreate', outputData)

    }
  }
})

Vue.component('current-entry-fields',{
  props:['loggablesData', 'epochDate'],
  template:`
  <div class='current-entry-fields'>
    <h3> fill in entries for the days date: {{readableDate}}</h3>
    <ul class='string-entry'>
      <current-string v-for='(loggable, index) in logsByType.string'
        v-bind:key=index
        v-bind:loggable=loggable
        v-bind:epochDate=epochDate
      >
      </current-string>
    </ul>
    <ul class='number-entry'>
      <current-number v-for='(loggable, index) in logsByType.number'
        v-bind:key=index
        v-bind:loggable=loggable
        v-bind:epochDate=epochDate
      >
      </current-number>
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
    <input v-model='currentEntry.value'>
  </div>
  `,
  computed:{
    currentEntry:function(){
      console.log(this.epochDate)
      for(var index=this.loggable.entries.length-1;index >=0; index--){
        var entry = this.loggable.entries[index]
        if( entry.date=== this.epochDate ){return entry}
      };
      var newEntry = {date:this.epochDate, value:''}
      this.loggable.entries.push(newEntry)
      return newEntry
    }
  }
})

Vue.component('current-number',{
  props:['loggable', 'epochDate'],
  template:`
  <div class='current-number-entry'>
    <h3>{{loggable.details.label}}</h3>
    <input type=number v-model='currentEntry.value'>
  </div>
  `,
  computed:{
    currentEntry:function(){
      console.log(this.epochDate)
      for(var index=this.loggable.entries.length-1;index >=0; index--){
        var entry = this.loggable.entries[index]
        if( entry.date=== this.epochDate ){return entry}
      };
      var newEntry = {date:this.epochDate, value:''}
      this.loggable.entries.push(newEntry)
      return newEntry
    }
  }
})

Vue.component('review-old-entries',{
  props:['loggablesData','epochDate', 'settings'],
  /*
  strings get their own section, line per date, maybe a different number of columns based on width of screen
  numbers get column per entry
  fixing a row to having uniform height may require binding a row together
  */
  template:`
  <div class='review-old-entries'>
    <h2> old entries table</h2>
    <number-table
      v-bind:numLogs = this.logsByType.number
      v-bind:settings = this.settings
      v-bind:epochDate = this.epochDate
    >
    </number-table>
    <string-table
      v-bind:strLogs = this.logsByType.string
      v-bind:settings = this.settings
      v-bind:epochDate = this.epochDate
      >
    </string-table>
  </div>
  `,
  computed:{
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

Vue.component('number-table',{
  props:['numLogs', 'epochDate','settings'],
  template:`
  <div class='number-table'>
  <h3>Numerical Entries</h3>
    <div class='header-row'>
      <span class='table-cell' v-for='(header, index) in headers'>
        {{header}}
      </span>
    </div>
    <div class='date-row' v-for='(rowData, index) in rows'>
      <span class='table-cell' v-for='(data, index) in rowData'>
        {{data}}
      </span>
    </div>
  </div>
  `,
  computed:{
    headers: function(){
      var out = ['day']
      for(var index=0; index<this.numLogs.length; index++){
        out.push(this.numLogs[index].details.label)
      }
      return out
    },
    rows: function(){
      /*
      newest entries are last index (last)
      looking for an entry that n-days old
      may:
        not exist
        may be at index last
        may be last-(n+1) entries deep because of time zones
      */
      var out= []
      for(var daysAgo = 0; daysAgo <= this.settings.daysReviewed; daysAgo+=1){
        var epochTime = this.epochDate-daysAgo*24*3600*1000
        var row = [humanDateYYMMDD(epochTime)]
        for(var index=0;index<this.numLogs.length; index++){
          var log = this.numLogs[index]
          var found = false
          var minInd = log.entries.length - (daysAgo+1)
          for(var eIndex= log.entries.length-1; eIndex >=minInd ; eIndex -=1){
            if(log.entries[eIndex]===undefined){continue}
            if(log.entries[eIndex].date===epochTime){
              row.push(log.entries[eIndex].value)
              found = true
              break
            }
          }
          if(!found){row.push(0)}
        }
        out.push(row)
      }
      return out
    }
  }
})

Vue.component('string-table',{
  props:['strLogs', 'epochDate','settings'],
  template:`
  <div class='string-table'>
    <h3>String Entries</h3>
    <div class='string-col-container'>
      <div class='string-col' v-for='(log, index) in strLogs'>
        <div class='string-header'>
          {{log.details.label}}
        </div>
        <div class='string-cell' v-for='(entry, index2) in columns[index]'>
          <span>{{entry[0]}}</span>
          <span>{{entry[1]}}</span>
        </div>
      </div>
    </div>
  </div>
  `,
  computed:{
    columns:function(){
      var out = []
      for(var ind=0; ind < this.strLogs.length; ind+=1){
        var log = this.strLogs[ind]
        var col = []
        for(var daysAgo = 0; daysAgo<this.settings.daysReviewed; daysAgo+=1){
          var epochTime = this.epochDate-daysAgo*24*3600*1000
          var found = false
          var minInd = log.entries.length - (daysAgo+1)
          for(var eIndex= log.entries.length-1; eIndex >=minInd ; eIndex -=1){
            if(log.entries[eIndex]===undefined){continue}
            if(log.entries[eIndex].date===epochTime){
              col.push([humanDateYYMMDD(epochTime), log.entries[eIndex].value])
              found = true
              break
            }
          }
          if(!found){col.push([humanDateYYMMDD(epochTime), ''])}
        }
      out.push(col)
      }
      return out
    }
  }
})
