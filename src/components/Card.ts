import { ICard } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);
		this._description = container.querySelector(`.${blockName}__description`);
		this._category = ensureElement<HTMLElement>(`.${blockName}__category`);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	get price(): string {
		return this._price.textContent || '';
	}

	set price(value: string) {
		this.setText(this._price, value);
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
} 
