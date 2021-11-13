import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getTodos } from "../../helpers/todos";
import { getToken } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('getTodos')

export const handler =
  middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      logger.info('Reciving request to get todos', event)
      const jwtToken = getToken(event)

      let items = []
      if (jwtToken) {
        items = await getTodos(jwtToken)
      }
      logger.info('todos returned', items)
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            items
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
