
function mainBodyGen(bodyData){
    // Vue.options.components is where the templates are stored
  var blockProxy = Vue.extend(Vue.options.components["gratitude_body"])
  return new blockProxy({propsData:bodyData})
}
  // var bodyWrapper = mount(Vue.options.components["gratitude_body"])
  // bodyWrapper.setData(bodyData)
  // return bodyWrapper

describe("Meta Component", function() {
  it("should run tests",function(){
    expect(true).toEqual(true)
  })
});

describe('current epoch day', function(){
  it('should determine the current epoch day from null results',function(){
    var defaultBody = mainBodyGen(load(true))
    // console.log(defaultBody.state.settings.currentEpochDay)
    defaultBody.setCurrentEpochDay()
    // console.log(defaultBody.state.settings.currentEpochDay)
    expect(defaultBody.state.settings.currentEpochDay).toBeGreaterThan(0)
    expect(defaultBody.state.settings.currentEpochDay).toBeLessThan(Date.now())
  })
  it('should update current day if it too long has passed since last open',function(){
    var data = load(true)
    data.settings.currentEpochDay = Date.now() - 1000*60*60*12
    var testBody = mainBodyGen(data)
    console.log(data)
    console.log(testBody.state.settings.currentEpochDay)
    testBody.state.settings.currentEpochDay = Date.now() - 1000*60*60*12
    console.log(testBody.state.settings.currentEpochDay)
    testBody.setCurrentEpochDay()
    console.log(testBody.state.settings.currentEpochDay)
    expect(testBody.state.settings.currentEpochDay).toBeGreaterThan(0)
    expect(testBody.state.settings.currentEpochDay).not.toBeGreaterThan(data.settings.currentEpochDay)
    expect(testBody.state.settings.currentEpochDay).toBeLessThan(Date.now())

  })
})
