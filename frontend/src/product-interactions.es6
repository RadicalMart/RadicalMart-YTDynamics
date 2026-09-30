import './product-interactions.scss';

const text = (value) => document.createTextNode(value || '');
const clone = (value) => {
    if (value === null || value === undefined) return value;
    return typeof structuredClone === 'function'
        ? structuredClone(value)
        : JSON.parse(JSON.stringify(value));
};

const loadedAssets = new Map();

const assetKey = (asset, type) => `${type}:${asset.name || asset.uri || asset.content || ''}`;

const loadAsset = (asset, type) => {
    const key = assetKey(asset, type);
    if (!key || loadedAssets.has(key)) return loadedAssets.get(key) || Promise.resolve();

    const targetUrl = asset.uri ? new URL(asset.uri, document.baseURI).href : '';
    const existing = targetUrl
        ? Array.from(document.querySelectorAll(type === 'style' ? 'link[href]' : 'script[src]'))
            .find((node) => (type === 'style' ? node.href : node.src) === targetUrl)
        : null;
    if (existing) {
        const ready = Promise.resolve();
        loadedAssets.set(key, ready);
        return ready;
    }

    let node = null;
    const ready = new Promise((resolve, reject) => {
        node = document.createElement(type === 'style' && !asset.uri ? 'style'
            : type === 'style' ? 'link' : 'script');
        const attributes = asset.attributes || {};

        if (type === 'style' && asset.uri) {
            node.rel = 'stylesheet';
            node.href = asset.uri;
        } else if (type === 'script' && asset.uri) {
            node.src = asset.uri;
        } else {
            node.textContent = asset.content || '';
        }

        Object.entries(attributes).forEach(([name, value]) => {
            if (value !== false && value !== null && value !== undefined) {
                node.setAttribute(name, value === true ? '' : String(value));
            }
        });
        const nonce = document.querySelector('script[nonce],style[nonce]')?.nonce;
        if (nonce) node.nonce = nonce;

        if (asset.uri) {
            node.addEventListener('load', resolve, {once: true});
            node.addEventListener('error', () => reject(new Error(`Unable to load asset: ${asset.uri}`)), {once: true});
        }
        document.head.append(node);
        if (!asset.uri) resolve();
    }).catch((error) => {
        loadedAssets.delete(key);
        node?.remove();
        throw error;
    });
    loadedAssets.set(key, ready);
    return ready;
};

const loadAssets = async (assets = {}, type) => {
    for (const asset of assets[type] || []) {
        await loadAsset(asset, type);
    }
};

const ensureRadicalMartDisplay = () => {
    if (window.RadicalMartDisplay) return;

    // com_radicalmart.site normally creates this object on DOMContentLoaded.
    // Builder assets can be loaded later by Quick View, so initialise the same
    // public defaults without dispatching DOMContentLoaded a second time.
    window.RadicalMartDisplay = {
        cart: {
            addButtonsLock: true,
            displayModuleButtonsLock: true,
            discountHide: true,
            productsDiscountHide: true,
            badgeHide: true,
            moduleHide: true,
            moduleShow: true,
            pageErrors: true,
            pageReload: true,
            notification_addShow: true,
            errorsShow: true
        },
        checkout: {
            submitButtonsLock: true,
            discountHide: true,
            checkErrorsShow: true,
            checkErrorsProductsShow: true,
            globalLoadingShow: true,
            shippingLoadingShow: true,
            paymentLoadingShow: true,
            loginShow: true,
            errorsShow: true,
            createOrderProgress: true
        },
        login: {
            buttonsLock: true,
            fromShow: true,
            errorsShow: true
        }
    };
    document.dispatchEvent(new CustomEvent('onRadicalMartDisplayAfterSetConfig', {
        detail: window.RadicalMartDisplay
    }));
};

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

const resolveProductScope = (source) => {
    if (!source) return document;

    // Inside RM Grid, the grid item is the visual card. Use it as the hover and
    // update scope so RM Product Card does not create a second card surface and
    // the reveal panel can align with the complete grid item.
    return source.parentElement?.closest('.rm-grid-item, .el-item') || source;
};

const appendSpecificationValue = (node, field) => {
    node.innerHTML = field.value || '';
    if (!node.childNodes.length && field.text) node.append(text(field.text));
};

const renderProductSpecifications = (container, sourceFieldsets = []) => {
    const showVariants = container.dataset.showVariantFields !== 'false';
    const showTitles = container.dataset.showFieldsetTitles !== 'false';
    const divider = container.dataset.divider !== 'false';
    const striped = container.dataset.striped === 'true';
    const layout = ['description-list', 'table', 'grid'].includes(container.dataset.layout)
        ? container.dataset.layout : 'description-list';
    const columns = ['1', '2', '3', '4'].includes(container.dataset.columns)
        ? container.dataset.columns : '2';
    const fieldsets = sourceFieldsets.map((fieldset) => ({
        ...fieldset,
        fields: (fieldset.fields || []).filter((field) => showVariants || !field.variant)
    })).filter((fieldset) => fieldset.fields.length);
    const content = container.querySelector('.rm-product-specifications__content');
    if (!content) return;

    const fragment = document.createDocumentFragment();
    fieldsets.forEach((fieldset) => {
        const section = element('section', 'rm-product-specifications__fieldset');
        if (showTitles && fieldset.title) {
            const titleNode = element('h3', 'rm-product-specifications__title uk-h4');
            titleNode.append(text(fieldset.title));
            section.append(titleNode);
        }

        if (layout === 'table') {
            const table = element('table', `rm-product-specifications__table uk-table uk-table-small${divider ? ' uk-table-divider' : ''}${striped ? ' uk-table-striped' : ''}`);
            const body = document.createElement('tbody');
            fieldset.fields.forEach((field) => {
                const row = element('tr', 'rm-product-specifications__item');
                const label = element('th', 'rm-product-specifications__label', {scope: 'row'});
                const value = element('td', 'rm-product-specifications__value');
                label.append(text(field.title));
                appendSpecificationValue(value, field);
                row.append(label, value);
                body.append(row);
            });
            table.append(body);
            section.append(table);
        } else if (layout === 'grid') {
            const grid = element('div', `rm-product-specifications__grid uk-child-width-1-1 uk-child-width-1-${columns}@m${divider ? ' uk-grid-divider' : ''}`, {'uk-grid': true});
            fieldset.fields.forEach((field) => {
                const item = element('div', 'rm-product-specifications__item');
                const label = element('div', 'rm-product-specifications__label uk-text-meta');
                const value = element('div', 'rm-product-specifications__value uk-margin-small-top');
                label.append(text(field.title));
                appendSpecificationValue(value, field);
                item.append(label, value);
                grid.append(item);
            });
            section.append(grid);
        } else {
            const list = element('dl', `rm-product-specifications__list uk-description-list${divider ? ' uk-description-list-divider' : ''}`);
            fieldset.fields.forEach((field) => {
                const item = element('div', 'rm-product-specifications__item');
                const label = element('dt', 'rm-product-specifications__label');
                const value = element('dd', 'rm-product-specifications__value');
                label.append(text(field.title));
                appendSpecificationValue(value, field);
                item.append(label, value);
                list.append(item);
            });
            section.append(list);
        }
        fragment.append(section);
    });

    content.replaceChildren(fragment);
    container.hidden = fieldsets.length === 0;
    window.UIkit?.update?.(container);
};

const setMetaContent = (attribute, name, value) => {
    if (!value) return;
    let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!node) {
        node = document.createElement('meta');
        node.setAttribute(attribute, name);
        document.head.append(node);
    }
    node.setAttribute('content', value);
};

const updateProductMetadata = (product) => {
    const description = String(product.introtext || '').trim();
    const image = product.media?.[0]?.src || '';
    const link = product.link ? new URL(product.link, document.baseURI).href : '';
    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical && link) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
    }
    if (canonical && link) canonical.href = link;
    setMetaContent('name', 'description', description);
    setMetaContent('property', 'og:title', product.title || '');
    setMetaContent('property', 'og:description', description);
    setMetaContent('property', 'og:url', link);
    setMetaContent('property', 'og:image', image ? new URL(image, document.baseURI).href : '');
    setMetaContent('name', 'twitter:title', product.title || '');
    setMetaContent('name', 'twitter:description', description);
    setMetaContent('name', 'twitter:image', image ? new URL(image, document.baseURI).href : '');
};

class ProductScope {
    constructor(source) {
        this.source = source;
        this.scope = resolveProductScope(source);
        this.product = this.readData();
    }

    readData() {
        const data = Array.from(this.source.children || [])
            .find((node) => node.classList?.contains('rm-product__data')
                || node.classList?.contains('rm-product-card__data'));
        try {
            return JSON.parse(data?.textContent || '{}');
        } catch (error) {
            return null;
        }
    }

    nodes(selector) {
        return Array.from(this.scope.querySelectorAll(selector))
            .filter((node) => {
                const owner = node.closest('[data-rm-product-scope]');
                return owner === this.source || (!owner && this.scope !== this.source);
            });
    }

    init() {
        if (this.source.dataset.rmProductScopeReady) return;
        this.source.dataset.rmProductScopeReady = 'true';
        this.source.addEventListener('radicalmart:variant-change', (event) => {
            if (event.target.closest('[data-rm-product-scope]') !== this.source) return;
            if (event.detail?.product?.id) this.applyProduct(event.detail.product);
        });
        if (this.product?.id && this.source.dataset.rmProductPage === 'true') {
            if (this.source.dataset.updateDocumentTitle !== 'false' && this.product.title) {
                document.title = this.product.title;
            }
            if (this.source.dataset.updateDocumentMetadata !== 'false') {
                updateProductMetadata(this.product);
            }
        }
    }

    applyProduct(product) {
        this.product = {...this.product, ...product};
        this.source.dataset.rmProductId = String(product.id);

        this.nodes('[data-rm-product-title]').forEach((node) => {
            node.textContent = product.title || '';
        });
        this.nodes('[data-rm-product-code]').forEach((node) => {
            node.textContent = product.code || '';
        });
        this.nodes('[data-rm-product-description]').forEach((node) => {
            node.innerHTML = product.introtextHtml || product.introtext || '';
        });
        this.nodes('[data-rm-product-full-description]').forEach((node) => {
            node.innerHTML = product.fulltextHtml || product.fulltext || '';
        });
        this.nodes('[data-rm-product-link]').forEach((node) => {
            if (product.link) node.href = product.link;
        });

        const media = product.media?.[0] || {};
        this.nodes('[data-rm-product-image]').forEach((node) => {
            if (media.src) node.src = media.src;
            else node.removeAttribute('src');
            node.alt = media.alt || product.title || '';
            node.hidden = !media.src;
        });

        this.nodes('[data-rm-product-price]').forEach((node) => {
            const base = node.querySelector('[data-rm-product-price-base]');
            const final = node.querySelector('[data-rm-product-price-final]');
            const discount = node.querySelector('[data-rm-product-discount]');
            const enabled = Boolean(product.price?.discountEnabled);
            if (base) {
                base.textContent = product.price?.base || '';
                base.hidden = !enabled || node.dataset.showBase !== 'true';
            }
            if (final) final.textContent = product.price?.final || '';
            if (discount) {
                discount.textContent = product.price?.discount || '';
                discount.hidden = !enabled || node.dataset.showDiscount !== 'true';
            }
        });

        this.nodes('[data-rm-product-availability]').forEach((node) => {
            node.textContent = product.inStock ? node.dataset.labelIn : node.dataset.labelOut;
            node.classList.toggle('uk-text-success', Boolean(product.inStock));
            node.classList.toggle('uk-text-muted', !product.inStock);
        });

        this.nodes('[radicalmart-cart="product"], [data-radicalmart-cart="product"]').forEach((cart) => {
            cart.dataset.id = String(product.id);
            cart.dataset.rmDynamicProduct = 'true';
            const quantity = cart.querySelector('[radicalmart-cart="quantity"], [data-radicalmart-cart="quantity"]');
            if (quantity) {
                quantity.min = product.quantity?.min ?? 1;
                quantity.step = product.quantity?.step ?? 1;
                if (product.quantity?.max) quantity.max = product.quantity.max;
                else quantity.removeAttribute('max');
                if (Number(quantity.value) < Number(quantity.min)) quantity.value = quantity.min;
            }
            cart.querySelectorAll('[radicalmart-cart="add"], [data-radicalmart-cart="add"]')
                .forEach((button) => { button.disabled = !product.inStock; });
        });

        this.nodes('[data-rm-product-specifications]').forEach((node) => {
            renderProductSpecifications(node, product.fieldsets || []);
        });

        if (this.source.dataset.rmProductPage === 'true'
            && this.source.dataset.updateDocumentTitle !== 'false'
            && product.title) {
            document.title = product.title;
        }
        if (this.source.dataset.rmProductPage === 'true'
            && this.source.dataset.updateDocumentMetadata !== 'false') {
            updateProductMetadata(this.product);
        }

        this.scope.dispatchEvent(new CustomEvent('radicalmart:product-change', {
            bubbles: true,
            detail: {product: this.product}
        }));
    }
}

class ProductCardDropdown {
    constructor(element) {
        this.element = element;
    }

    init() {
        if (this.element.dataset.rmProductCardDropdownReady) return;
        this.element.dataset.rmProductCardDropdownReady = 'true';
        if (this.element.dataset.displayMode !== 'hover') return;

        const source = this.element.closest('[data-rm-product-scope]');
        const owner = source
            ? resolveProductScope(source)
            : this.element.parentElement?.closest('.el-item, .uk-card, .rm-product-card');
        if (!owner || owner === this.element) return;

        owner.classList.add('rm-product-card--hover');
        owner.dataset.rmHoverBreakpoint = this.element.dataset.hoverBreakpoint || 'm';
    }
}

class VariantPicker {
    constructor(container, data = null, onProduct = null) {
        this.container = container;
        this.data = data || this.readData();
        this.onProduct = onProduct;
        this.selected = {};
        this.pending = null;
		this.handlePopState = this.handlePopState.bind(this);
		this.visibleFields = new Set((this.data?.fields || []).map((field) => String(field.alias)));

        const current = this.data?.products?.find((product) => Number(product.id) === Number(this.data.currentProduct));
		if (current) {
			this.selected = this.visibleSelection(current.fields);
		}
    }

	visibleSelection(fields = {}) {
		return Object.fromEntries(
			Object.entries(fields).filter(([alias]) => this.visibleFields.has(String(alias)))
		);
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
		this.initHistory();
    }

	initHistory() {
		if (!['replace', 'push'].includes(this.container.dataset.updateUrl)
			|| typeof window.history?.replaceState !== 'function') return;

		const currentId = Number(this.data.currentProduct);
		if (currentId && !Number(window.history.state?.rmProductId)) {
			window.history.replaceState({...window.history.state, rmProductId: currentId}, '', window.location.href);
		}
		if (this.container.dataset.updateUrl === 'push') {
			window.addEventListener('popstate', this.handlePopState);
		}
	}

	handlePopState(event) {
		if (this.container.dataset.updateUrl !== 'push') return;
		let id = Number(event.state?.rmProductId);
		if (!id) {
			const currentUrl = new URL(window.location.href);
			const item = this.data.products.find((product) => {
				if (!product.link) return false;
				const link = new URL(product.link, document.baseURI);
				return link.pathname === currentUrl.pathname && link.search === currentUrl.search;
			});
			id = Number(item?.id);
		}
		const product = this.data.products.find((item) => Number(item.id) === id);
		if (!product || Number(this.data.currentProduct) === id) return;

		this.selected = this.visibleSelection(product.fields);
		this.data.currentProduct = id;
		this.renderState();
		this.loadProduct(product, false);
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

		this.selected = this.visibleSelection(product.fields);
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

			const selectedLabel = wrapper.querySelector('[data-rm-selected-label]');
			if (selectedLabel) {
				const value = String(this.selected[field.alias] ?? '');
				const option = field.options.find((item) => String(item.value) === value);
				selectedLabel.textContent = option?.label ? ` · ${option.label}` : '';
			}
        });
    }

    isAvailable(alias, value) {
        const otherFields = Object.entries(this.selected).filter(([key]) => key !== alias);
        return this.data.products.some((product) => String(product.fields[alias]) === String(value)
            && otherFields.every(([key, selected]) => String(product.fields[key]) === String(selected)));
    }

    async loadProduct(product, updateHistory = true) {
        const status = this.container.querySelector('.rmvariants__status');
        const loading = this.container.querySelector('[data-rm-label-loading]')?.textContent || 'Loading…';
        const productScope = this.container.closest('[data-rm-product-scope]');
        if (status) status.textContent = loading;
        this.container.classList.add('rmvariants--loading');
		productScope?.classList.add('rm-product--loading');
		productScope?.setAttribute('aria-busy', 'true');

        if (this.pending) this.pending.abort();
        this.pending = new AbortController();
        const controller = this.pending;

        try {
            const full = await requestProduct(this.container.dataset.endpoint, 'variant', product.id, controller.signal);
            this.applyProduct(full, updateHistory);
            if (status) status.textContent = '';
        } catch (error) {
            if (error.name !== 'AbortError' && status) status.textContent = error.message;
        } finally {
            if (this.pending === controller) {
                this.container.classList.remove('rmvariants--loading');
				productScope?.classList.remove('rm-product--loading');
				productScope?.removeAttribute('aria-busy');
                this.pending = null;
            }
        }
    }

    applyProduct(product, updateHistory = true) {
        if (typeof this.onProduct === 'function') {
            this.onProduct(product);
        } else {
            const source = this.container.closest('[data-rm-product-scope]');
            const scope = source
				? resolveProductScope(source)
				: this.container.parentElement?.closest('.el-item, .uk-card, .rm-product-card') || document;
            scope.querySelectorAll('[radicalmart-cart="product"], [data-radicalmart-cart="product"]')
                .forEach((cart) => {
                    cart.dataset.id = product.id;
                    cart.dataset.rmDynamicProduct = 'true';
                });
        }

        const urlMode = this.container.dataset.updateUrl;
        const historyMethod = urlMode === 'push' ? 'pushState' : urlMode === 'replace' ? 'replaceState' : null;
        if (updateHistory && historyMethod && product.link && typeof window.history?.[historyMethod] === 'function') {
            window.history[historyMethod]({...window.history.state, rmProductId: product.id}, '', product.link);
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
		this.modalClasses = [];
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
		const root = trigger.closest('[data-rm-quick-view-root]');
		const dialog = this.modal.querySelector('.rmquickview__dialog');
		const label = root?.dataset.rmQuickViewLabel || trigger.textContent.trim()
			|| translate('PLG_YTDYNAMICS_QUICK_VIEW', labels.quickView);
		this.modal.setAttribute('aria-label', label);
		if (dialog) dialog.setAttribute('aria-label', label);
		if (root?.dataset.id) this.modal.dataset.id = root.dataset.id;
		else delete this.modal.dataset.id;
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
					? clone(this.cache.get(key))
					: await requestQuickViewLayout(
						trigger.dataset.endpoint,
						id,
						trigger.dataset.templateId,
						controller.signal
					);
				this.cache.set(key, clone(layout));
				this.product = null;
				await this.renderBuilderContent(layout.html, {
					endpoint: trigger.dataset.endpoint,
					templateId: trigger.dataset.templateId,
					productId: id
				}, layout.assets);
				return;
			}

            const key = `${trigger.dataset.endpoint}:${id}`;
            const product = this.cache.has(key)
                ? clone(this.cache.get(key))
                : await requestProduct(trigger.dataset.endpoint, 'quickView', id, controller.signal);
            this.cache.set(key, clone(product));
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
        this.modal.innerHTML = `<div class="rmquickview__dialog uk-modal-dialog" role="dialog" aria-modal="true" aria-label="${translate('PLG_YTDYNAMICS_QUICK_VIEW', labels.quickView)}"><button class="rmquickview__close uk-modal-close-default" type="button" uk-close aria-label="${translate('JLIB_HTML_BEHAVIOR_CLOSE', 'Close')}"></button><div class="rmquickview__body uk-modal-body"></div></div>`;
		this.modal.addEventListener('radicalmart:variant-change', (event) => {
			const productId = Number(event.detail?.product?.id);
			if (this.builderContext && productId) this.loadBuilderProduct(productId);
		});
        document.body.appendChild(this.modal);
    }

    show() {
        this.modal.classList.remove(...this.modalClasses);
		this.modalClasses = String(this.settings.modalClass || '').split(/\s+/).filter(Boolean);
		this.modal.classList.add(...this.modalClasses);
        const modalSize = ['', 'small', 'large', 'xlarge', 'container', 'full'].includes(this.settings.modalSize)
            ? this.settings.modalSize : 'container';
        const center = this.settings.modalCenter !== false && modalSize !== 'full';
        const bgClose = this.settings.bgClose !== false;
        const escClose = this.settings.escClose !== false;
        const dialog = this.modal.querySelector('.rmquickview__dialog');
        const body = this.modal.querySelector('.rmquickview__body');
        const close = this.modal.querySelector('.rmquickview__close');
        const contentPadding = ['none', 'small', 'default', 'large'].includes(this.settings.contentPadding)
            ? this.settings.contentPadding : 'default';

        this.modal.classList.toggle('uk-modal-container', modalSize === 'container');
        this.modal.classList.toggle('uk-modal-full', modalSize === 'full');
        this.modal.classList.toggle('uk-flex-top', center);
        this.modal.classList.toggle('rmquickview--small', modalSize === 'small');
        this.modal.classList.toggle('rmquickview--large', modalSize === 'large');
        this.modal.classList.toggle('rmquickview--xlarge', modalSize === 'xlarge');
        this.modal.classList.toggle('rmquickview--mobile-full', this.settings.mobileFullscreen !== false || modalSize === 'full');
        this.modal.setAttribute('uk-modal', `bg-close: ${bgClose}; esc-close: ${escClose}`);

        dialog?.classList.toggle('uk-margin-auto-vertical', center);
        body?.classList.toggle('uk-overflow-auto', this.settings.overflowAuto === true);
        ['none', 'small', 'default', 'large'].forEach((padding) => {
            body?.classList.toggle(`rmquickview__body--padding-${padding}`, padding === contentPadding);
        });
        if (close) {
            close.hidden = this.settings.showClose === false;
            close.classList.toggle('uk-close-large', this.settings.closeLarge === true || modalSize === 'full');
            close.classList.toggle('uk-modal-close-default', modalSize !== 'full');
            close.classList.toggle('uk-modal-close-full', modalSize === 'full');
        }

        if (window.UIkit?.modal) {
            const component = window.UIkit.modal(this.modal);
            if (component?.$props) {
                component.$props.bgClose = bgClose;
                component.$props.escClose = escClose;
            }
            component.show();
        }
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

    async renderBuilderContent(html, context = this.builderContext, assets = {}) {
        const body = this.modal.querySelector('.rmquickview__body');
		if (assets.options && window.Joomla?.loadOptions) {
			window.Joomla.loadOptions(assets.options);
		}
		await loadAssets(assets, 'style');
		const fragment = document.createRange().createContextualFragment(html);
		body.replaceChildren(fragment);
		this.builderContext = context;
		await loadAssets(assets, 'script');
		if (typeof window.RadicalMartCart === 'function') ensureRadicalMartDisplay();
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
				? clone(this.cache.get(key))
				: await requestQuickViewLayout(context.endpoint, productId, context.templateId, controller.signal);
			this.cache.set(key, clone(layout));
			await this.renderBuilderContent(layout.html, {...context, productId}, layout.assets);
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
const cartFeedbackTimers = new WeakMap();

const prepareCartButton = (button) => {
    if (!button.dataset.rmCartOriginal) button.dataset.rmCartOriginal = button.innerHTML;
    window.clearTimeout(cartFeedbackTimers.get(button));
};

const showCartPending = (cart, button) => {
    prepareCartButton(button);
    button.textContent = cart.dataset.rmCartLoading || labels.loading;
    button.setAttribute('aria-busy', 'true');
};

const showCartFeedback = (event) => {
    if (event.detail?.error) return;

    const productId = Number(event.detail?.entry?.product_id || 0);
    if (!productId) return;

    document.querySelectorAll(
        `[radicalmart-cart="product"][data-id="${productId}"], `
        + `[data-radicalmart-cart="product"][data-id="${productId}"]`
    ).forEach((cart) => {
        const button = cart.querySelector('[radicalmart-cart="add"], [data-radicalmart-cart="add"]');
        if (!button) return;

        prepareCartButton(button);
        button.textContent = cart.dataset.rmCartSuccess || 'Product added to cart';
        button.classList.add('rm-buy__button--success');
        button.removeAttribute('aria-busy');
        button.setAttribute('aria-live', 'polite');

        const timer = window.setTimeout(() => {
            button.innerHTML = button.dataset.rmCartOriginal;
            button.classList.remove('rm-buy__button--success');
            button.removeAttribute('aria-live');
            cartFeedbackTimers.delete(button);
        }, 2200);
        cartFeedbackTimers.set(button, timer);
    });
};

const resetPendingCartButtons = () => {
    document.querySelectorAll('[radicalmart-cart="add"][aria-busy="true"], [data-radicalmart-cart="add"][aria-busy="true"]')
        .forEach((button) => {
            if (button.dataset.rmCartOriginal) button.innerHTML = button.dataset.rmCartOriginal;
            button.removeAttribute('aria-busy');
        });
};

const init = (root = document) => {
    if (root.matches?.('[data-rm-product-scope]')) new ProductScope(root).init();
    root.querySelectorAll?.('[data-rm-product-scope]').forEach((scope) => new ProductScope(scope).init());
    if (root.matches?.('[data-rm-product-card-dropdown]')) new ProductCardDropdown(root).init();
    root.querySelectorAll?.('[data-rm-product-card-dropdown]').forEach((dropdown) => new ProductCardDropdown(dropdown).init());
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
    showCartPending(cart, add);
    const quantity = cart.querySelector('[radicalmart-cart="quantity"], [data-radicalmart-cart="quantity"]');
    window.RadicalMartCart().addProduct(Number(cart.dataset.id), Number(quantity?.value) || 1);
}, true);

document.addEventListener('onRadicalMartCartAfterAddProduct', showCartFeedback);
document.addEventListener('onRadicalMartCartError', resetPendingCartButtons);

document.addEventListener('DOMContentLoaded', () => init());
new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) init(node);
}))).observe(document.documentElement, {childList: true, subtree: true});
