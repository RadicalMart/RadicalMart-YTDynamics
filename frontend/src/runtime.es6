const RUNTIME_KEY = '__YTDynamicsDomRuntime';

const runtime = window[RUNTIME_KEY] || {
    added: new Set(),
    removed: new Set(),
    observer: null,
};

window[RUNTIME_KEY] = runtime;

const visit = (callbacks, node) => callbacks.forEach((callback) => callback(node));

const start = () => {
    if (runtime.observer || !document.documentElement) return;

    runtime.observer = new MutationObserver((records) => {
        records.forEach(({addedNodes, removedNodes}) => {
            addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) visit(runtime.added, node);
            });
            removedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) visit(runtime.removed, node);
            });
        });
    });
    runtime.observer.observe(document.documentElement, {childList: true, subtree: true});
};

export const observeDynamicContent = (onAdded, onRemoved = null) => {
    if (typeof onAdded === 'function') runtime.added.add(onAdded);
    if (typeof onRemoved === 'function') runtime.removed.add(onRemoved);
    start();

    return () => {
        if (typeof onAdded === 'function') runtime.added.delete(onAdded);
        if (typeof onRemoved === 'function') runtime.removed.delete(onRemoved);
    };
};
