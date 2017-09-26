import { createSelector } from "reselect"

export const getAllProducts = state => state.products.data

export const getAllVariants = state => state.products.variants

export const getProductSlugs = state => state.products.slugs

export const getProduct = createSelector(
  getAllProducts,
  getProductSlugs,
  (state, { id }) => id,
  (products, slugs, name) => {
    const id = (name in slugs ? slugs : name)
    return products[id]
  }
)

export const getProductVariants = createSelector(
  getAllVariants,
  getProduct,
  (variants, product) => variants[product.id]
)

export const getProductError = createSelector(
  getProduct,
  product => (product ? product.error : undefined)
)

export const isProductLoaded = createSelector(
  getProduct,
  product => (product && !product.error)
)
