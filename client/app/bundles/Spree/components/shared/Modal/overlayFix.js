// eslint-disable-next-line import/no-extraneous-dependencies
import { Modal as ReactOverlayModal } from "react-overlays"

// Temporary fix for react-overlay 7.0.0 on react 16
// https://github.com/react-bootstrap/react-bootstrap/issues/2812#issuecomment-333041586
const focus = () => {}
const cDU = ReactOverlayModal.prototype.componentDidUpdate
const cDM = ReactOverlayModal.prototype.componentDidMount

ReactOverlayModal.prototype.componentDidUpdate = function (prevProps) {
  if(this.focus !== focus) this.focus = focus
  cDU.call(this, prevProps)
}

ReactOverlayModal.prototype.componentDidMount = function () {
  if(this.focus !== focus) this.focus = focus
  cDM.call(this)
}
