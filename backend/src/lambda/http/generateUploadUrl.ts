import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { generateUploadUrl } from "../../helpers/attachmentUtils";
import { getToken } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('generateUploadUrl')

export const handler =
  middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      logger.info('Processing generateUploadUrl Event: ', {
        event
      })

      const todoId = event.pathParameters.todoId
      const jwtToken = getToken(event)
      const result = await generateUploadUrl(jwtToken, todoId)

      logger.info('Returning url signed', result.body)
      return {
        statusCode: result.statusCode,
        body: JSON.stringify({
          uploadUrl: result.body
        })
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
