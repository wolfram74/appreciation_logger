
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
    // console.log(defaultBody.state.settings.currentEpochDay)
    expect(defaultBody.currentEpochDay).toBeGreaterThan(Date.now()-1000*3600*24)
    expect(defaultBody.currentEpochDay).toBeLessThan(Date.now())
  })
})
