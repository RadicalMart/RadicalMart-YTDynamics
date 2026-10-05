import './product-interactions.scss';
import {observeDynamicContent} from './runtime.es6';

const text = (value) => document.createTextNode(value || '');
const clone = (value) => {
    if (value === null || value === undefined) return value;
    return typeof structuredClone === 'function'
        ? structuredClone(value)
        : JSON.parse(JSON.stringify(value));
};

const productDiscountText = (price = {}, mode = 'amount') => {
    if (mode === 'legacy') return String(price.discount || '');

    const base = Number(price.baseValue) || 0;
    const final = Number(price.finalValue) || 0;
    const percent = base > 0 && final < base
        ? Math.max(0, Math.round(((base - final) / base) * 100))
        : 0;
    const amount = String(price.discount || '').replace(/^[-−\s]+/, '');
    const percentText = percent > 0 ? `-${percent}%` : '';
    const amountText = amount ? `-${amount}` : '';

    if (mode === 'percent') return percentText;
    if (mode === 'both') return [percentText, amountText].filter(Boolean).join(' · ');
    return amountText;
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

const translate = (key, fallback) => {
    const translated = window.Joomla?.Text?._?.(key);
    return translated && translated !== key ? translated : fallback;
};

const labels = {
    loading: translate('PLG_YTDYNAMICS_LOADING', 'Loading…'),
    error: translate('PLG_YTDYNAMICS_ERROR_LOAD_PRODUCT', 'Unable to load product.'),
    emptyProduct: translate('PLG_YTDYNAMICS_ERROR_EMPTY_PRODUCT', 'Product data is empty.'),
    emptyQuickView: translate('PLG_YTDYNAMICS_ERROR_EMPTY_QUICK_VIEW', 'Quick View layout is empty.'),
    inStock: translate('COM_RADICALMART_IN_STOCK', 'In stock'),
    outOfStock: translate('COM_RADICALMART_NOT_IN_STOCK', 'Not available'),
    quantity: translate('PLG_YTDYNAMICS_QUANTITY', 'Quantity'),
    addToCart: translate('COM_RADICALMART_CART_ADD', 'Add to cart'),
    cartAdded: translate('PLG_YTDYNAMICS_CART_ADDED', 'Product added to cart'),
    details: translate('PLG_YTDYNAMICS_DETAILS', 'Details'),
    quickView: translate('PLG_YTDYNAMICS_QUICK_VIEW', 'Quick view'),
    noImage: translate('PLG_YTDYNAMICS_NO_IMAGE', 'No image')
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
    if (!data || !data.id) throw new Error(labels.emptyProduct);
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
    if (!data || !data.html) throw new Error(labels.emptyQuickView);
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

const updateOptionalElement = (node, available) => {
    node.hidden = !available;
    node.setAttribute('aria-hidden', available ? 'false' : 'true');
};

const findProductField = (product = {}, alias = '') => {
    if (!alias) return null;
    for (const fieldset of product.fieldsets || []) {
        const field = (fieldset.fields || []).find((item) => String(item.alias || '') === alias);
        if (field) return field;
    }
    return null;
};

const renderProductCustomField = (container, product = {}) => {
    const field = findProductField(product, container.dataset.fieldAlias || '');
    const fallback = container.dataset.emptyText || '';
    const label = container.querySelector('[data-rm-product-custom-label]');
    const value = container.querySelector('[data-rm-product-custom-value]');
    const available = Boolean(field) || fallback !== '';

    if (label) {
        label.textContent = `${field?.title || container.dataset.fieldAlias || ''}${container.dataset.labelSeparator || ''}`;
        label.hidden = container.dataset.showLabel !== 'true';
    }
    if (value) {
        if (field && container.dataset.valueMode === 'formatted') {
            value.innerHTML = field.value || '';
            if (!value.childNodes.length && field.text) value.append(text(field.text));
        } else {
            value.textContent = field?.text || fallback;
        }
    }
    updateOptionalElement(container, available);
};

const renderProductBadges = (container, badges = []) => {
    const limit = Math.max(0, Number(container.dataset.limit) || 0);
    const items = limit ? badges.slice(0, limit) : badges;
    const list = container.querySelector('[data-rm-product-badges-list]');
    if (!list) return;

    const fragment = document.createDocumentFragment();
    items.forEach((badge) => {
        const tag = container.dataset.linkBadges !== 'false' && badge.link ? 'a' : 'span';
        const item = element(tag, 'rm-product-badges__item');
        if (tag === 'a') item.href = badge.link;
        if (badge.icon && container.dataset.showIcons !== 'false') {
            item.append(element('img', 'rm-product-badges__icon', {
                src: badge.icon,
                alt: badge.title || '',
                loading: 'lazy'
            }));
            if (container.dataset.showTitles === 'true') {
                const label = element('span', 'rm-product-badges__label');
                label.append(text(badge.title));
                item.append(label);
            }
        } else {
            const style = container.dataset.labelStyle || '';
            const label = element('span', `rm-product-badges__label uk-label${style ? ` uk-label-${style}` : ''}`);
            label.append(text(badge.title));
            item.append(label);
        }
        fragment.append(item);
    });
    list.replaceChildren(fragment);
    updateOptionalElement(container, items.length > 0);
};

const renderProductRating = (container, rating = {}) => {
    const available = Boolean(rating.available);
    const value = Math.max(0, Math.min(Number(rating.max) || 5, Number(rating.value) || 0));
    const max = Math.max(1, Number(rating.max) || 5);
    const percent = `${(value / max) * 100}%`;
    const stars = container.querySelector('[data-rm-product-rating-stars]');
    const valueNode = container.querySelector('[data-rm-product-rating-value]');
    const countNode = container.querySelector('[data-rm-product-rating-count]');
    if (stars) stars.style.setProperty('--rm-product-rating-percent', percent);
    if (valueNode) valueNode.textContent = value.toLocaleString(undefined, {maximumFractionDigits: 1});
    if (countNode) {
        countNode.textContent = String(Math.max(0, Number(rating.count) || 0));
        countNode.hidden = container.dataset.showCount !== 'true';
    }
    container.setAttribute('aria-label', `${value} / ${max}`);
    updateOptionalElement(container, available || container.dataset.showEmpty === 'true');
};

const renderProductBonus = (container, bonus = {}) => {
    const value = container.querySelector('[data-rm-product-bonus-value]');
    if (value) value.textContent = bonus.text || '';
    updateOptionalElement(container, Boolean(bonus.available) || container.dataset.showEmpty === 'true');
};

const renderProductStock = (container, product = {}) => {
    const quantity = product.quantity || {};
    const amount = Number(quantity.all) || 0;
    const status = container.querySelector('[data-rm-product-stock-status]');
    const amountNode = container.querySelector('[data-rm-product-stock-amount]');
    const progress = container.querySelector('[data-rm-product-stock-progress]');
    if (status) {
        status.textContent = product.inStock ? container.dataset.labelIn : container.dataset.labelOut;
        status.classList.toggle('uk-text-success', Boolean(product.inStock));
        status.classList.toggle('uk-text-muted', !product.inStock);
    }
    if (amountNode) {
        amountNode.textContent = quantity.stockAccounting
            ? `${amount} ${quantity.unitShort || quantity.units || ''}`.trim()
            : '';
        amountNode.hidden = container.dataset.showQuantity !== 'true' || !quantity.stockAccounting;
    }
    if (progress) {
        const threshold = Math.max(1, Number(container.dataset.progressThreshold) || 10);
        progress.max = threshold;
        progress.value = Math.min(amount, threshold);
        progress.hidden = container.dataset.showProgress !== 'true' || !quantity.stockAccounting;
    }
};

const renderProductUnit = (container, product = {}) => {
    const quantity = product.quantity || {};
    const unit = container.dataset.unitStyle === 'long'
        ? quantity.unit || quantity.units
        : quantity.unitShort || quantity.units;
    const unitNode = container.querySelector('[data-rm-product-unit-label]');
    const priceNode = container.querySelector('[data-rm-product-unit-price]');
    if (unitNode) unitNode.textContent = unit || '';
    if (priceNode) priceNode.textContent = product.price?.final || '';
    updateOptionalElement(container, Boolean(unit));
};

const oneClickProductValue = (source, product = {}) => {
    if (source === 'product_id') return String(product.id || '');
    if (source === 'product_title') return String(product.title || '');
    if (source === 'product_code') return String(product.code || '');
    if (source === 'product_url') return String(product.link || '');
    if (source === 'product_price') return String(product.price?.final || '');
    if (source === 'product_quantity') return String(product.quantity?.min ?? 1);
    return '';
};

const renderOneClickOrder = (container, product = {}) => {
    container.dataset.rmOneclickProductId = String(product.id || '');
    container.dataset.rmOneclickProductName = String(product.title || '');

    container.querySelectorAll('[data-rm-oneclick-source]').forEach((field) => {
        const source = field.dataset.rmOneclickSource || '';
        const nextValue = oneClickProductValue(source, product);

        if ('value' in field) field.value = nextValue;
        if (source !== 'product_quantity' || !field.matches('input[type="number"]')) return;

        const min = Number(product.quantity?.min) || 1;
        const step = Number(product.quantity?.step) || 1;
        const max = Number(product.quantity?.max) || 0;
        field.min = String(min);
        field.step = String(step);
        if (max > 0) field.max = String(max);
        else field.removeAttribute('max');
        field.value = String(min);
    });

    container.querySelectorAll('[data-rm-oneclick-subject-template]').forEach((field) => {
        const replacements = {
            product_id: String(product.id || ''),
            product_name: String(product.title || ''),
            product_code: String(product.code || ''),
            product_url: String(product.link || ''),
            product_price: String(product.price?.final || '')
        };
        let value = field.dataset.rmOneclickSubjectTemplate || '';
        Object.entries(replacements).forEach(([key, replacement]) => {
            value = value.split(`{${key}}`).join(replacement);
        });
        field.value = value;
    });

    const title = container.querySelector('[data-rm-oneclick-summary-title]');
    if (title) title.textContent = product.title || '';

    const image = container.querySelector('[data-rm-oneclick-summary-image]');
    const media = container.querySelector('[data-rm-oneclick-summary-media]');
    const imageSource = product.media?.[0]?.src || '';
    if (image) {
        if (imageSource) image.src = imageSource;
        else image.removeAttribute('src');
        image.alt = product.title || '';
    }
    if (media) media.hidden = !imageSource;

    const price = container.querySelector('[data-rm-oneclick-summary-price]');
    if (price) price.textContent = product.price?.final || '';
    const unit = container.querySelector('[data-rm-oneclick-summary-unit]');
    const unitText = product.quantity?.unitShort || product.quantity?.units || '';
    if (unit) {
        unit.textContent = unitText ? `/${unitText}` : '';
        unit.hidden = !unitText;
    }

    const bonus = container.querySelector('[data-rm-oneclick-summary-bonus]');
    const bonusWrap = container.querySelector('[data-rm-oneclick-summary-bonus-wrap]');
    const bonusText = String(product.bonus?.text || '');
    if (bonus) bonus.textContent = bonusText;
    if (bonusWrap) bonusWrap.hidden = !bonusText;

    const stock = container.querySelector('[data-rm-oneclick-summary-stock]');
    if (stock) {
        const inStock = Boolean(product.inStock);
        const stockLabel = stock.querySelector('[data-rm-oneclick-summary-stock-label]');
        const stockInIcon = stock.querySelector('[data-rm-oneclick-summary-stock-in]');
        const stockOutIcon = stock.querySelector('[data-rm-oneclick-summary-stock-out]');
        stock.classList.toggle('uk-text-success', inStock);
        stock.classList.toggle('uk-text-muted', !inStock);
        if (stockLabel) stockLabel.textContent = inStock ? stock.dataset.labelIn : stock.dataset.labelOut;
        if (stockInIcon) stockInIcon.hidden = !inStock;
        if (stockOutIcon) stockOutIcon.hidden = inStock;
    }

    const disabled = container.dataset.disableOutOfStock === 'true' && !product.inStock;
    container.querySelectorAll('.rf-button-send, [data-rm-oneclick-trigger]').forEach((button) => {
        button.disabled = disabled;
        if (disabled) button.setAttribute('aria-disabled', 'true');
        else button.removeAttribute('aria-disabled');
    });
};

const oneClickFieldValues = (form, name) => Array.from(form.elements)
    .filter((control) => control.name === name && !control.disabled)
    .flatMap((control) => {
        if ((control.type === 'checkbox' || control.type === 'radio') && !control.checked) return [];
        if (control instanceof HTMLSelectElement && control.multiple) {
            return Array.from(control.selectedOptions).map((option) => option.value);
        }
        return [String(control.value || '')];
    });

const syncOneClickConditionalFields = (order) => {
    const form = order.querySelector('form');
    if (!form) return;

    order.querySelectorAll('[data-rm-oneclick-condition-field]').forEach((field) => {
        const sourceName = field.dataset.rmOneclickConditionField || '';
        const expectedValue = field.dataset.rmOneclickConditionValue || '';
        const visible = oneClickFieldValues(form, sourceName).includes(expectedValue);

        field.hidden = !visible;
        field.setAttribute('aria-hidden', visible ? 'false' : 'true');
        field.querySelectorAll('input, select, textarea').forEach((control) => {
            control.disabled = !visible;
            const required = control.dataset.rmOneclickRequired === 'true';
            control.required = visible && required;
            control.classList.toggle('required', visible && required);
            if (!visible) {
                control.removeAttribute('aria-invalid');
                control.classList.remove('is-invalid', 'uk-form-danger');
            }
        });
    });
};

const initOneClickConditionalFields = (order) => {
    if (order.dataset.rmOneclickConditionsReady === 'true') return;
    order.dataset.rmOneclickConditionsReady = 'true';
    const form = order.querySelector('form');
    if (!form) return;

    const sync = () => syncOneClickConditionalFields(order);
    form.addEventListener('change', sync);
    form.addEventListener('input', sync);
    sync();
};

const renderProductSpecifications = (container, sourceFieldsets = []) => {
    const showVariants = container.dataset.showVariantFields !== 'false';
    const selectedFields = new Set(String(container.dataset.selectedFields || '')
        .split(',').map((alias) => alias.trim()).filter(Boolean));
    const fieldLimit = Math.max(0, Math.min(24, Number.parseInt(container.dataset.fieldLimit || '0', 10) || 0));
    const showTitles = container.dataset.showFieldsetTitles !== 'false';
    const divider = container.dataset.divider !== 'false';
    const striped = container.dataset.striped === 'true';
    const layout = ['description-list', 'table', 'grid'].includes(container.dataset.layout)
        ? container.dataset.layout : 'description-list';
    const responsiveColumn = (value, fallback) => ['1', '2', '3', '4'].includes(value) ? value : fallback;
    const legacyColumns = responsiveColumn(container.dataset.columns, '2');
    const columnsSmall = responsiveColumn(container.dataset.columnsSmall, '1');
    const columnsMedium = responsiveColumn(container.dataset.columnsMedium, legacyColumns);
    const columnsLarge = responsiveColumn(container.dataset.columnsLarge, legacyColumns);
    const tableResponsive = ['scroll', 'stack'].includes(container.dataset.tableResponsive)
        ? container.dataset.tableResponsive : 'scroll';
    let fieldsRemaining = fieldLimit || Number.POSITIVE_INFINITY;
    const fieldsets = [];
    sourceFieldsets.forEach((fieldset) => {
        if (fieldsRemaining <= 0) return;
        const fields = (fieldset.fields || []).filter((field) => (
            (showVariants || !field.variant)
            && (!selectedFields.size || selectedFields.has(String(field.alias || '')))
        )).slice(0, fieldsRemaining);
        if (!fields.length) return;
        fieldsets.push({...fieldset, fields});
        fieldsRemaining -= fields.length;
    });
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
            const wrapper = element('div', `rm-product-specifications__table-wrap${tableResponsive === 'scroll' ? ' uk-overflow-auto' : ''}`);
            wrapper.append(table);
            section.append(wrapper);
        } else if (layout === 'grid') {
            const grid = element('div', `rm-product-specifications__grid uk-child-width-1-1 uk-child-width-1-${columnsSmall}@s uk-child-width-1-${columnsMedium}@m uk-child-width-1-${columnsLarge}@l${divider ? ' uk-grid-divider' : ''}`, {'uk-grid': true});
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

const renderProductHoverGallery = (container, product = {}) => {
    const limit = Math.max(0, Math.min(20, Number.parseInt(container.dataset.maxImages || '0', 10) || 0));
    const items = (product.media || []).filter((item) => item?.src);
    const media = limit ? items.slice(0, limit) : items;
    const viewport = container.querySelector('.rm-product-hover-gallery__viewport');
    if (!viewport) return;

    const fragment = document.createDocumentFragment();
    media.forEach((item, index) => {
        const image = element('img', `rm-product-hover-gallery__image${index === 0 ? ' rm-product-hover-gallery__image--active' : ''}`, {
            'data-rm-product-hover-image': true,
            'data-index': index,
            src: item.src,
            alt: item.alt || product.title || '',
            loading: index === 0 ? (container.dataset.loading || 'lazy') : 'lazy',
            decoding: 'async',
            'aria-hidden': index === 0 ? 'false' : 'true'
        });
        fragment.append(image);
    });

    const indicatorStyle = container.dataset.indicators || 'bars';
    if (media.length > 1 && indicatorStyle !== 'none') {
        const indicators = element('span', `rm-product-hover-gallery__indicators rm-product-hover-gallery__indicators--${indicatorStyle}`, {
            'data-rm-product-hover-indicators': true,
            'aria-hidden': 'true'
        });
        media.forEach((item, index) => {
            indicators.append(element('span', `rm-product-hover-gallery__indicator${index === 0 ? ' rm-product-hover-gallery__indicator--active' : ''}`, {
                'data-index': index
            }));
        });
        fragment.append(indicators);
    }

    viewport.replaceChildren(fragment);
    container.hidden = media.length === 0;
    container.dispatchEvent(new CustomEvent('radicalmart:hover-gallery-refresh'));
};

const setMetaContent = (attribute, name, value) => {
    let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!node && !value) return;
    if (!node) {
        node = document.createElement('meta');
        node.setAttribute(attribute, name);
        document.head.append(node);
    }
    node.setAttribute('content', String(value || ''));
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
            // Initial markup can use YOOtheme-generated srcsets. A variant can
            // point to another file, so stale candidates must not override it.
            node.removeAttribute('srcset');
            node.removeAttribute('sizes');
            node.removeAttribute('data-src');
            node.removeAttribute('data-srcset');
            if (media.src) node.src = media.src;
            else node.removeAttribute('src');
            node.alt = media.alt || product.title || '';
            node.hidden = !media.src;
        });
        this.nodes('[data-rm-product-hover-gallery]').forEach((node) => {
            renderProductHoverGallery(node, product);
        });

        this.nodes('[data-rm-product-price]').forEach((node) => {
            const base = node.querySelector('[data-rm-product-price-base]');
            const final = node.querySelector('[data-rm-product-price-final]');
            const discount = node.querySelector('[data-rm-product-discount]');
            const savings = node.querySelector('[data-rm-product-price-savings]');
            const savingsValue = node.querySelector('[data-rm-product-price-savings-value]');
            const enabled = Boolean(product.price?.discountEnabled);
            const unitWrap = node.querySelector('[data-rm-product-price-unit-wrap]');
            const unitNode = node.querySelector('[data-rm-product-price-unit]');
            const unit = node.dataset.unitStyle === 'long'
                ? product.quantity?.unit || product.quantity?.units || ''
                : product.quantity?.unitShort || product.quantity?.units || '';
            if (base) {
                base.textContent = product.price?.base || '';
                base.hidden = !enabled || node.dataset.showBase !== 'true';
            }
            if (final) final.textContent = product.price?.final || '';
            if (discount) {
                const discountText = productDiscountText(product.price, node.dataset.discountMode || 'legacy');
                discount.textContent = discountText;
                discount.hidden = !enabled || node.dataset.showDiscount !== 'true' || !discountText;
            }
            if (savingsValue) savingsValue.textContent = product.price?.benefit || '';
            if (savings) savings.hidden = !enabled
                || node.dataset.showSavings !== 'true'
                || !(Number(product.price?.benefitValue) > 0);
            if (unitNode) unitNode.textContent = unit;
            if (unitWrap) unitWrap.hidden = node.dataset.showUnit !== 'true' || !unit;
        });
        this.nodes('[data-rm-product-base-price]').forEach((node) => {
            node.textContent = product.price?.base || '';
        });
        this.nodes('[data-rm-product-discount-value]').forEach((node) => {
            node.textContent = product.price?.discount || '';
            updateOptionalElement(node, Boolean(product.price?.discountEnabled));
        });
        this.nodes('[data-rm-product-benefit]').forEach((node) => {
            node.textContent = product.price?.benefit || '';
            updateOptionalElement(node, Number(product.price?.benefitValue) > 0);
        });

        this.nodes('[data-rm-product-availability]').forEach((node) => {
            node.textContent = product.inStock ? node.dataset.labelIn : node.dataset.labelOut;
            node.classList.toggle('uk-text-success', Boolean(product.inStock));
            node.classList.toggle('uk-text-muted', !product.inStock);
        });

        this.nodes('[data-rm-product-category]').forEach((node) => {
            node.textContent = product.category?.title || '';
            if (node.matches('a') && product.category?.link) node.href = product.category.link;
            updateOptionalElement(node, Boolean(product.category?.title));
        });
        this.nodes('[data-rm-product-manufacturer]').forEach((node) => {
            const manufacturer = product.manufacturers?.[0];
            node.textContent = manufacturer?.title || '';
            if (node.matches('a') && manufacturer?.link) node.href = manufacturer.link;
            updateOptionalElement(node, Boolean(manufacturer?.title));
        });
        this.nodes('[data-rm-product-stock-quantity]').forEach((node) => {
            const amount = Number(product.quantity?.all) || 0;
            const available = Boolean(product.quantity?.stockAccounting);
            node.textContent = available
                ? `${amount} ${product.quantity?.unitShort || product.quantity?.units || ''}`.trim()
                : '';
            updateOptionalElement(node, available);
        });
        this.nodes('[data-rm-product-unit-value]').forEach((node) => {
            const unit = product.quantity?.unitShort || product.quantity?.units || '';
            node.textContent = unit;
            updateOptionalElement(node, Boolean(unit));
        });
        this.nodes('[data-rm-product-unit]').forEach((node) => renderProductUnit(node, product));
        this.nodes('[data-rm-product-custom-field]').forEach((node) => renderProductCustomField(node, product));
        this.nodes('[data-rm-product-stock]').forEach((node) => renderProductStock(node, product));
        this.nodes('[data-rm-product-badges]').forEach((node) => renderProductBadges(node, product.badges || []));
        this.nodes('[data-rm-product-rating]').forEach((node) => renderProductRating(node, product.rating || {}));
        this.nodes('[data-rm-product-bonus]').forEach((node) => renderProductBonus(node, product.bonus || {}));
        this.nodes('[data-rm-product-select]').forEach((node) => {
            const input = node.matches('input') ? node : node.querySelector('input[type="checkbox"]');
            if (!input) return;
            const container = node.matches('input') ? node.closest('[data-rm-product-select]') || node : node;
            input.value = String(product.id);
            input.dataset.productId = String(product.id);
            input.dataset.productTitle = product.title || '';
            input.dataset.quantity = String(product.quantity?.min || 1);
            input.disabled = !product.inStock && container.dataset.disableOutOfStock !== 'false';
            const label = container.querySelector?.('[data-rm-product-select-label], .rm-product-select__label');
            if (label) {
                const baseLabel = container.dataset.baseLabel || '';
                label.textContent = container.dataset.showTitle === 'true'
                    ? `${baseLabel} ${product.title || ''}`.trim()
                    : baseLabel;
            }
            if (input.disabled && input.checked) {
                input.checked = false;
                input.dispatchEvent(new Event('change', {bubbles: true}));
            }
        });
        this.nodes('[data-rm-product-action]').forEach((node) => {
            node.dataset.productId = String(product.id);
            node.setAttribute('aria-label', `${node.dataset.label || ''} ${product.title || ''}`.trim());
            node.setAttribute('aria-pressed', 'false');
            node.classList.remove('rm-product-action--active');
            node.dispatchEvent(new CustomEvent('radicalmart:product-action-refresh'));
        });
        this.nodes('[data-rm-quick-view]').forEach((node) => {
            node.dataset.rmQuickView = String(product.id);
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

        this.nodes('[data-rm-oneclick-order]').forEach((node) => {
            renderOneClickOrder(node, product);
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

        this.source.dispatchEvent(new CustomEvent('radicalmart:product-change', {
            bubbles: true,
            detail: {product: this.product}
        }));
    }
}

class ProductBulkActions {
    constructor(container) {
        this.container = container;
        this.rootSelector = container.dataset.selectionRoot || '';
        this.resolvedRoot = null;
        this.pending = false;
        this.handleSelection = this.handleSelection.bind(this);
    }

    get root() {
        if (this.resolvedRoot) return this.resolvedRoot;
        if (this.rootSelector) {
            try {
                this.resolvedRoot = this.container.closest(this.rootSelector)
                    || document.querySelector(this.rootSelector)
                    || document;
                return this.resolvedRoot;
            } catch (error) {
                this.rootSelector = '';
            }
        }
        this.resolvedRoot = this.container.closest('[data-rm-selection-scope], .rm-grid, .uk-section') || document;
        return this.resolvedRoot;
    }

    selected() {
        return Array.from(this.root.querySelectorAll('[data-rm-product-select] input[type="checkbox"]:checked'));
    }

    init() {
        if (this.container.dataset.rmBulkActionsReady) return;
        this.container.dataset.rmBulkActionsReady = 'true';
        this.root.addEventListener('change', this.handleSelection);
        this.container.addEventListener('click', (event) => {
            const action = event.target.closest('[data-rm-bulk-action]')?.dataset.rmBulkAction;
            if (!action) return;
            event.preventDefault();
            if (action === 'clear') {
                this.selected().forEach((input) => {
                    input.checked = false;
                    input.dispatchEvent(new Event('change', {bubbles: true}));
                });
            } else if (action === 'cart') {
                this.addToCart();
            }
        });
        this.update();
    }

    handleSelection(event) {
        if (event.target.matches('[data-rm-product-select] input[type="checkbox"]')) this.update();
    }

    update() {
        const selected = this.selected();
        this.container.querySelectorAll('[data-rm-selection-count]').forEach((node) => {
            node.textContent = String(selected.length);
        });
        this.container.querySelectorAll('[data-rm-bulk-action="cart"], [data-rm-bulk-action="clear"]')
            .forEach((button) => { button.disabled = this.pending || selected.length === 0; });
    }

    setStatus(message) {
        const status = this.container.querySelector('[data-rm-bulk-status]');
        if (status) status.textContent = message;
    }

    addToCart() {
        const selected = this.selected();
        const cart = typeof window.RadicalMartCart === 'function' ? window.RadicalMartCart() : null;
        if (!selected.length || this.pending) return;
        if (!cart?.addProduct) {
            this.setStatus(translate('PLG_YTDYNAMICS_BULK_CART_UNAVAILABLE', 'Cart is unavailable.'));
            return;
        }

        // A free Builder composition can render the same product more than
        // once. RadicalMart de-duplicates concurrent adds by its cart hash, so
        // make the bulk action explicitly one add per product instead of
        // reporting success for skipped duplicate controls.
        const inputsByProduct = new Map();
        selected.forEach((input) => {
            const productId = Number(input.dataset.productId || input.value);
            if (productId && !inputsByProduct.has(productId)) inputsByProduct.set(productId, input);
        });
        const productIds = Array.from(inputsByProduct.keys());
        const waiting = new Set(productIds);
        const failures = new Set();
        this.pending = true;
        this.update();
        this.setStatus(translate('PLG_YTDYNAMICS_BULK_ADDING', 'Adding selected products…'));

        let timeout;
        const finish = () => {
            document.removeEventListener('onRadicalMartCartAfterAddProduct', handleResult);
            window.clearTimeout(timeout);
            this.pending = false;
            this.update();
            if (failures.size) {
                this.setStatus(translate('PLG_YTDYNAMICS_BULK_ADD_FAILED', 'Some products could not be added to the cart.'));
                this.container.dispatchEvent(new CustomEvent('radicalmart:bulk-add-error', {
                    bubbles: true,
                    detail: {productIds, failedProductIds: Array.from(failures)}
                }));
                return;
            }
            this.setStatus(translate('PLG_YTDYNAMICS_BULK_ADDED', 'Selected products were added to the cart.'));
            this.container.dispatchEvent(new CustomEvent('radicalmart:bulk-add', {
                bubbles: true,
                detail: {productIds}
            }));
        };
        const handleResult = (event) => {
            const productId = Number(event.detail?.entry?.product_id);
            if (!waiting.has(productId)) return;
            waiting.delete(productId);
            if (event.detail?.error) failures.add(productId);
            if (!waiting.size) finish();
        };
        document.addEventListener('onRadicalMartCartAfterAddProduct', handleResult);
        timeout = window.setTimeout(() => {
            waiting.forEach((productId) => failures.add(productId));
            waiting.clear();
            finish();
        }, 30000);

        Array.from(inputsByProduct.entries()).forEach(([productId, input], index) => {
            const quantity = Math.max(0.0001, Number(input.dataset.quantity) || 1);
            cart.addProduct(productId, quantity, {}, index === productIds.length - 1);
        });
    }
}

class ProductHoverGallery {
    constructor(container) {
        this.container = container;
        this.activeIndex = 0;
        this.touch = null;
        this.suppressClick = false;
        this.show = this.show.bind(this);
    }

    images() {
        return Array.from(this.container.querySelectorAll('[data-rm-product-hover-image]'));
    }

    show(index) {
        const images = this.images();
        if (!images.length) return;
        const next = Math.max(0, Math.min(images.length - 1, Number(index) || 0));
        this.activeIndex = next;
        images.forEach((image, imageIndex) => {
            const active = imageIndex === next;
            image.classList.toggle('rm-product-hover-gallery__image--active', active);
            image.setAttribute('aria-hidden', active ? 'false' : 'true');
        });
        this.container.querySelectorAll('.rm-product-hover-gallery__indicator').forEach((indicator, indicatorIndex) => {
            indicator.classList.toggle('rm-product-hover-gallery__indicator--active', indicatorIndex === next);
        });
    }

    init() {
        if (this.container.dataset.rmProductHoverGalleryReady) return;
        this.container.dataset.rmProductHoverGalleryReady = 'true';
        const viewport = this.container.querySelector('.rm-product-hover-gallery__viewport');
        if (!viewport) return;
        const pointerSurface = viewport.closest('.rm-product-card__main') || viewport;

        pointerSurface.addEventListener('pointermove', (event) => {
            if (event.pointerType === 'touch') return;
            const images = this.images();
            if (images.length < 2) return;
            const bounds = viewport.getBoundingClientRect();
            if (!bounds.width) return;
            const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
                && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
            if (!inside) {
                if (this.container.dataset.resetOnLeave !== 'false' && this.activeIndex !== 0) this.show(0);
                return;
            }
            const progress = Math.max(0, Math.min(.999999, (event.clientX - bounds.left) / bounds.width));
            this.show(Math.floor(progress * images.length));
        });
        pointerSurface.addEventListener('pointerleave', (event) => {
            if (event.pointerType === 'touch') return;
            if (this.container.dataset.resetOnLeave !== 'false') this.show(0);
        });
        viewport.addEventListener('pointerdown', (event) => {
            if (event.pointerType !== 'touch') return;
            this.touch = {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                time: performance.now()
            };
        });
        viewport.addEventListener('pointerup', (event) => {
            if (!this.touch || event.pointerId !== this.touch.id) return;
            const deltaX = event.clientX - this.touch.x;
            const deltaY = event.clientY - this.touch.y;
            const elapsed = performance.now() - this.touch.time;
            this.touch = null;
            if (elapsed > 750 || Math.abs(deltaX) < 36 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

            const images = this.images();
            if (images.length < 2) return;
            this.suppressClick = true;
            this.show(deltaX < 0
                ? (this.activeIndex + 1) % images.length
                : (this.activeIndex - 1 + images.length) % images.length);
            window.setTimeout(() => { this.suppressClick = false; }, 350);
        });
        viewport.addEventListener('pointercancel', () => {
            this.touch = null;
        });
        viewport.addEventListener('click', (event) => {
            if (!this.suppressClick) return;
            event.preventDefault();
            event.stopPropagation();
        }, true);
        viewport.addEventListener('keydown', (event) => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            const images = this.images();
            if (images.length < 2) return;
            event.preventDefault();
            if (event.key === 'Home') this.show(0);
            else if (event.key === 'End') this.show(images.length - 1);
            else if (event.key === 'ArrowLeft') this.show((this.activeIndex - 1 + images.length) % images.length);
            else this.show((this.activeIndex + 1) % images.length);
        });
        this.container.addEventListener('radicalmart:hover-gallery-refresh', () => this.show(0));
        this.show(0);
    }
}

class ProductOptionalAction {
    constructor(button) {
        this.button = button;
        this.type = button.dataset.rmProductAction;
        this.retryCount = 0;
        this.retryTimer = null;
        this.refresh = this.refresh.bind(this);
    }

    provider() {
        const source = this.type === 'favorite' ? window.RadicalMartFavorites : window.RadicalMartCompare;
        if (typeof source === 'function') {
            try { return source(); } catch (error) { return null; }
        }
        return source || null;
    }

    supported(provider) {
        return Boolean(provider && (typeof provider.toggleProduct === 'function' || typeof provider.toggle === 'function'));
    }

    isBuilderPreview() {
        try {
            const frameName = window.frameElement?.getAttribute('name') || '';
            return window.parent !== window && /^preview(?:-|$)/.test(frameName);
        } catch (error) {
            return false;
        }
    }

    setAvailability(supported) {
        const previewFallback = !supported && this.isBuilderPreview();
        this.button.hidden = !supported && !previewFallback;
        this.button.disabled = previewFallback;
        this.button.classList.toggle('rm-product-action--unavailable', previewFallback);
        if (previewFallback) this.button.setAttribute('aria-disabled', 'true');
        else this.button.removeAttribute('aria-disabled');
    }

    active(provider, productId) {
        for (const method of ['hasProduct', 'contains', 'isActive', 'has']) {
            if (typeof provider?.[method] !== 'function') continue;
            try {
                const value = provider[method](productId);
                return value && typeof value.then === 'function' ? null : Boolean(value);
            } catch (error) { return null; }
        }
        if (Array.isArray(provider?.products)) {
            return provider.products.some((item) => Number(item?.id ?? item) === productId);
        }
        return null;
    }

    setActive(active) {
        const enabled = Boolean(active);
        this.button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        this.button.classList.toggle('rm-product-action--active', enabled);
    }

    refresh() {
        const provider = this.provider();
        const supported = this.supported(provider);
        this.setAvailability(supported);
        if (!supported) return false;
        const active = this.active(provider, Number(this.button.dataset.productId));
        if (active !== null) this.setActive(active);
        return true;
    }

    retryProvider() {
        if (this.refresh() || this.retryCount >= 20) return;
        this.retryCount += 1;
        this.retryTimer = window.setTimeout(() => this.retryProvider(), 250);
    }

    init() {
        if (this.button.dataset.rmProductActionReady) return;
        this.button.dataset.rmProductActionReady = 'true';
        this.setActive(false);
        this.button.addEventListener('radicalmart:product-action-refresh', this.refresh);
        document.addEventListener('radicalmart:provider-ready', this.refresh);
        document.addEventListener(`radicalmart:${this.type}-ready`, this.refresh);
        if (this.type === 'favorite') document.addEventListener('radicalmart:favorites-ready', this.refresh);
        window.addEventListener('load', this.refresh, {once: true});
        this.retryProvider();

        this.button.addEventListener('click', (event) => {
            event.preventDefault();
            const id = Number(this.button.dataset.productId);
            if (!id) return;
            const api = this.provider();
            if (!this.supported(api)) {
                this.refresh();
                return;
            }
            const previous = this.button.getAttribute('aria-pressed') === 'true';
            this.setActive(!previous);
            let result;
            try {
                result = typeof api.toggleProduct === 'function' ? api.toggleProduct(id) : api.toggle(id);
            } catch (error) {
                this.setActive(previous);
                return;
            }
            Promise.resolve(result).then(() => {
                const active = this.active(api, id);
                if (active !== null) this.setActive(active);
            }).catch(() => this.setActive(previous));
            this.button.dispatchEvent(new CustomEvent(`radicalmart:${this.type}-toggle`, {
                bubbles: true,
                detail: {productId: id, active: !previous}
            }));
        });
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
        const visibleFocusable = Array.from(owner.querySelectorAll('a[href], button, input, select, textarea, [tabindex]'))
            .some((node) => {
                if (this.element.contains(node) || node.hasAttribute('disabled') || node.getAttribute('tabindex') === '-1') return false;
                if (node.closest('[hidden], [inert], [aria-hidden="true"]')) return false;
                const style = window.getComputedStyle(node);
                return style.display !== 'none' && style.visibility !== 'hidden' && node.getClientRects().length > 0;
            });
        if (!visibleFocusable && !owner.matches('a[href], button, input, select, textarea, [tabindex]')) {
            owner.tabIndex = 0;
        }
    }
}

class ProductCardPosition {
    constructor(element) {
        this.element = element;
    }

    init() {
        if (this.element.dataset.rmProductCardPositionReady) return;
        this.element.dataset.rmProductCardPositionReady = 'true';

        const owner = this.element.closest('.rm-product-card, [data-rm-product-scope]');
        if (!owner || owner === this.element) return;
        owner.classList.add('rm-product-card--positioned');

        if (!['interaction', 'focus'].includes(this.element.dataset.visibilityMode)) return;
        const visibleFocusable = Array.from(owner.querySelectorAll('a[href], button, input, select, textarea, [tabindex]'))
            .some((node) => {
                const position = node.closest('[data-rm-product-card-position]');
                if (position && position.dataset.visibilityMode !== 'always') return false;
                if (node.hasAttribute('disabled') || node.getAttribute('tabindex') === '-1') return false;
                if (node.closest('[hidden], [inert], [aria-hidden="true"]')) return false;
                const style = window.getComputedStyle(node);
                return style.display !== 'none' && style.visibility !== 'hidden' && node.getClientRects().length > 0;
            });
        if (!visibleFocusable && !owner.matches('a[href], button, input, select, textarea, [tabindex]')) {
            owner.tabIndex = 0;
        }
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
		// A Quick View is an isolated product surface. Its variant controls may
		// re-render the modal, but must never replace the listing URL or the
		// listing document's SEO metadata.
		fragment.querySelectorAll('[data-rm-variants]').forEach((selector) => {
			selector.dataset.updateUrl = 'none';
		});
		fragment.querySelectorAll('[data-rm-product-page]').forEach((scope) => {
			scope.dataset.updateDocumentTitle = 'false';
			scope.dataset.updateDocumentMetadata = 'false';
		});
		body.replaceChildren(fragment);
		this.builderContext = context;
		await loadAssets(assets, 'script');
		if (typeof window.RadicalMartCart === 'function') ensureRadicalMartDisplay();
        if (window.UIkit?.update) window.UIkit.update(body);
		if (body.querySelector('[data-rm-oneclick-order]')
			&& typeof window.RadicalForm?.RadicalFormClass?.init === 'function') {
			window.RadicalForm.RadicalFormClass.init(body);
		}
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
        button.textContent = cart.dataset.rmCartSuccess || labels.cartAdded;
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
	if (root.matches?.('[data-rm-oneclick-order]')) initOneClickConditionalFields(root);
	root.querySelectorAll?.('[data-rm-oneclick-order]').forEach((order) => initOneClickConditionalFields(order));
    if (root.matches?.('[data-rm-product-scope]')) new ProductScope(root).init();
    root.querySelectorAll?.('[data-rm-product-scope]').forEach((scope) => new ProductScope(scope).init());
    if (root.matches?.('[data-rm-product-card-dropdown]')) new ProductCardDropdown(root).init();
    root.querySelectorAll?.('[data-rm-product-card-dropdown]').forEach((dropdown) => new ProductCardDropdown(dropdown).init());
    if (root.matches?.('[data-rm-product-card-position]')) new ProductCardPosition(root).init();
    root.querySelectorAll?.('[data-rm-product-card-position]').forEach((position) => new ProductCardPosition(position).init());
    if (root.matches?.('[data-rm-product-hover-gallery]')) new ProductHoverGallery(root).init();
    root.querySelectorAll?.('[data-rm-product-hover-gallery]').forEach((gallery) => new ProductHoverGallery(gallery).init());
    if (root.matches?.('[data-rm-variants]')) new VariantPicker(root).init();
    root.querySelectorAll?.('[data-rm-variants]').forEach((container) => new VariantPicker(container).init());
    if (root.matches?.('[data-rm-bulk-actions]')) new ProductBulkActions(root).init();
    root.querySelectorAll?.('[data-rm-bulk-actions]').forEach((container) => new ProductBulkActions(container).init());
    if (root.matches?.('[data-rm-product-action]')) new ProductOptionalAction(root).init();
    root.querySelectorAll?.('[data-rm-product-action]').forEach((button) => new ProductOptionalAction(button).init());
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
observeDynamicContent(init);
