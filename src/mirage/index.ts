import { createServer, Model } from 'miragejs'
import { Chocolate } from '../types/chocolate.ts'
import { chocolateData } from '../types/chocolate-data.ts'

export function makeServer({ environment = 'test' }) {
  const server = createServer({
    environment,
    models: {
      data: Model.extend<Partial<Chocolate>>({}),
    },

    routes() {
      this.namespace = 'api'

      this.get('/chocolates', (schema) => {
        return schema.all('data')
      })

      this.post('/chocolates/:id', (schema, request) => {
        const chocolateToEdit = JSON.parse(request.requestBody)
        return schema.db.data.update(chocolateToEdit.id, chocolateToEdit)
      })
    },
  })

  server.db.createCollection('chocolates')

  server.db.loadData({ data: chocolateData.data })

  return server
}
