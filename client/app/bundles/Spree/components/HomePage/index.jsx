import React from "react"
import PropTypes from "prop-types"
import { Grid } from "semantic-ui-react"
import Loader from "../Loader"
import Product from "../Product"

const HomePage = ({ loading, products, pagination }) => (
  <div>
    <Loader loading={loading}>
      <Grid columns={4} stackable>
        {products && products.map(p => (
          <Grid.Column key={p.id}>
            <Product product={p} />
          </Grid.Column>
        ))}
      </Grid>
    </Loader>
    {pagination}
  </div>
)

HomePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagination: PropTypes.node
}

HomePage.defaultProps = {
  products: []
}

export default HomePage
