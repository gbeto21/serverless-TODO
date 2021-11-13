import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updatedTodo } from "../../helpers/todos";
import { getToken } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('updateTodo')

export const handler =
  middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId
      const parsedBody: UpdateTodoRequest = JSON.parse(event.body)

      logger.info('Getting an item to be updated: ', {
        event
      })
      logger.info('Item to be updated: ', {
        updatedTodo
      })

      const jwtToken = getToken(event)
      const result = await updatedTodo(jwtToken, todoId, parsedBody)
      logger.info('todo updated', todoId)
      return {
        statusCode: result.statusCode,
        body: result.body
      }
    }
  )

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
