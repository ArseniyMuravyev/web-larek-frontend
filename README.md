# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с TS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание данных

`type OrderPayment = 'card' | 'cash'` - тип способа оплаты.

```
interface IOrderForm {
	payment: OrderPayment;
	email: string;
	phone: string;
	address: string;
}
```

Описывает форму заказа.

```
interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

Описывает данные карточки товара.

```
interface IAppState {
	catalog: ICard[];
	basket: string[];
	order: IOrder | null;
	loading: boolean;
	total: number | null;
}
```

Описывает типы состояния приложения.

```
interface ISuccess {
	total: number;
}
```

Описывает итоговую сумму в случае успешной покупки.

```
interface ISuccessActions {
	onClick: () => void;
}
```

Описывает возможные действия в случае удачной покупки.

```
interface IModalData {
	content: HTMLElement;
}
```

Описывает типы данных модального окна.

```
interface IFormState {
	valid: boolean;
	errors: string[];
}
```

Описывает типы состояния формы.

```
interface IShopAPI {
	getProductsList: () => Promise<ICard[]>;
	getProductItem: (id: string) => Promise<ICard>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}
```

Описывает методы работы с Api.

```
interface IPage {
	counter: number;
	catalog: HTMLElement[];
}
```

Описывает типы счетчика корзины и каталога на странице.

```
interface ICardActions {
	onClick: (event: MouseEvent) => void;
}
```

Описывает возможные действия с карточкой.

```
interface IBasketView {
	items?: HTMLElement[];
	total?: number;
}
```

Описывает типы элементов корзины.

```
interface IOrderResult {
	id: string;
	total: number;
}
```

Описывает типы данных в случае успешного заказа.

```
interface IMiniCard {
	index: number;
	id: string;
	title: string;
	price: number;
	deleteButton: HTMLButtonElement;
}
```
Описывает тип данных карточки в корзине.

## Слой Model

### 1. abstract class Model<T>

Базовый класс для создания моделей.

Конструктор:

`constructor(data: Partial<T>, protected events: IEvents) `- принимает в себя данные и объект событий.

Методы:

`emitChanges(event: string, payload?: object)` - сообщить всем, что модель поменялась.

### 2. class AppState

Класс AppState представляет собой модель состояния приложения.

Методы:

`getTotal()` - отвечает за получение итоговой цены.

`setCatalog(items: ICard[])` - отвечает за установку каталога продуктов.

`validateOrder()` - отвечает за проверку валидности формы заказа.

`validateFormContacts()` - отвечает за проверку валидности формы контактов.

`setOrderField(field: keyof IOrderForm, value: string)` - отвечает за установку значения поля заказа в объекте order на основе переданных аргументов.

## Слой View

### 1. abstract class Component<T>

Абстрактный класс, являющийся основой для всех компонентов в проекте. Он предоставляет основные методы для работы с элементами DOM.

Конструктор:

`protected constructor(protected readonly container: HTMLElement)` - принимает корневой DOM-элемент, в котором будет размещен компонент.

Методы:

`protected setText(element: HTMLElement, value: unknown)` - устанавливает текстовое содержимое элемента.

`setDisabled(element: HTMLElement, state: boolean)` - используется для установки состояния блокировки элемента.

`protected setImage(element: HTMLImageElement, src: string, alt?: string)` - устанавливает изображение для элемента img.

`render(data?: Partial<T>): HTMLElement` - используется для рендеринга компонента.

### 2. class Basket

Класс отвечает за работу с корзиной. Он наследуется от базового класса Component.

Конструктор:

`constructor(container: HTMLElement, protected events: EventEmitter)` - принимает в себя родительский контейнер и объект событий.

Методы:

`set items(items: HTMLElement[])` - устанавливает товары в корзину.

`get total(): string` - получить итоговую цену.

`set total(total: number)` - устанавливает итоговую цену.

`updateButtonState()` - обновление состояния кнопки.

`getBasketItems()` - получить количество элементов в корзине.

`addItem(item: HTMLElement)` - добавить товар в корзину.

`removeItem()` - удалить товар из корзины.

`removeAllItem()` - удаляет все товары из корзины.

`render(data: Partial<IBasketView>): HTMLElement` - отрисовка корзины

### 3. class Form<T>

Класс отвечает за работу с формой заказа. Он также наследуется от базового класса Component.

Конструктор:

`constructor(protected container: HTMLFormElement, protected events: IEvents)` - принимает в себя родительский контейнер и объект событий.

Методы:

`protected onInputChange(field: keyof T, value: string)` - обработка изменений ввода пользователем.

`private handlePaymentChange(value: string)` - для обработки изменений способа оплаты

`set valid(value: boolean)` - управляет доступностью кнопки в зависимости от валидности данных в форме.

`set errors(value: string)` - устанавливает ошибки.

`render(state: Partial<T> & IFormState)` - обновляет внешний вид формы в соответствии с переданным состоянием.

### 4. class Modal

Класс отвечает за работу с модальными окнами. Он наследуется от базового класса Component.

Конструктор:

`constructor(container: HTMLElement, protected events: IEvents)` - принимает в себя родительский контейнер и объект событий.

Методы:

`set content(value: HTMLElement)` - устанавливает контент в модальное окно.

`open()` - открытие модального окна.

`close()` -закрытие модального окна.

`render(data: IModalData): HTMLElement` - рендер модального окна.

### 5. class Success

Класс отвечает за показ сообщения об успешном оформлении заказа. Он наследуется от базового класса Component.

Конструктор:

`constructor(container: HTMLElement, actions: ISuccessActions)` - принимает в себя родительский контейнер и объект событий.

`get total(): string` - получить итоговую стоимость.

`set total(value: string)` - установить итоговую стоимость.

### 6. class Card

Класс отвечает за отображение карточки.

Конструктор:

`constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions )` - принимает в себя имя блока, HTML-элемент, содержащий компонент карточки и действия, связанные с ней.

Методы:

`set id(value: string)` - устанавливает id товара.

`set title(value: string)` - устанавливает название товара.

`set image(value: string)` - устанавливает картинку товара.

`set price(value: string | null)` - устанавливает цену товара.

`set category(value: string)` - устанавливает категорию товара.

`set description(value: string)` - устанавливает описание товара.

`` - отключает кнопку добавления товара в корзину.

### 7. class Page

Класс Page наследует функциональность от класса Component и реализует интерфейс IPage. Он предназначен для работы с элементами страницы, такими как счетчик корзины и каталог товаров.

Конструктор:

`constructor(container: HTMLElement, protected events: IEvents)` - принимает элемент контейнера страницы и объект событий.

Методы:

`set counter(value: number)` - устанавливает счетчик корзины.

`set catalog(items: HTMLElement[])` - устанавливает каталог товаров.

`set locked(value: boolean)` - блокирует страницу при открытии модальных окон.

### 8. class Order

Класс отвечает за управление данными в форме заказа, где требуется ввод способа оплаты и адреса.

Конструктор:

`constructor(container: HTMLFormElement, events: IEvents)` - принимает в себя контейнер формы и действия, связанные с ним.

Методы:

`private handleButtonClick(clickedButton: HTMLButtonElement)` - устанавливает значение способы оплаты.

`set address(value: string)` - устанавливает значение адреса доставки.

### 9. class Contacts

Класс отвечает за управление данными в форме заказа, где требуется ввод номера телефона и почты.

Конструктор:

`constructor(container: HTMLFormElement, events: IEvents)` - принимает в себя контейнер формы и действия, связанные с ним.

Методы:

`set email(value: string)` - устанавливает значение почты пользователя.

`set phone(value: string)` - устанавливает значение номера телефона пользователя.

### 10. class MiniCard

Класс карточки в корзине. Наследуется от основного класса Component.

Конструктор:

`constructor(container: HTMLElement, events?: EventEmitter)` - принимает в себя контейнер и события в качестве необязательного параметра.

Методы:

`set index(value: string)` - устанавливает номер товара в корзине.

`set id(value: string)` - устанавливает id товара.

`set title(value: string)` - устанавливает название товара.

`set price(value: number)` - устанавливает цену товара.

## Слой Presenter

### 1. class EventEmitter

Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков
о наступлении события.

Методы:

`on<T extends object>(eventName: EventName, callback: (event: T) => void)` - установить обработчик события.

`off(eventName: EventName, callback: Subscriber)` - снять обработчик события.

`emit<T extends object>(eventName: string, data?: T)` - инициировать событие с данными.

`onAll(callback: (event: EmitterEvent) => void)` - слушать все события.

`offAll()` - сбросить все обработчики.

`trigger<T extends object>(eventName: string, context?: Partial<T>)` - Сделать коллбек триггер, генерирующий событие при вызове.

### 2. class Api

Базовый класс для работы с Api.

Конструктор:

`constructor(baseUrl: string, options: RequestInit = {})` - принимает в себя базовый URL и дополнительные опции запроса к серверу.

Методы:

`protected handleResponse(response: Response): Promise<object>` - обрабатывает ответ с сервера.

`get(uri: string)` - гет-запрос.

`post(uri: string, data: object, method: ApiPostMethods = 'POST')` - пост-запрос.

### 3. class ShopAPI

Класс для работы с Api магазина. Наследуется от базового класса Api.

Конструктор:

`constructor(cdn: string, baseUrl: string, options?: RequestInit)` - принимает url адрес cdn, базовый url Api магазина и опции запроса.

Методы:

`getProductItem(id: string): Promise<ICard>` - получить информацию о товаре по его идентификатору.
`getProductsList(): Promise<ICard[]>` - получить весь каталог товаров.
`orderProducts(order: IOrder): Promise<IOrderResult>` - оформление заказа

## Основные события в приложении

`'items:changed'` - Изменились элементы каталога.
`'order:success'` - Событие перехода успешной оплаты.
`'order:submit'` - Событие перехода к форме контактов.
`'order:open'` - Открыть форму заказа.
`'basket:open'` - Открыть корзину.
`'basket:add'` - Добавить товар в корзину.
`'basket:remove'` - Удалить товар из корзины.
`'modal:open'` - Открыть модальное окно.
`'modal:close'` - Закрытие модального окна.
`'formErrors:change'` - Изменилось состояние валидации формы.
`'formContactsErrors:change'` - Изменилось состояние валидации формы контактов.
