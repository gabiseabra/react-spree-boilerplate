import "babel-polyfill"
import "ignore-styles"
import chai from "chai"
import chaiThings from "chai-things"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiThings)
chai.use(chaiAsPromised)

global.should = chai.should()
global.expect = chai.expect
