import React from "react"
import { Table } from "react-bootstrap"

const Properties = ({ product }) => (
  <Table striped condensed>
    <tbody>
      {product.properties.map(({ name, value }) => (
        <tr key={name}>
          <td>{name}</td>
          <td>{value}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default Properties
