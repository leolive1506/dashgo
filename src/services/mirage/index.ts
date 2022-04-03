import { createServer, Model, Factory } from 'miragejs'
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
      server.createList('user', 10)
    },
    routes() {
      this.namespace = 'api';
      // fazer crud automatizado miragejs
      // chamar get /users lista todos
      // chamar post /users salva um novo
      this.timing = 750;
      this.get('/users');
      this.post('/users');

      // resetar namespace p não dar conflito api do next
      this.namespace = ''
      // se não for detectado alguma rota no migrage, passa pra rota origianl (api do next)
      this.passthrough()
    }
  })

  return server;
}