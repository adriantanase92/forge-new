import type { notificationType } from '$lib/shared/components/general/notification/type';
import { derived, writable } from 'svelte/store';

export type Notification = {
	id: string;
	message: string;
	type: notificationType;
	timeout: number;
};

const TIMEOUT = 3500; // Default timeout

function createNotificationStore() {
	const _notifications = writable<Notification[]>([]);

	const send = (message: string, type: notificationType = 'info', timeout: number = TIMEOUT) => {
		_notifications.update((state: Notification[]) => {
			return [...state, { id: id(), type, message, timeout }];
		});
	};

	const remove = (id: string) => {
		_notifications.update((notifications) =>
			notifications.filter((notification) => notification.id !== id)
		);
	};

	const notifications = derived(
		_notifications,
		($_notifications: Notification[], set: (value: Notification[]) => void) => {
			set($_notifications);
			if ($_notifications.length > 0) {
				const timer = setTimeout(() => {
					_notifications.update((state: Notification[]) => {
						state.shift();
						return state;
					});
				}, $_notifications[0].timeout);
				return () => {
					clearTimeout(timer);
				};
			}
		}
	);

	const { subscribe } = notifications;

	return {
		subscribe,
		remove,
		send,
		danger: (msg: string, timeout?: number) => send(msg, 'error', timeout || TIMEOUT),
		warning: (msg: string, timeout?: number) => send(msg, 'warning', timeout || TIMEOUT),
		info: (msg: string, timeout?: number) => send(msg, 'info', timeout || TIMEOUT),
		success: (msg: string, timeout?: number) => send(msg, 'success', timeout || TIMEOUT)
	};
}

const id = () => '_' + Math.random().toString(36).slice(2, 11);

export const notifications = createNotificationStore();
