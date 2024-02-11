import { FormErrors, IAppState, ICard, IOrder } from '../types';
import { Model } from './base/Model';

export class ProductItem extends Model<ICard> {
	description: string;
	id: string;
	image: string;
	title: string;
	price: number | null;
	category: string;
}

export class AppState extends Model<IAppState> {
	basket: string[];
	catalog: ICard[];
	loading: boolean;
	order: IOrder = {
		payment: 'card',
		email: '',
		phone: '',
		items: [],
		address: '',
	};
	formErrors: FormErrors = {};

	getTotal() {
		return this.order.items.reduce(
			(a, c) => a + this.catalog.find((it) => it.id === c).price,
			0
		);
	}

	setCatalog(items: ICard[]) {
		this.catalog = items.map((item) => new ProductItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	validateOrder() {}
}
