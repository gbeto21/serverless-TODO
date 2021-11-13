// import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { parseUserId } from '../auth/utils'
import { TodosAccess } from '../helpers/todosAcess'

// const XAWS = AWSXRay.captureAWS(AWS)

const todoAccess = new TodosAccess()
export async function generateUploadUrl(jwtToken: string, todoId: string) {
	const userId = parseUserId(jwtToken)
	const result = todoAccess.generateUploadUrl(userId, todoId)

	return result
}