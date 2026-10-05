import './catalog-navigation.scss';
import {observeDynamicContent} from './runtime.es6';

const filterItems = (filter) => filter.querySelectorAll('.accordion-item, .uk-accordion-default > li');
const itemButton = (item) => item.querySelector('.accordion-button, .uk-accordion-title');
const itemContent = (item) => item.querySelector('.accordion-collapse, .uk-accordion-content');
const itemInputs = (item) => Array.from(itemContent(item)?.querySelectorAll(
    'input:not([type="hidden"]):not([type="submit"]):not([data-rm-price-range-control]), select, textarea'
) || []);
const desktopDrops = new WeakMap();
const mobileAccordions = new WeakMap();

const destroyComponent = (component) => {
    try {
        component?.$destroy?.(false);
    } catch (error) {
        // The source filter may have been replaced by RadicalMart already.
    }
};

const destroyDesktopDrops = (filter) => {
    filterItems(filter).forEach((item) => {
        destroyComponent(desktopDrops.get(item));
        desktopDrops.delete(item);
        item.classList.remove('is-open');
    });
};

const alignDesktopDrop = (item, content) => {
    const itemRect = item.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const viewportInset = 20;
    const overflowRight = itemRect.left + contentRect.width - (window.innerWidth - viewportInset);
    const minimumShift = viewportInset - itemRect.left;
    const shift = Math.max(minimumShift, Math.min(0, -overflowRight));
    content.style.setProperty('--rm-filter-drop-shift', `${Math.round(shift)}px`);
};

const setupDesktopDrops = (filter) => {
    if (!window.UIkit?.drop) return;

    filterItems(filter).forEach((item) => {
        const button = itemButton(item);
        const content = itemContent(item);
        if (!button || !content || desktopDrops.has(item)) return;

        const drop = window.UIkit.drop(content, {
            toggle: button,
            mode: 'click',
            pos: 'bottom-left',
            offset: 8,
            flip: true,
            shift: true,
            container: false,
        });
        content.addEventListener('show', () => {
            item.classList.add('is-open');
            window.requestAnimationFrame(() => alignDesktopDrop(item, content));
        });
        content.addEventListener('shown', () => alignDesktopDrop(item, content));
        content.addEventListener('hide', () => item.classList.remove('is-open'));
        desktopDrops.set(item, drop);
    });
};

const setupMobileAccordion = (filter) => {
    if (!window.UIkit?.accordion) return;
    filter.querySelectorAll('.uk-accordion-default').forEach((accordion) => {
        if (mobileAccordions.has(accordion)) return;
        accordion.setAttribute('uk-accordion', 'multiple: true; collapsible: true');
        mobileAccordions.set(accordion, window.UIkit.accordion(accordion, {multiple: true, collapsible: true}));
    });
};

const destroyMobileAccordions = (filter) => {
    filter.querySelectorAll('.uk-accordion-default').forEach((accordion) => {
        destroyComponent(mobileAccordions.get(accordion));
        mobileAccordions.delete(accordion);
        accordion.removeAttribute('uk-accordion');
    });
};

const parseNumber = (value) => {
    const normalized = String(value || '').replace(/[^0-9,.-]/g, '').replace(',', '.');
    const number = Number.parseFloat(normalized);
    return Number.isFinite(number) ? number : null;
};

const enhancePriceRange = (filter) => {
    filter.querySelectorAll('.radicalmart-input-filter-price').forEach((price) => {
        if (price.dataset.rmPriceRangeReady === 'true') return;

        const fields = Array.from(price.querySelectorAll('input[type="text"], input:not([type])')).slice(0, 2);
        if (fields.length !== 2) return;

        const hintedMin = parseNumber(fields[0].placeholder);
        const hintedMax = parseNumber(fields[1].placeholder);
        const currentMin = parseNumber(fields[0].value);
        const currentMax = parseNumber(fields[1].value);
        const minimum = hintedMin ?? currentMin ?? 0;
        const maximum = Math.max(minimum + 1, hintedMax ?? currentMax ?? minimum + 1000);
        const step = maximum - minimum > 100000 ? 100 : maximum - minimum > 10000 ? 10 : 1;

        const range = document.createElement('div');
        range.className = 'rm-filter__price-range';
        range.innerHTML = `
            <div class="rm-filter__price-track" aria-hidden="true"><span></span></div>
            <input type="range" min="${minimum}" max="${maximum}" step="${step}" data-rm-price-range-control="from" aria-label="${fields[0].closest('.input-group')?.querySelector('label')?.textContent.trim() || 'От'}">
            <input type="range" min="${minimum}" max="${maximum}" step="${step}" data-rm-price-range-control="to" aria-label="${fields[1].closest('.input-group')?.querySelector('label')?.textContent.trim() || 'До'}">
        `;
        const clearControl = price.querySelector('.text-end, .uk-text-right');
        if (clearControl) clearControl.before(range);
        else price.append(range);

        const fromRange = range.querySelector('[data-rm-price-range-control="from"]');
        const toRange = range.querySelector('[data-rm-price-range-control="to"]');
        const fill = range.querySelector('.rm-filter__price-track span');

        const draw = () => {
            const from = Number(fromRange.value);
            const to = Number(toRange.value);
            const span = maximum - minimum;
            fill.style.left = `${((from - minimum) / span) * 100}%`;
            fill.style.right = `${100 - ((to - minimum) / span) * 100}%`;
        };
        const syncRangesFromFields = () => {
            const from = parseNumber(fields[0].value) ?? minimum;
            const to = parseNumber(fields[1].value) ?? maximum;
            fromRange.value = String(Math.min(Math.max(from, minimum), Number(toRange.value || maximum)));
            toRange.value = String(Math.max(Math.min(to, maximum), Number(fromRange.value || minimum)));
            draw();
        };
        const syncFieldsFromRanges = (changed) => {
            if (changed === fromRange && Number(fromRange.value) > Number(toRange.value) - step) {
                fromRange.value = String(Math.max(minimum, Number(toRange.value) - step));
            }
            if (changed === toRange && Number(toRange.value) < Number(fromRange.value) + step) {
                toRange.value = String(Math.min(maximum, Number(fromRange.value) + step));
            }
            fields[0].value = fromRange.value;
            fields[1].value = toRange.value;
            draw();
        };

        fields.forEach((field) => field.addEventListener('input', syncRangesFromFields));
        [fromRange, toRange].forEach((control) => control.addEventListener('input', () => syncFieldsFromRanges(control)));
        fromRange.value = String(currentMin ?? minimum);
        toRange.value = String(currentMax ?? maximum);
        draw();
        price.dataset.rmPriceRangeReady = 'true';
    });
};

const inputIsActive = (input) => {
    if ((input.type === 'checkbox' || input.type === 'radio')) return input.checked;
    if (!input.name) return false;

    const params = new URLSearchParams(window.location.search);
    if (params.has(input.name)) return params.getAll(input.name).some((value) => value !== '');
    if (input instanceof HTMLSelectElement) {
        return Array.from(input.selectedOptions).some((option) => option.value !== '');
    }
    return input.value !== '' && input.value !== input.defaultValue;
};

const updateFilterCounts = (filter) => {
    filterItems(filter).forEach((item) => {
        const button = itemButton(item);
        if (!button) return;

        const count = itemInputs(item).filter(inputIsActive).length;
        item.classList.toggle('is-filtered', count > 0);
        let badge = button.querySelector('.rm-filter__count');
        if (filter.dataset.showActiveCount !== 'true') {
            badge?.remove();
            return;
        }
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'rm-filter__count';
            button.append(badge);
        }
        badge.textContent = count ? String(count) : '';
        badge.hidden = count === 0;
    });
};

const omitEmptyFormControls = (form) => {
    const controls = Array.from(form.querySelectorAll('input[name], select[name], textarea[name]')).filter((control) => {
        if (control.disabled || control.type === 'submit' || control.type === 'button') return false;
        if (control.type === 'checkbox' || control.type === 'radio') return !control.checked;
        return String(control.value || '').trim() === '';
    });
    controls.forEach((control) => { control.disabled = true; });
    window.setTimeout(() => controls.forEach((control) => { control.disabled = false; }), 0);
};

const closeFilterItems = (filter, except = null) => {
    filter.querySelectorAll('.accordion-item.is-open, .uk-accordion-default > li.is-open').forEach((item) => {
        if (item === except) return;
        const drop = desktopDrops.get(item);
        if (drop) {
            drop.hide?.(false);
            return;
        }
        item.classList.remove('is-open');
        itemButton(item)?.setAttribute('aria-expanded', 'false');
        itemContent(item)?.setAttribute('aria-hidden', 'true');
    });
};

const setFilterMode = (filter, desktop) => {
    filter.classList.toggle('rm-filter--desktop', desktop);
    filter.classList.toggle('rm-filter--mobile', !desktop);
    closeFilterItems(filter);

    if (desktop) {
        destroyMobileAccordions(filter);
        setupDesktopDrops(filter);
    } else {
        destroyDesktopDrops(filter);
    }

    filter.querySelectorAll('.accordion-collapse, .uk-accordion-content').forEach((collapse) => {
        collapse.style.removeProperty('height');
        collapse.style.removeProperty('display');
        collapse.classList.remove('collapsing');
        const expanded = collapse.classList.contains('show') || collapse.closest('li')?.classList.contains('uk-open');
        collapse.setAttribute('aria-hidden', desktop ? 'true' : (expanded ? 'false' : 'true'));
    });

    if (!desktop && filter.dataset.rmMobilePrepared !== 'true') {
        filter.dataset.rmMobilePrepared = 'true';
        const initial = filter.dataset.mobileInitialOpen || 'first';
        if (initial !== 'module') {
            const items = Array.from(filterItems(filter));
            const activeItems = items.filter((item) => itemInputs(item).some(inputIsActive));
            const openItems = initial === 'active' && activeItems.length ? activeItems
                : initial === 'first' && items.length ? [items[0]] : [];

            items.forEach((item) => {
                const open = openItems.includes(item);
                item.classList.toggle('uk-open', open);
                item.classList.toggle('show', open);
                itemButton(item)?.setAttribute('aria-expanded', open ? 'true' : 'false');
                const content = itemContent(item);
                if (content) {
                    content.hidden = !open;
                    content.setAttribute('aria-hidden', open ? 'false' : 'true');
                }
            });
        }
    }

    if (!desktop) setupMobileAccordion(filter);
};

const initFilter = (filter) => {
    if (filter.dataset.rmFilterReady === 'true') return;
    filter.dataset.rmFilterReady = 'true';
    enhancePriceRange(filter);
    filter.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', () => omitEmptyFormControls(form));
    });

    const presentation = filter.dataset.presentation || 'responsive';
    const breakpoint = Math.max(640, Number(filter.dataset.breakpoint) || 960);
    const media = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const desktopMode = () => presentation === 'dropdown' || (presentation === 'responsive' && media.matches);
    const applyMode = () => setFilterMode(filter, desktopMode());
    applyMode();
    media.addEventListener?.('change', applyMode);

    filter.addEventListener('click', (event) => {
        const button = event.target.closest('.accordion-button, .uk-accordion-title');
        if (!button || !filter.contains(button) || !desktopMode()) return;

        const item = button.closest('.accordion-item, .uk-accordion-default > li');
        if (desktopDrops.has(item)) return;
        event.preventDefault();
        event.stopPropagation();
        const willOpen = !item.classList.contains('is-open');
        closeFilterItems(filter, willOpen ? item : null);
        item.classList.toggle('is-open', willOpen);
        button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        itemContent(item)?.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
    }, true);

    let submitTimer = null;
    filter.addEventListener('change', (event) => {
        if (!event.target.closest('form')) return;
        updateFilterCounts(filter);
        if (desktopMode() && filter.dataset.closeOnChange === 'true') closeFilterItems(filter);
        if (filter.dataset.autoSubmit !== 'true') return;

        window.clearTimeout(submitTimer);
        submitTimer = window.setTimeout(() => event.target.closest('form')?.requestSubmit(),
            Math.max(0, Number(filter.dataset.autoSubmitDelay) || 0));
    });

    updateFilterCounts(filter);
};

const showCatalogPanel = (menu, panelId) => {
    const target = menu.querySelector(`[data-rm-catalog-panel="${CSS.escape(String(panelId))}"]`);
    if (!target) return;

    menu.querySelectorAll('[data-rm-catalog-panel]').forEach((panel) => {
        const active = panel === target;
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    target.querySelector('.rm-catalog-menu__back, .rm-catalog-menu__link, .rm-catalog-menu__forward')?.focus({preventScroll: true});
    menu.dispatchEvent(new CustomEvent('rm:catalog-panel-change', {detail: {panelId}}));
};

const initCatalogMenu = (menu) => {
    if (menu.dataset.rmCatalogMenuReady === 'true') return;
    menu.dataset.rmCatalogMenuReady = 'true';

    menu.addEventListener('click', (event) => {
        const forward = event.target.closest('[data-rm-catalog-forward]');
        const back = event.target.closest('[data-rm-catalog-back]');
        if (!forward && !back) return;
        event.preventDefault();
        showCatalogPanel(menu, (forward || back).dataset[forward ? 'rmCatalogForward' : 'rmCatalogBack']);
    });
    showCatalogPanel(menu, menu.dataset.initialPanel || 1);
};

const initAll = (root = document) => {
    if (root.matches?.('[data-rm-filter]')) initFilter(root);
    root.querySelectorAll?.('[data-rm-filter]').forEach(initFilter);
    if (root.matches?.('[data-rm-catalog-menu]')) initCatalogMenu(root);
    root.querySelectorAll?.('[data-rm-catalog-menu]').forEach(initCatalogMenu);
};

const start = () => {
    initAll();

    document.addEventListener('click', (event) => {
        document.querySelectorAll('[data-rm-filter].rm-filter--desktop').forEach((filter) => {
            if (!filter.contains(event.target)) closeFilterItems(filter);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        document.querySelectorAll('[data-rm-filter].rm-filter--desktop').forEach((filter) => closeFilterItems(filter));
    });
    document.addEventListener('onRadicalMartFilterAfterAjax', () => {
        document.querySelectorAll('[data-rm-filter]').forEach((filter) => {
            filter.dataset.rmFilterReady = 'false';
            initFilter(filter);
        });
    });

    observeDynamicContent(initAll);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, {once: true});
} else {
    start();
}
