import { createSelector } from "reselect"

export const getAllProducts = state => state.products.data

export const getAllVariants = state => state.products.variants

export const getProductSlugs = state => state.products.slugs

// products.data
export const getProduct = createSelector(
  getAllProducts,
  getProductSlugs,
  (state, { id }) => id,
  (products, slugs, name) => {
    const id = (name in slugs ? slugs : name)
    return products[id]
  }
)

export const getProductError = createSelector(
  getProduct,
  product => (product ? product.error : undefined)
)

export const isProductLoaded = createSelector(
  getProduct,
  product => (product && !product.error)
)

// products.variants
export const getProductVariants = createSelector(
  getAllVariants,
  getProduct,
  (variants, product) => variants[product.id]
)

/**
 * {
 *   [type.id]: {
 *     ...type,
 *     options: {
 *       [option.id]: {
 *         ...option,
 *         productIds: [ ... ]
 * }}}}
 */
export const getOptionTypes = createSelector(
  getProduct,
  getProductVariants,
  (product, variants) => {
    const result = {}
    Object.values(product.optionTypes).forEach((type) => {
      result[type.id] = {
        ...type,
        options: {}
      }
    })
    Object.values(variants).forEach((variant) => {
      Object.keys(variant.options).forEach((typeId) => {
        const option = variant.options[typeId]
        if(result[typeId].options[option.id]) {
          result[typeId].options[option.id].variantIds.push(variant.id)
        } else {
          result[typeId].options[option.id] = {
            ...option,
            variantIds: [ variant.id ]
          }
        }
      })
    })
    return result
  }
)
