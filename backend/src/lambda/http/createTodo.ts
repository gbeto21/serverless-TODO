import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { getUserId } from '../utils';
// import { createTodo } from '../../businessLogic/todos'

export const handler =
  middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const newTodo: CreateTodoRequest = JSON.parse(event.body)
      // TODO: Implement creating a new TODO item
      console.log("New Todo: ", newTodo);

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            item: {
              todoId: "123",
              createdAt: "2019-07-27T20:01:45.424Z",
              name: newTodo.name,
              dueDate: "2019-07-29T20:01:45.424Z",
              done: false,
              attachmentUrl: "http://example.com/image.png"
            }
          }
        )
      }
    }
  )

handler.use(
  cors({
    credentials: true
  })
)
