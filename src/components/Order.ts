import { IOrderForm } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<IOrderForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set payment(value: string) {
		const activeButton = this.container.querySelector(
			'.order__buttons button.active'
		);
		if (activeButton) {
			activeButton.classList.remove('active');
		}
		const paymentButton = this.container.querySelector(
			`.order__buttons button[name=${value}]`
		);
		if (paymentButton) {
			paymentButton.classList.add('active');
		}
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}
}
