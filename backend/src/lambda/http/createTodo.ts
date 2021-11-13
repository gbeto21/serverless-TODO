import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from "../../helpers/todos";
import { getToken } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler =
  middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const parsedBody: CreateTodoRequest = JSON.parse(event.body)
      const jwtToken = getToken(event)

      const item = await createTodo(jwtToken, parsedBody)

      logger.info('item created', item)

      return {
        statusCode: 201,
        body: JSON.stringify({
          item
        })
      }
    }
  )

handler.use(
  cors({
    credentials: true
  })
)
