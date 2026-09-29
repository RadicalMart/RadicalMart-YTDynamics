import './product-interactions.scss';

const text = (value) => document.createTextNode(value || '');

const labels = document.documentElement.lang.toLowerCase().startsWith('ru') ? {
    loading: 'Загрузка…', error: 'Не удалось загрузить товар.', inStock: 'В наличии',
    outOfStock: 'Нет в наличии', quantity: 'Количество', addToCart: 'В корзину',
    details: 'Подробнее', quickView: 'Быстрый просмотр', noImage: 'Нет изображения'
} : {
    loading: 'Loading…', error: 'Unable to load product.', inStock: 'In stock',
    outOfStock: 'Not available', quantity: 'Quantity', addToCart: 'Add to cart',
    details: 'Details', quickView: 'Quick view', noImage: 'No image'
};

const translate = (key, fallback) => {
    const translated = window.Joomla?.Text?._?.(key);
    return translated && translated !== key ? translated : fallback;
};

const element = (tag, className = '', attributes = {}) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    Object.entries(attributes).forEach(([name, value]) => {
        if (value !== null && value !== undefined && value !== false) {
            node.setAttribute(name, value === true ? '' : String(value));
        }
    });
    return node;
};

const requestProduct = async (endpoint, task, productId, signal = null) => {
    const url = new URL(endpoint, window.location.href);
    url.searchParams.set('task', task);
    url.searchParams.set('product_id', productId);

    const response = await fetch(url.toString(), {
        headers: {'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
        credentials: 'same-origin',
        signal
    });
    const payload = await response.json();
    if (!response.ok || payload.success === false) {
        throw new Error(payload.message || `HTTP ${response.status}`);
    }

    let data = payload.data;
    if (Array.isArray(data) && data.length === 1 && typeof data[0] === 'object') data = data[0];
    if (!data || !data.id) throw new Error('Product data is empty.');
    return data;
};

const requestQuickViewLayout = async (endpoint, productId, templateId, signal = null) => {
    const url = new URL(endpoint, window.location.href);
    url.searchParams.set('task', 'quickViewLayout');
    url.searchParams.set('product_id', productId);
    url.searchParams.set('template_id', templateId);

    const response = await fetch(url.toString(), {
        headers: {'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
        credentials: 'same-origin',
        signal
    });
    const payload = await response.json();
    if (!response.ok || payload.success === false) {
        throw new Error(payload.message || `HTTP ${response.status}`);
    }

    let data = payload.data;
    if (Array.isArray(data) && data.length === 1 && typeof data[0] === 'object') data = data[0];
    if (!data || !data.html) throw new Error('Quick View layout is empty.');
    return data;
};

class VariantPicker {
    constructor(container, data = null, onProduct = null) {
        this.container = container;
        this.data = data || this.readData();
        this.onProduct = onProduct;
        this.selected = {};
        this.pending = null;

        const current = this.data?.products?.find((product) => Number(product.id) === Number(this.data.currentProduct));
		if (current) {
			const visibleFields = new Set((this.data?.fields || []).map((field) => String(field.alias)));
			this.selected = Object.fromEntries(
				Object.entries(current.fields || {}).filter(([alias]) => visibleFields.has(String(alias)))
			);
		}
    }

    readData() {
        try {
            return JSON.parse(this.container.querySelector('.rmvariants__data')?.textContent || '{}');
        } catch (error) {
            return null;
        }
    }

    init() {
        if (!this.data?.fields?.length || !this.data?.products?.length || this.container.dataset.rmVariantsReady) return;
        this.container.dataset.rmVariantsReady = 'true';

		if (this.container.dataset.displayMode === 'hover') {
			const scope = this.container.closest('[data-rm-product-scope], .el-item, .uk-card')
				|| this.container.closest('.rmvariants-card');
			if (scope && scope !== this.container) {
				scope.classList.add('rmvariants-card--hover');
				scope.dataset.rmHoverBreakpoint = this.container.dataset.hoverBreakpoint || 'm';
				scope.append(this.container);
			}
		}

        this.container.addEventListener('click', (event) => {
            const option = event.target.closest('[data-rm-value]');
            if (!option || option.disabled) return;
            const field = option.closest('[data-rm-field]');
            if (field) this.select(field.dataset.rmField, option.dataset.rmValue);
        });
        this.container.addEventListener('change', (event) => {
            const select = event.target.closest('.rmvariants__select');
            const field = select?.closest('[data-rm-field]');
            if (select && field) this.select(field.dataset.rmField, select.value);
        });

        this.renderState();
    }

    select(alias, value) {
        const wanted = {...this.selected, [alias]: String(value)};
        let product = this.data.products.find((item) => this.matches(item, wanted));

        // Sparse variation matrices are common. If the exact combination does
        // not exist, move to the first real product containing the changed value.
        if (!product) {
            product = this.data.products.find((item) => String(item.fields[alias]) === String(value));
        }
        if (!product) return;

        this.selected = {...product.fields};
        this.data.currentProduct = Number(product.id);
        this.renderState();

        if (this.container.dataset.action === 'navigate') {
            window.location.assign(product.link);
            return;
        }

        this.loadProduct(product);
    }

    matches(product, selection) {
        return Object.entries(selection).every(([alias, value]) => String(product.fields[alias]) === String(value));
    }

    renderState() {
        const disableUnavailable = this.container.dataset.disableUnavailable !== 'false';
        this.data.fields.forEach((field) => {
            const wrapper = this.container.querySelector(`[data-rm-field="${CSS.escape(field.alias)}"]`);
            if (!wrapper) return;

            wrapper.querySelectorAll('[data-rm-value]').forEach((option) => {
                const active = String(option.dataset.rmValue) === String(this.selected[field.alias]);
                const available = this.isAvailable(field.alias, option.dataset.rmValue);
                option.setAttribute('aria-pressed', active ? 'true' : 'false');
                option.classList.toggle('rmvariants__option--active', active);
                option.disabled = disableUnavailable && !available;
                option.setAttribute('aria-disabled', option.disabled ? 'true' : 'false');
            });

            const select = wrapper.querySelector('.rmvariants__select');
            if (select) {
                select.value = this.selected[field.alias] ?? '';
                Array.from(select.options).forEach((option) => {
                    option.disabled = disableUnavailable && !this.isAvailable(field.alias, option.value);
                });
            }
        });
    }

    isAvailable(alias, value) {
        const otherFields = Object.entries(this.selected).filter(([key]) => key !== alias);
        return this.data.products.some((product) => String(product.fields[alias]) === String(value)
            && otherFields.every(([key, selected]) => String(product.fields[key]) === String(selected)));
    }

    async loadProduct(product) {
        const status = this.container.querySelector('.rmvariants__status');
        const loading = this.container.querySelector('[data-rm-label-loading]')?.textContent || 'Loading…';
        if (status) status.textContent = loading;
        this.container.classList.add('rmvariants--loading');

        if (this.pending) this.pending.abort();
        this.pending = new AbortController();
        const controller = this.pending;

        try {
            const full = await requestProduct(this.container.dataset.endpoint, 'variant', product.id, controller.signal);
            this.applyProduct(full);
            if (status) status.textContent = '';
        } catch (error) {
            if (error.name !== 'AbortError' && status) status.textContent = error.message;
        } finally {
            if (this.pending === controller) {
                this.container.classList.remove('rmvariants--loading');
                this.pending = null;
            }
        }
    }

    applyProduct(product) {
        if (typeof this.onProduct === 'function') {
            this.onProduct(product);
        } else {
            const scope = this.container.closest('[data-rm-product-scope], .el-item, .uk-card')
				|| this.container.closest('.rmvariants-card') || document;
            scope.querySelectorAll('[radicalmart-cart="product"], [data-radicalmart-cart="product"]')
                .forEach((cart) => {
                    cart.dataset.id = product.id;
                    cart.dataset.rmDynamicProduct = 'true';
                });
        }

        if (this.container.dataset.updateUrl === 'true' && product.link && window.history?.replaceState) {
            window.history.replaceState({...window.history.state, rmProductId: product.id}, '', product.link);
        }

        this.container.dispatchEvent(new CustomEvent('radicalmart:variant-change', {
            bubbles: true,
            detail: {product}
        }));
    }
}

class QuickView {
    constructor() {
        this.cache = new Map();
        this.modal = null;
        this.product = null;
        this.settings = {};
        this.pending = null;
		this.builderContext = null;
    }

    async open(trigger) {
        const id = Number(trigger.dataset.rmQuickView);
        if (!id) return;
        try {
            this.settings = JSON.parse(trigger.dataset.settings || '{}');
        } catch (error) {
            this.settings = {};
        }

        this.ensureModal();
        this.show();

        this.setLoading();
		this.builderContext = null;

        if (this.pending) this.pending.abort();
        this.pending = new AbortController();
        const controller = this.pending;

        try {
			if (trigger.dataset.contentMode === 'builder' && trigger.dataset.templateId) {
				const key = `${trigger.dataset.endpoint}:layout:${trigger.dataset.templateId}:${id}`;
				const layout = this.cache.has(key)
					? this.cache.get(key)
					: await requestQuickViewLayout(
						trigger.dataset.endpoint,
						id,
						trigger.dataset.templateId,
						controller.signal
					);
				this.cache.set(key, layout);
				this.product = null;
				this.renderBuilderContent(layout.html, {
					endpoint: trigger.dataset.endpoint,
					templateId: trigger.dataset.templateId,
					productId: id
				});
				return;
			}

            const key = `${trigger.dataset.endpoint}:${id}`;
            const product = this.cache.has(key)
                ? this.cache.get(key)
                : await requestProduct(trigger.dataset.endpoint, 'quickView', id, controller.signal);
            this.cache.set(key, product);
            this.product = product;
            this.render(product, trigger.dataset.endpoint);
        } catch (error) {
            if (error.name !== 'AbortError') this.renderError(error.message);
        } finally {
            if (this.pending === controller) this.pending = null;
        }
    }

    ensureModal() {
        if (this.modal) return;
        this.modal = element('div', 'rmquickview uk-modal', {
            'uk-modal': true,
            'aria-label': translate('PLG_YTDYNAMICS_QUICK_VIEW', labels.quickView)
        });
        this.modal.innerHTML = '<div class="rmquickview__dialog uk-modal-dialog"><button class="rmquickview__close uk-modal-close-default" type="button" uk-close aria-label="Close"></button><div class="rmquickview__body uk-modal-body"></div></div>';
		this.modal.addEventListener('radicalmart:variant-change', (event) => {
			const productId = Number(event.detail?.product?.id);
			if (this.builderContext && productId) this.loadBuilderProduct(productId);
		});
        document.body.appendChild(this.modal);
    }

    show() {
        this.modal.classList.toggle('uk-modal-container', this.settings.modalSize === 'container');
        this.modal.classList.toggle('rmquickview--large', this.settings.modalSize === 'large');
        if (window.UIkit?.modal) window.UIkit.modal(this.modal).show();
        else {
            this.modal.classList.add('uk-open');
            this.modal.style.display = 'block';
        }
    }

    setLoading() {
        const body = this.modal.querySelector('.rmquickview__body');
        body.replaceChildren(element('div', 'rmquickview__loader', {'uk-spinner': 'ratio: 1.5'}));
    }

    renderError(message) {
        const alert = element('div', 'uk-alert-danger', {'uk-alert': true});
        alert.append(text(message || translate('PLG_YTDYNAMICS_ERROR_LOAD_PRODUCT', labels.error)));
        this.modal.querySelector('.rmquickview__body').replaceChildren(alert);
    }

    renderBuilderContent(html, context = this.builderContext) {
        const body = this.modal.querySelector('.rmquickview__body');
		const fragment = document.createRange().createContextualFragment(html);
		body.replaceChildren(fragment);
		this.builderContext = context;
        if (window.UIkit?.update) window.UIkit.update(body);
        if (typeof window.RadicalMartCart === 'function') {
            const cart = window.RadicalMartCart();
            if (typeof cart?.loadActions === 'function') cart.loadActions(body);
        }
        body.dispatchEvent(new CustomEvent('ytdynamics:quickview-open', {bubbles: true}));
    }

	async loadBuilderProduct(productId) {
		const context = this.builderContext;
		if (!context || Number(context.productId) === Number(productId)) return;

		this.setLoading();
		if (this.pending) this.pending.abort();
		this.pending = new AbortController();
		const controller = this.pending;

		try {
			const key = `${context.endpoint}:layout:${context.templateId}:${productId}`;
			const layout = this.cache.has(key)
				? this.cache.get(key)
				: await requestQuickViewLayout(context.endpoint, productId, context.templateId, controller.signal);
			this.cache.set(key, layout);
			this.renderBuilderContent(layout.html, {...context, productId});
		} catch (error) {
			if (error.name !== 'AbortError') this.renderError(error.message);
		} finally {
			if (this.pending === controller) this.pending = null;
		}
	}

    render(product, endpoint) {
        const body = this.modal.querySelector('.rmquickview__body');
        const layout = element('div', 'rmquickview__layout uk-grid-large uk-flex-middle', {'uk-grid': true, 'data-rm-product-scope': true});
        const mediaColumn = element('div', 'rmquickview__media-column uk-width-1-2@m');
        const contentColumn = element('div', 'rmquickview__content uk-width-expand@m');

        mediaColumn.append(this.renderMedia(product.media || []));
        contentColumn.append(this.renderContent(product, endpoint));
        layout.append(mediaColumn, contentColumn);
        body.replaceChildren(layout);
        if (window.UIkit?.update) window.UIkit.update(body);
    }

    renderMedia(media) {
        const wrapper = element('div', 'rmquickview__media');
        const main = element('button', 'rmquickview__main-image', {type: 'button'});
        const image = element('img', '', {loading: 'eager'});
        const placeholder = element('span', 'rmquickview__placeholder uk-text-muted');
        const placeholderIcon = element('span', '', {'uk-icon': 'icon: image; ratio: 2.5'});
        const placeholderText = element('span', 'uk-display-block uk-text-small uk-margin-small-top');
        placeholderText.append(text(translate('PLG_YTDYNAMICS_NO_IMAGE', labels.noImage)));
        placeholder.append(placeholderIcon, placeholderText);
        const items = media.length ? media : [{src: '', alt: this.product?.title || ''}];

        const select = (index) => {
            const item = items[index];
            if (item.src) image.src = item.src;
            else image.removeAttribute('src');
            image.alt = item.alt || this.product?.title || '';
            main.disabled = !item.src;
            main.classList.toggle('rmquickview__main-image--empty', !item.src);
            image.hidden = !item.src;
            placeholder.hidden = Boolean(item.src);
            wrapper.querySelectorAll('.rmquickview__thumb').forEach((thumb, thumbIndex) => {
                thumb.classList.toggle('rmquickview__thumb--active', thumbIndex === index);
                thumb.setAttribute('aria-pressed', thumbIndex === index ? 'true' : 'false');
            });
        };
        main.append(image, placeholder);
        main.addEventListener('click', () => {
            if (image.src && window.UIkit?.lightboxPanel) {
                window.UIkit.lightboxPanel({items: items.filter((item) => item.src).map((item) => ({source: item.src, caption: item.alt}))}).show(0);
            }
        });
        wrapper.append(main);

        if (items.length > 1) {
            const thumbs = element('div', 'rmquickview__thumbs uk-flex uk-flex-center uk-flex-wrap');
            items.forEach((item, index) => {
                const button = element('button', 'rmquickview__thumb', {type: 'button', 'aria-label': item.alt || `${index + 1}`});
                button.append(element('img', '', {src: item.src, alt: '', loading: 'lazy'}));
                button.addEventListener('click', () => select(index));
                thumbs.append(button);
            });
            wrapper.append(thumbs);
        }
        select(0);
        return wrapper;
    }

    renderContent(product, endpoint) {
        const fragment = document.createDocumentFragment();
        const title = element('h2', 'rmquickview__title uk-h2 uk-margin-remove-top');
        const link = element('a', 'uk-link-heading', {href: product.link});
        link.append(text(product.title));
        title.append(link);
        fragment.append(title);

        if (this.settings.showCode && product.code) {
            const code = element('div', 'rmquickview__code uk-text-meta uk-margin-small-bottom');
            code.append(text(product.code));
            fragment.append(code);
        }

        const price = element('div', 'rmquickview__price uk-text-large uk-text-bold');
        if (product.price?.discountEnabled && product.price.base) {
            const oldPrice = element('s', 'uk-text-muted uk-margin-small-right');
            oldPrice.append(text(product.price.base));
            price.append(oldPrice);
        }
        const finalPrice = element('span', '', {'data-rm-price': true});
        finalPrice.append(text(product.price?.final));
        price.append(finalPrice);
        fragment.append(price);

        const stock = element('div', `rmquickview__stock uk-margin-small-top ${product.inStock ? 'uk-text-success' : 'uk-text-muted'}`, {'data-rm-stock': true});
        stock.append(text(product.inStock
            ? translate('COM_RADICALMART_IN_STOCK', labels.inStock)
            : translate('COM_RADICALMART_NOT_IN_STOCK', labels.outOfStock)));
        fragment.append(stock);

        if (this.settings.showDescription && product.introtext) {
            const description = element('p', 'rmquickview__description uk-margin');
            description.append(text(product.introtext));
            fragment.append(description);
        }

        if (this.settings.showVariants && product.variants?.fields?.length) {
            const variants = this.renderVariants(product.variants, endpoint);
            fragment.append(variants);
        }

        if (this.settings.showCart) fragment.append(this.renderCart(product));

        const more = element('a', 'rmquickview__more uk-button uk-button-text uk-margin-top', {href: product.link});
        more.append(text(translate('PLG_YTDYNAMICS_DETAILS', labels.details)));
        fragment.append(more);
        return fragment;
    }

    renderVariants(data, endpoint) {
        const container = element('div', 'rmvariants rmquickview__variants uk-form-stacked', {
            'data-rm-variants': true,
            'data-endpoint': endpoint,
            'data-action': 'ajax',
            'data-disable-unavailable': 'true',
            'data-update-url': 'false'
        });

        const current = data.products.find((item) => Number(item.id) === Number(data.currentProduct));
        data.fields.forEach((field) => {
            const fieldset = element('fieldset', 'rmvariants__field uk-fieldset', {'data-rm-field': field.alias});
            const legend = element('legend', 'rmvariants__label uk-form-label');
            legend.append(text(field.title));
            const options = element('div', 'rmvariants__options uk-flex uk-flex-wrap uk-flex-middle', {role: 'group', 'aria-label': field.title});

            field.options.forEach((option) => {
                const active = String(current?.fields[field.alias]) === String(option.value);
                const swatch = option.image || option.color;
                const button = element('button', `rmvariants__option uk-button uk-button-default${swatch ? ' rmvariants__option--swatch' : ''}`, {
                    type: 'button', 'data-rm-value': option.value, 'aria-pressed': active ? 'true' : 'false', title: option.label
                });
                if (option.image) button.append(element('img', '', {src: option.image, alt: '', loading: 'lazy'}));
                else if (option.color) {
                    const color = element('span', 'rmvariants__color');
                    color.style.setProperty('--rm-swatch', option.color);
                    button.append(color);
                } else button.append(text(option.label));
                options.append(button);
            });
            fieldset.append(legend, options);
            container.append(fieldset);
        });
        container.append(element('div', 'rmvariants__status uk-text-small', {'aria-live': 'polite'}));

        new VariantPicker(container, data, (selected) => this.updateProduct(selected)).init();
        return container;
    }

    renderCart(product) {
        const row = element('div', 'rmquickview__cart uk-flex uk-flex-middle uk-flex-wrap uk-margin-top');
        const quantity = element('input', 'uk-input uk-form-width-xsmall', {
            type: 'number', value: product.quantity?.min || 1, min: product.quantity?.min || 1, step: product.quantity?.step || 1,
            max: product.quantity?.max, 'aria-label': translate('PLG_YTDYNAMICS_QUANTITY', labels.quantity)
        });
        const button = element('button', 'uk-button uk-button-primary', {type: 'button'});
        button.append(text(translate('COM_RADICALMART_CART_ADD', labels.addToCart)));
        button.disabled = !product.inStock;
        button.addEventListener('click', () => {
            if (window.RadicalMartCart && this.product?.id) {
                window.RadicalMartCart().addProduct(Number(this.product.id), Number(quantity.value) || 1);
            }
        });
        row.append(quantity, button);
        return row;
    }

    updateProduct(product) {
        this.product = {...this.product, ...product};
        const body = this.modal.querySelector('.rmquickview__body');
        const title = body.querySelector('.rmquickview__title a');
        const price = body.querySelector('.rmquickview__price');
        const stock = body.querySelector('[data-rm-stock]');
        const code = body.querySelector('.rmquickview__code');
        const description = body.querySelector('.rmquickview__description');
        const cart = body.querySelector('.rmquickview__cart .uk-button-primary');
        if (title) {
            title.textContent = product.title;
            title.href = product.link;
        }
        if (price) {
            price.replaceChildren();
            if (product.price?.discountEnabled && product.price.base) {
                const oldPrice = element('s', 'uk-text-muted uk-margin-small-right');
                oldPrice.append(text(product.price.base));
                price.append(oldPrice);
            }
            const finalPrice = element('span', '', {'data-rm-price': true});
            finalPrice.append(text(product.price?.final));
            price.append(finalPrice);
        }
        if (code) code.textContent = product.code || '';
        if (description) description.textContent = product.introtext || '';
        if (stock) {
            stock.textContent = product.inStock
                ? translate('COM_RADICALMART_IN_STOCK', labels.inStock)
                : translate('COM_RADICALMART_NOT_IN_STOCK', labels.outOfStock);
            stock.classList.toggle('uk-text-success', product.inStock);
            stock.classList.toggle('uk-text-muted', !product.inStock);
        }
        if (cart) cart.disabled = !product.inStock;

        const media = body.querySelector('.rmquickview__media');
        if (media) media.replaceWith(this.renderMedia(product.media || []));
        const more = body.querySelector('.rmquickview__more');
        if (more) more.href = product.link;
    }
}

const quickView = new QuickView();

const init = (root = document) => {
    if (root.matches?.('[data-rm-variants]')) new VariantPicker(root).init();
    root.querySelectorAll?.('[data-rm-variants]').forEach((container) => new VariantPicker(container).init());
};

document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-rm-quick-view]');
    if (trigger) {
        event.preventDefault();
        event.stopPropagation();
        quickView.open(trigger);
    }
}, true);

// RadicalMart binds the product id into its original click closure. Intercept
// only carts explicitly updated by RM Variants, so the current id is respected.
document.addEventListener('click', (event) => {
    const add = event.target.closest('[radicalmart-cart="add"], [data-radicalmart-cart="add"]');
    const cart = add?.closest('[radicalmart-cart="product"], [data-radicalmart-cart="product"]');
    if (!add || !cart?.dataset.rmDynamicProduct || !window.RadicalMartCart) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const quantity = cart.querySelector('[radicalmart-cart="quantity"], [data-radicalmart-cart="quantity"]');
    window.RadicalMartCart().addProduct(Number(cart.dataset.id), Number(quantity?.value) || 1);
}, true);

document.addEventListener('DOMContentLoaded', () => init());
new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) init(node);
}))).observe(document.documentElement, {childList: true, subtree: true});
