const COOKIE_TTL = 7 * 24 * 60 * 60 * 1000;

const setCookie = (name, value, path) => {
    if (!name) {
        return;
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${new Date(Date.now() + COOKIE_TTL).toUTCString()}; path=${path || '/'}; SameSite=Lax`;
};

const initToolbar = (toolbar) => {
    if (toolbar.dataset.rmToolbarReady === 'true') {
        return;
    }

    toolbar.dataset.rmToolbarReady = 'true';
    toolbar.addEventListener('click', (event) => {
        const button = event.target.closest('[data-rm-layout]');
		if (!button || !toolbar.contains(button)) {
			return;
		}

		toolbar.querySelectorAll('[data-rm-layout]').forEach((layoutButton) => {
			layoutButton.setAttribute('aria-pressed', layoutButton === button ? 'true' : 'false');
			layoutButton.closest('li')?.classList.toggle('uk-active', layoutButton === button);
		});
		setCookie(toolbar.dataset.layoutCookie, button.dataset.rmLayout, toolbar.dataset.cookiePath);
        window.location.reload();
    });

    toolbar.querySelector('.rm-toolbar__select')?.addEventListener('change', (event) => {
        setCookie(toolbar.dataset.orderingCookie, event.target.value, toolbar.dataset.cookiePath);
        const url = new URL(window.location.href);
        url.searchParams.delete('start');
        window.location.assign(url.toString());
    });
};

const initToolbars = (root = document) => {
    if (root.matches?.('[data-rm-toolbar]')) {
        initToolbar(root);
    }

    root.querySelectorAll?.('[data-rm-toolbar]').forEach(initToolbar);
};

const start = () => {
    initToolbars();
    new MutationObserver((records) => records.forEach(({addedNodes}) => addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            initToolbars(node);
        }
    }))).observe(document.documentElement, {childList: true, subtree: true});
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, {once: true});
} else {
    start();
}
