import development from "./development"
import production from "./production"

const env = {
  development,
  production
}

const config = env[process.env.NODE_ENV] || {}

export default config
