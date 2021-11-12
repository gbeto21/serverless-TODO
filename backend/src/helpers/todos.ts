import { TodosAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import { parseUserId } from '../auth/utils'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

const logger = createLogger('todos')

const todoAccess = new TodosAccess()

export async function getTodos(jwtToken: string): Promise<TodoItem[]> {
	const userId = parseUserId(jwtToken)

	return todoAccess.getTodos(userId)
}

export async function deleteTodo(jwtToken: string, todoId: string) {
	const userId = parseUserId(jwtToken)
	const toReturn = todoAccess.deleteItem(userId, todoId)

	return toReturn
}

export async function createTodo(
	jwtToken: string,
	parsedBody: CreateTodoRequest
) {
	const userId = parseUserId(jwtToken)
	const todoId = uuid.v4()

	logger.info('userId', userId)
	logger.info('todoId', todoId)

	const item = {
		userId,
		todoId,
		createdAt: new Date().toISOString(),
		done: false,
		...parsedBody,
		attachmentUrl: ''
	}

	logger.info('Item to be created at business logic', item)
	const toReturn = todoAccess.createTodo(item)

	return toReturn
}

export async function updatedTodo(
	jwtToken: string,
	todoId: string,
	parsedBody: UpdateTodoRequest
) {
	const userId = parseUserId(jwtToken)
	const result = todoAccess.updateTodo(userId, todoId, parsedBody)

	return result
}