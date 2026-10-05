import './table.scss';
import {observeDynamicContent} from './runtime.es6';

const readThemeTokens = (frame) => {
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none';
    frame.append(probe);

    const background = getComputedStyle(frame).backgroundColor;
	const themeBackground = getComputedStyle(document.documentElement)
		.getPropertyValue('--ytdynamics-background')
		.trim();
	const theme = getComputedStyle(document.documentElement);
	const surfaceColor = theme.getPropertyValue('--ytdynamics-surface-color').trim() || theme.color;
	const mutedSurfaceColor = theme.getPropertyValue('--ytdynamics-surface-muted-color').trim() || surfaceColor;
	const surfaceBorder = theme.getPropertyValue('--ytdynamics-surface-border').trim();
	const borderWidth = theme.getPropertyValue('--ytdynamics-border-width').trim();
    const readBackground = (className) => {
        probe.className = className;
        return getComputedStyle(probe).backgroundColor;
    };
    const tokens = {
        '--rm-table-background': background === 'rgba(0, 0, 0, 0)'
			? (themeBackground || '#fff')
			: background,
        '--rm-table-muted-background': readBackground('uk-background-muted'),
        '--rm-table-color': surfaceColor,
        '--rm-table-muted-color': mutedSurfaceColor,
        '--rm-table-primary-background': readBackground('uk-background-primary'),
        '--rm-table-secondary-background': readBackground('uk-background-secondary'),
		'--rm-table-border': surfaceBorder,
		'--rm-table-border-width': borderWidth
    };
    probe.remove();

    Object.entries(tokens).forEach(([name, value]) => {
        if (value && value !== 'rgba(0, 0, 0, 0)') frame.style.setProperty(name, value);
    });
};

const initTable = (wrapper) => {
    if (!(wrapper instanceof HTMLElement) || wrapper.dataset.rmTableReady === 'true') {
        return;
    }

    const frame = wrapper.closest('.rm-table-frame');
    if (!frame) {
        return;
    }

    const table = wrapper.querySelector('.rm-table');
    wrapper.dataset.rmTableReady = 'true';
    let frameRequest = 0;
	let resizeObserver = null;
	readThemeTokens(frame);

	const updateInverseSurfaces = (forceCardsActive = null) => {
		if (!table) return;

		const cardsActive = forceCardsActive ?? (table.classList.contains('rm-table--cards')
			&& getComputedStyle(table).display === 'block');
		const defaultCardInverse = table.classList.contains('rm-table--card-primary')
			|| table.classList.contains('rm-table--card-secondary');

		table.querySelectorAll('tbody > .rm-table__row').forEach((row) => {
			const staticInverse = row.dataset.rmTableStaticInverse === 'true';
			const mobileStyle = row.dataset.rmTableMobileStyle || 'inherit';
			const mobileInverse = ['primary', 'secondary'].includes(mobileStyle);
			const mobileNormal = ['default', 'muted'].includes(mobileStyle);
			const inverse = cardsActive
				? (mobileNormal ? false : (mobileInverse || defaultCardInverse))
				: staticInverse;

			row.classList.toggle('uk-light', inverse);
		});
	};

    const update = () => {
        frameRequest = 0;
        const maximumScroll = Math.max(0, wrapper.scrollWidth - wrapper.clientWidth);
        const canScrollX = maximumScroll > 1;
        const canScrollY = wrapper.scrollHeight - wrapper.clientHeight > 1;
        const isRtl = getComputedStyle(wrapper).direction === 'rtl';
        const rawScroll = Math.abs(wrapper.scrollLeft);
        const scrollFromLeft = isRtl ? maximumScroll - rawScroll : rawScroll;
        const firstCell = table?.querySelector('tbody tr > :first-child, thead tr > :first-child');
        const lastCell = table?.querySelector('tbody tr > :last-child, thead tr > :last-child');
        const firstWidth = firstCell?.getBoundingClientRect().width || 0;
        const lastWidth = lastCell?.getBoundingClientRect().width || 0;
        const stickyFirst = wrapper.classList.contains('rm-table-wrapper--sticky-first');
        const stickyLast = wrapper.classList.contains('rm-table-wrapper--sticky-last');
        const stickyConflict = wrapper.classList.contains('rm-table-wrapper--sticky-safe') && canScrollX && (
            (stickyFirst && firstWidth > wrapper.clientWidth * 0.72)
            || (stickyLast && lastWidth > wrapper.clientWidth * 0.72)
            || (stickyFirst && stickyLast && firstWidth + lastWidth > wrapper.clientWidth * 0.9)
        );

        frame.classList.toggle('rm-table-frame--can-scroll-x', canScrollX);
        frame.classList.toggle('rm-table-frame--can-scroll-y', canScrollY);
        frame.classList.toggle('rm-table-frame--at-start', !canScrollX || scrollFromLeft <= 1);
        frame.classList.toggle('rm-table-frame--at-end', !canScrollX || scrollFromLeft >= maximumScroll - 1);
        wrapper.classList.toggle('rm-table-wrapper--sticky-conflict', stickyConflict);
		if (canScrollX || canScrollY) wrapper.setAttribute('tabindex', '0');
		else wrapper.removeAttribute('tabindex');
		updateInverseSurfaces();
    };

    const scheduleUpdate = () => {
        if (!frameRequest) {
            frameRequest = requestAnimationFrame(update);
        }
    };

    wrapper.addEventListener('scroll', scheduleUpdate, {passive: true});

    if ('ResizeObserver' in window) {
		resizeObserver = new ResizeObserver(scheduleUpdate);
		resizeObserver.observe(wrapper);
        if (table) {
			resizeObserver.observe(table);
        }
    } else {
        window.addEventListener('resize', scheduleUpdate, {passive: true});
    }

	wrapper.rmTableCleanup = () => {
		if (frameRequest) cancelAnimationFrame(frameRequest);
		wrapper.removeEventListener('scroll', scheduleUpdate);
		resizeObserver?.disconnect();
		if (!resizeObserver) window.removeEventListener('resize', scheduleUpdate);
		updateInverseSurfaces(false);
		delete wrapper.dataset.rmTableReady;
		delete wrapper.rmTableCleanup;
	};

    scheduleUpdate();
};

const destroyTables = (root) => {
	const wrappers = root.matches?.('[data-rm-table]') ? [root] : [];
	root.querySelectorAll?.('[data-rm-table]').forEach((wrapper) => wrappers.push(wrapper));
	wrappers.forEach((wrapper) => wrapper.rmTableCleanup?.());
};

const initTables = (root = document) => {
    if (root.matches?.('[data-rm-table]')) {
        initTable(root);
    }

    root.querySelectorAll?.('[data-rm-table]').forEach(initTable);
};

const observeTables = () => {
    initTables();

	observeDynamicContent(initTables, destroyTables);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeTables, {once: true});
} else {
    observeTables();
}
