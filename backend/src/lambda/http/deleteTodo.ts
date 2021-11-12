import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from "../../helpers/todos";
import { getToken } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

export const handler =
  middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId

      logger.info('At delete lambda function', {
        event
      })

      const jwtToken = getToken(event)
      const result = await deleteTodo(jwtToken, todoId)
      logger.info('todo deleted', todoId)
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
