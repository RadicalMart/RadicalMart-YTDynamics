import './lazy-pagination.scss';
import {observeDynamicContent} from './runtime.es6';

const ROOT_SELECTOR = '[data-rm-lazy-pagination]';

const productCells = (scope, selector) => {
    let markers;
    try {
        markers = scope.querySelectorAll(selector);
    } catch (error) {
        markers = scope.querySelectorAll('[data-rm-product-scope]');
    }

    return [...new Set(Array.from(markers, (marker) => marker.closest('.el-item')?.parentElement).filter(Boolean))];
};

const setLoading = (root, loading) => {
    root.classList.toggle('is-loading', loading);
    const button = root.querySelector('.rm-lazy-pagination__button');
    if (!button) return;
    button.disabled = loading;
    const label = button.querySelector('.rm-lazy-pagination__label');
    if (label) {
        if (!button.dataset.idleLabel) button.dataset.idleLabel = label.textContent;
        label.textContent = loading
            ? root.dataset.loadingLabel
            : (root.classList.contains('is-complete') ? root.dataset.completeLabel : button.dataset.idleLabel);
    }
};

const complete = (root) => {
    root.dataset.nextUrl = '';
    root.classList.add('is-complete');
    const button = root.querySelector('.rm-lazy-pagination__button');
    if (button) {
        button.disabled = true;
        const label = button.querySelector('.rm-lazy-pagination__label');
        if (label) label.textContent = root.dataset.completeLabel;
    }
};

const appendNextPage = async (root) => {
    const nextUrl = root.dataset.nextUrl;
    if (!nextUrl || root.dataset.loading === 'true') return false;

    const requestedUrl = new URL(nextUrl, window.location.href).toString();
    const seen = new Set((root.dataset.loadedUrls || '').split('|').filter(Boolean));
    if (seen.has(requestedUrl)) {
        complete(root);
        return false;
    }

    root.dataset.loading = 'true';
    root.classList.remove('has-error');
    const previousStatus = root.querySelector('.rm-lazy-pagination__status');
    if (previousStatus) {
        previousStatus.classList.add('uk-hidden');
        previousStatus.textContent = '';
    }
    seen.add(requestedUrl);
    root.dataset.loadedUrls = [...seen].join('|');
    setLoading(root, true);

    try {
        const response = await fetch(requestedUrl, {
            headers: {'X-Requested-With': 'XMLHttpRequest', Accept: 'text/html'},
            credentials: 'same-origin',
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const documentNext = new DOMParser().parseFromString(await response.text(), 'text/html');
        const selector = root.dataset.targetSelector || '[data-rm-product-scope]';
        const currentCells = productCells(document, selector);
        const nextCells = productCells(documentNext, selector);
        const container = currentCells[0]?.parentElement;
        if (!container || !nextCells.length) throw new Error('Product grid was not found in the next page');

        const fragment = document.createDocumentFragment();
        const appended = nextCells.map((cell) => document.importNode(cell, true));
        appended.forEach((cell) => fragment.append(cell));
        container.append(fragment);

        const nextPager = documentNext.querySelector(ROOT_SELECTOR);
        const pages = root.querySelector('.rm-lazy-pagination__pages');
        const nextPages = nextPager?.querySelector('.rm-lazy-pagination__pages');
        if (pages && nextPages) pages.replaceWith(document.importNode(nextPages, true));
        root.dataset.nextUrl = nextPager?.dataset.nextUrl
            ? new URL(nextPager.dataset.nextUrl, response.url || requestedUrl).toString()
            : '';
        root.dataset.pageCurrent = nextPager?.dataset.pageCurrent || root.dataset.pagesTotal;

        if (root.dataset.updateUrl === 'true') {
            window.history.replaceState(window.history.state, '', requestedUrl);
        }

        window.UIkit?.update?.(container);
        document.dispatchEvent(new CustomEvent('rm:catalog:append', {
            detail: {root, container, items: appended, url: requestedUrl},
        }));

        if (!root.dataset.nextUrl) complete(root);
        return true;
    } catch (error) {
        root.classList.add('has-error');
        const status = root.querySelector('.rm-lazy-pagination__status');
        if (status) {
            status.classList.remove('uk-hidden');
            status.textContent = error.message || 'Loading failed';
        }
        return false;
    } finally {
        root.dataset.loading = 'false';
        setLoading(root, false);
    }
};

const initLazyPagination = (root) => {
    if (root.dataset.rmLazyPaginationReady === 'true') return;
    root.dataset.rmLazyPaginationReady = 'true';

    const autoAfterClick = root.dataset.autoAfterClick === 'true';
    let automatic = false;
    let observer;

    if (autoAfterClick && 'IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => {
            if (automatic && entries.some((entry) => entry.isIntersecting)) appendNextPage(root);
        }, {rootMargin: `0px 0px ${Number(root.dataset.preloadDistance) || 0}px 0px`});
        observer.observe(root);
    }

    root.querySelector('.rm-lazy-pagination__button')?.addEventListener('click', async () => {
        const loaded = await appendNextPage(root);
        if (loaded && autoAfterClick) {
            automatic = true;
            root.classList.add('is-automatic');
            if (!root.dataset.nextUrl) observer?.disconnect();
        }
    });
};

const init = (scope = document) => {
    if (scope.matches?.(ROOT_SELECTOR)) initLazyPagination(scope);
    scope.querySelectorAll?.(ROOT_SELECTOR).forEach(initLazyPagination);
};

const start = () => {
    init();
    observeDynamicContent(init);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, {once: true});
} else {
    start();
}
