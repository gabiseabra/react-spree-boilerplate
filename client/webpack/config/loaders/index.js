import styles from "./styles"
import scripts from "./scripts"
import images from "./images"

const modules = { styles, scripts, images }

export default function build(context, options = {}) {
  const loaders = []
  Object.keys(modules).forEach((name) => {
    if(options[name] === false) {
      return
    }
    const buildModule = modules[name]
    loaders.push(...buildModule(context, options[name] || {}))
  })
  return loaders
}
