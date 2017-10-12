import Response from "../Response"
import { State, Collection } from "../resources"

// eslint-disable-next-line import/prefer-default-export
export async function getAll(country) {
  const response = await this.json(`/api/v1/states?country_id=${country}`)
  return new Response(response, new Collection(response.data, State))
}
