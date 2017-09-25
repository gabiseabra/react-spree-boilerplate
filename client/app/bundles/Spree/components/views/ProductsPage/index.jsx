import React from "react"
import PropTypes from "prop-types"
import { Grid } from "semantic-ui-react"
import { Card } from "../../product"
import Loader from "../Loader"

const ProductsPage = ({ loading, products, breadcrumbs, pagination }) => (
  <div>
    {breadcrumbs}
    <Loader loading={loading}>
      <Grid columns={4} stackable>
        {products && products.map(p => (
          <Grid.Column key={p.id}>
            <Card product={p} />
          </Grid.Column>
        ))}
      </Grid>
    </Loader>
    {pagination}
  </div>
)

ProductsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  breadcrumbs: PropTypes.node,
  pagination: PropTypes.node
}

export default ProductsPage
