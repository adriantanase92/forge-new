import type { notificationKind, notificationType } from './type';
import type { iconName } from '../svg/icons';
import { colors } from '$lib/shared';

export const getIconBasedOnType = (type: notificationType): iconName => {
	const iconsClasses = {
		success: 'check',
		error: 'alert',
		warning: 'warning',
		info: 'info'
	};

	return String(iconsClasses[type] ?? 'default') as iconName;
};

export const getIconColor = (type: notificationType): string => {
	const iconColorClasses = {
		success: colors.success,
		error: colors.error,
		warning: colors.warning,
		info: colors.cobalt
	};

	return iconColorClasses[type];
};

export const getCssClasses = (kind: notificationKind, type: notificationType) => {
	const bgClasses = {
		success: 'bg-yoboo-success-alt',
		error: 'bg-yoboo-error-alt',
		warning: 'bg-yoboo-warning-alt',
		info: 'bg-yoboo-cobalt-alt'
	};

	const borderClasses = {
		success: 'border-yoboo-success',
		error: 'border-yoboo-error',
		warning: 'border-yoboo-warning',
		info: 'border-yoboo-cobalt'
	};

	const styleClasses = {
		fill: 'rounded-xl',
		outline: 'rounded-xl border-2 border-solid',
		transparent: 'bg-transparent'
	};

	const textClasses = {
		success: 'text-yoboo-success',
		error: 'text-yoboo-error',
		warning: 'text-yoboo-warning',
		info: 'text-yoboo-cobalt'
	};

	return `${styleClasses[kind]} ${kind === 'fill' ? bgClasses[type] : ''} ${
		kind === 'outline' ? borderClasses[type] : ''
	} ${textClasses[type]}`;
};
