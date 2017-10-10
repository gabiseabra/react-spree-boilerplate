import { combineReducers } from "redux"
import order from "./order"
import coupon from "./coupon"

export default combineReducers({ order, coupon })

export { load, add, edit, remove, empty } from "./order"
export { apply as applyCoupon } from "./coupon"
