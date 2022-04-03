import { createServer, Model, Factory, Response } from 'miragejs'
import faker from 'faker'

type User = {
  name: string;
  email: string;
  created_at: string
}
export function makeServer() {
  const server = createServer({
    models: {
      // partial, vai conter os campos user, mas tlvz não todos
      user: Model.extend<Partial<User>>({
      })
    },
    // gerar dados em massa
    factories: {
      user: Factory.extend({
        name(i) {
          // install faker pra gerar dados fake 
          return faker.name.lastName()
        },
        email() {
          return faker.internet.email().toLocaleLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        },
      })
    },
    seeds(server) {
      server.createList('user', 200)
    },
    routes() {
      this.namespace = 'api';
      // fazer crud automatizado miragejs
      // chamar get /users lista todos
      // chamar post /users salva um novo
      this.timing = 750;
      this.get('/users', function(schema, req) {
        const { page = 1, per_page = 10 } = req.queryParams
        const total = schema.all('user').length
        // 10 - 20
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);
        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      });
      this.post('/users');

      // resetar namespace p não dar conflito api do next
      this.namespace = ''
      // se não for detectado alguma rota no migrage, passa pra rota origianl (api do next)
      this.passthrough()
    }
  })

  return server;
}