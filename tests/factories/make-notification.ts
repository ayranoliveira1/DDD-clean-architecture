import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domains/notification/enterprise/entities/notification'
import { faker } from '@faker-js/faker'

export function makeNotification(
  overrides: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const question = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...overrides,
    },
    id,
  )

  return question
}
