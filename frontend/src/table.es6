import './table.scss';

const readThemeTokens = (frame) => {
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none';
    frame.append(probe);
	const divider = document.createElement('table');
	divider.className = 'uk-table uk-table-divider';
	divider.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;visibility:hidden;pointer-events:none';
	divider.innerHTML = '<tbody><tr><td></td></tr><tr><td></td></tr></tbody>';
	frame.append(divider);

    const background = getComputedStyle(frame).backgroundColor;
	const themeBackground = getComputedStyle(document.documentElement)
		.getPropertyValue('--ytdynamics-background')
		.trim();
	const border = getComputedStyle(divider.rows[1].cells[0]).borderTopColor;
    const readBackground = (className) => {
        probe.className = className;
        return getComputedStyle(probe).backgroundColor;
    };
    const tokens = {
        '--rm-table-background': background === 'rgba(0, 0, 0, 0)'
			? (themeBackground || '#fff')
			: background,
        '--rm-table-muted-background': readBackground('uk-background-muted'),
        '--rm-table-primary-background': readBackground('uk-background-primary'),
        '--rm-table-secondary-background': readBackground('uk-background-secondary'),
		'--rm-table-border': border
    };
    probe.remove();
	divider.remove();

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
		delete wrapper.dataset.rmTableReady;
		delete wrapper.rmTableCleanup;
	};

    scheduleUpdate();
};

const destroyTables = (root) => {
	const wrappers = root.matches?.('[data-rm-table-scroll]') ? [root] : [];
	root.querySelectorAll?.('[data-rm-table-scroll]').forEach((wrapper) => wrappers.push(wrapper));
	wrappers.forEach((wrapper) => wrapper.rmTableCleanup?.());
};

const initTables = (root = document) => {
    if (root.matches?.('[data-rm-table-scroll]')) {
        initTable(root);
    }

    root.querySelectorAll?.('[data-rm-table-scroll]').forEach(initTable);
};

const observeTables = () => {
    initTables();

    new MutationObserver((records) => {
		records.forEach(({addedNodes, removedNodes}) => {
			addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    initTables(node);
                }
			});
			removedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) destroyTables(node);
			});
		});
    }).observe(document.documentElement, {childList: true, subtree: true});
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeTables, {once: true});
} else {
    observeTables();
}
