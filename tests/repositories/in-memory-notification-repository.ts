import { NotificationRepository } from '@/domains/notification/application/reposiotories/notification-repository'
import { Notification } from '@/domains/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
