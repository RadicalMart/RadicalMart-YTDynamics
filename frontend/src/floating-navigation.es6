import './floating-navigation.scss';
import {observeDynamicContent} from './runtime.es6';

const bool = (value) => value === true || value === 'true' || value === '1';

const updateReservedSpace = () => {
    const heights = [...document.querySelectorAll('[data-rm-bottom-navigation][data-fixed="true"][data-reserve-space="true"]')]
        .filter((element) => element.getClientRects().length)
        .map((element) => element.getBoundingClientRect().height + Number(element.dataset.bottomOffset || 0));

    document.documentElement.style.setProperty('--rm-bottom-navigation-space', `${Math.max(0, ...heights)}px`);
    document.body.classList.toggle('rm-has-bottom-navigation', heights.length > 0);
};

const initBottomNavigation = (root) => {
    if (root.dataset.rmBottomNavigationReady) return;
    root.dataset.rmBottomNavigationReady = 'true';

    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(updateReservedSpace);
        observer.observe(root);
    }

    updateReservedSpace();
};

const initHelpMenu = (root) => {
    if (root.dataset.rmHelpMenuReady) return;
    root.dataset.rmHelpMenuReady = 'true';

    const trigger = root.querySelector('[data-rm-help-trigger]');
    const panel = root.querySelector('[data-rm-help-panel]');
    const backdrop = root.querySelector('[data-rm-help-backdrop]');
    if (!trigger || !panel) return;

    const setOpen = (open) => {
        root.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (backdrop) backdrop.hidden = !open;
    };

    trigger.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
    backdrop?.addEventListener('click', () => setOpen(false));
    root.addEventListener('click', (event) => {
        if (bool(root.dataset.closeOnLink) && event.target.closest('[data-rm-help-link]')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && root.classList.contains('is-open')) {
            setOpen(false);
            trigger.focus();
        }
    });

    setOpen(bool(root.dataset.open));
};

const init = (scope = document) => {
    scope.querySelectorAll?.('[data-rm-bottom-navigation]').forEach(initBottomNavigation);
    scope.querySelectorAll?.('[data-rm-help-menu]').forEach(initHelpMenu);
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
else init();

observeDynamicContent((node) => {
    init(node.matches?.('[data-rm-bottom-navigation], [data-rm-help-menu]') ? node.parentElement : node);
    updateReservedSpace();
});

window.addEventListener('resize', updateReservedSpace, {passive: true});
