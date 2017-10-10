import { addLocaleData } from "react-intl"
import en from "react-intl/locale-data/en"
import pt from "react-intl/locale-data/pt"

addLocaleData([ ...en, ...pt ])

export { defaultLocale } from "./rails/default"
export { translations } from "./rails/translations"
