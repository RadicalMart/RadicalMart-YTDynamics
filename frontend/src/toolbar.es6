import './toolbar.scss';
import {observeDynamicContent} from './runtime.es6';

const COOKIE_TTL = 7 * 24 * 60 * 60 * 1000;
const LAYOUTS = new Set(['tile', 'compact', 'list', 'price']);
const CONTROL_SELECTOR = '[data-rm-ordering-element], [data-rm-layout-switcher]';
// RadicalMart itself still consumes grid/list/table from the shared cookie.
// Its fallback remains a valid grid even when YTDynamics selects compact.
const RADICALMART_LAYOUTS = {tile: 'grid', compact: 'grid', list: 'list', price: 'table'};

const setCookie = (name, value, path) => {
    if (!name) {
        return;
    }

    const cookiePath = path?.startsWith('/') ? path.replace(/[;\r\n]/g, '') : '/';
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${new Date(Date.now() + COOKIE_TTL).toUTCString()}; path=${cookiePath}; SameSite=Lax${secure}`;
};

const clearCookie = (name, path) => {
    if (!name) return;
    const cookiePath = path?.startsWith('/') ? path.replace(/[;\r\n]/g, '') : '/';
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${cookiePath}; SameSite=Lax${secure}`;
};

const visibleLayouts = (toolbar) => new Set((toolbar.dataset.rmLayouts || '').split(',').filter(Boolean));

const productData = (item) => {
    try {
        return JSON.parse(item.querySelector('.rm-product-card__data')?.textContent || '{}');
    } catch (error) {
        return {};
    }
};

const compareProducts = (ordering, left, right) => {
    const a = productData(left);
    const b = productData(right);

    switch (ordering) {
        case 'ordering_price ASC':
            return Number(a.price?.finalValue || 0) - Number(b.price?.finalValue || 0);
        case 'ordering_price DESC':
            return Number(b.price?.finalValue || 0) - Number(a.price?.finalValue || 0);
        case 'ordering_title ASC':
            return String(a.title || '').localeCompare(String(b.title || ''), document.documentElement.lang || undefined);
        case 'ordering_date DESC':
            // Product IDs are monotonically assigned and are the only stable
            // date proxy available to arbitrary static Builder collections.
            return Number(b.id || 0) - Number(a.id || 0);
        default:
            return Number(left.dataset.rmOriginalOrder || 0) - Number(right.dataset.rmOriginalOrder || 0);
    }
};

const sortBuilderCollections = (ordering) => {
    const groups = new Map();
    document.querySelectorAll('[data-rm-product-scope]').forEach((scope) => {
        const item = scope.closest('.el-item');
        // YOOtheme Grid wraps every .el-item in a generated grid cell. Reorder
        // those cells, not the inner cards, so UIkit can recalculate columns.
        const cell = item?.parentElement;
        const parent = cell?.parentElement;
        if (!item || !cell || !parent || cell.parentElement !== parent) return;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(cell);
    });

    groups.forEach((items, parent) => {
        items.forEach((item, index) => {
            if (!item.dataset.rmOriginalOrder) item.dataset.rmOriginalOrder = String(index);
        });
        [...new Set(items)].sort((a, b) => compareProducts(ordering, a, b)).forEach((item) => parent.append(item));
    });
};

const selectLayout = (toolbar, layout) => {
    if (!LAYOUTS.has(layout) || !visibleLayouts(toolbar).has(layout)) return;

    toolbar.querySelectorAll('[data-rm-layout]').forEach((layoutButton) => {
        const active = layoutButton.dataset.rmLayout === layout;
        layoutButton.setAttribute('aria-pressed', active ? 'true' : 'false');
        layoutButton.closest('li')?.classList.toggle('uk-active', active);
    });
    const mobileSelect = toolbar.querySelector('.rm-toolbar__layout-select');
    if (mobileSelect) mobileSelect.value = layout;

    setCookie(toolbar.dataset.modeCookie, layout, toolbar.dataset.cookiePath);
    setCookie(toolbar.dataset.layoutCookie, RADICALMART_LAYOUTS[layout], toolbar.dataset.cookiePath);
    const url = new URL(window.location.href);
    url.searchParams.delete('start');
    url.searchParams.delete(toolbar.dataset.modeCookie);
    url.searchParams.delete(toolbar.dataset.layoutCookie);
    window.location.assign(url.toString());
};

const syncNativeSwitcher = () => {
    const nativeSwitcher = window.setProductsListTemplate;
    if (typeof nativeSwitcher !== 'function' || nativeSwitcher.rmYTDynamicsSynced) return;

    const syncedSwitcher = function (...args) {
        document.querySelectorAll(CONTROL_SELECTOR).forEach((control) => {
            clearCookie(control.dataset.modeCookie, control.dataset.cookiePath);
        });
        return nativeSwitcher.apply(this, args);
    };
    syncedSwitcher.rmYTDynamicsSynced = true;
    window.setProductsListTemplate = syncedSwitcher;
};

const selectOrdering = (toolbar, value) => {
    const select = toolbar.querySelector('.rm-toolbar__select');
    if (!select || !Array.from(select.options).some((option) => option.value === value)) return;

    select.value = value;
    setCookie(toolbar.dataset.orderingCookie, value, toolbar.dataset.cookiePath);
    const url = new URL(window.location.href);
    url.searchParams.delete('start');
    window.location.assign(url.toString());
};

const initControl = (control) => {
    if (control.dataset.rmToolbarReady === 'true') {
        return;
    }

    control.dataset.rmToolbarReady = 'true';
    const orderingSelect = control.querySelector('.rm-toolbar__select');
    if (orderingSelect) sortBuilderCollections(orderingSelect.value || 'ordering ASC');

    control.addEventListener('click', (event) => {
        const button = event.target.closest('[data-rm-layout]');
        if (!button || !control.contains(button)) {
            return;
        }

		selectLayout(control, button.dataset.rmLayout);
    });

    control.querySelector('.rm-toolbar__layout-select')?.addEventListener('change', (event) => {
        selectLayout(control, event.target.value);
    });

    orderingSelect?.addEventListener('change', (event) => {
        selectOrdering(control, event.target.value);
    });
};

const initControls = (root = document) => {
    if (root.matches?.(CONTROL_SELECTOR)) {
        initControl(root);
    }

    root.querySelectorAll?.(CONTROL_SELECTOR).forEach(initControl);
};

const start = () => {
    initControls();
    syncNativeSwitcher();
    observeDynamicContent((node) => {
        initControls(node);
        syncNativeSwitcher();
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, {once: true});
} else {
    start();
}
