import React from "react"
import PropTypes from "prop-types"
import { Grid } from "semantic-ui-react"
import Product from "../Product"

const HomePage = ({ products, pagination }) => (
  <div>
    <Grid columns={4} stackable>
      {products.map(p => (
        <Grid.Column key={p.id}>
          <Product product={p} />
        </Grid.Column>
      ))}
    </Grid>
    {pagination}
  </div>
)

HomePage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagination: PropTypes.node
}

export default HomePage
