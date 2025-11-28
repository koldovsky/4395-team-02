/* Animated accordion behavior for the FAQ
	 - Animates height for smooth open/close transitions
	 - Honors `data-bs-parent` to close siblings
	 - Updates `aria-expanded` and `.collapsed` state on buttons
     *written by AI
*/

function showCollapse(el, btn) {
	if (!el) return;
	el.classList.remove('collapse');
	el.classList.add('collapsing');
	// start from 0 to measured height
	el.style.height = '0px';
	// force reflow
	el.getBoundingClientRect();
	const finalHeight = el.scrollHeight + 'px';
	el.style.height = finalHeight;

	if (btn) {
		btn.classList.remove('faq-content__accordion-button--collapsed');
		btn.setAttribute('aria-expanded', 'true');
	}

	el.addEventListener('transitionend', function handler(e) {
		if (e.target !== el) return;
		el.classList.remove('collapsing');
		el.classList.add('collapse', 'show');
		el.style.height = '';
		el.removeEventListener('transitionend', handler);
	}, { once: true });
}

function hideCollapse(el, btn) {
	if (!el) return;
	// set fixed height to allow transition
	el.style.height = el.scrollHeight + 'px';
	// force reflow
	el.getBoundingClientRect();
	el.classList.remove('collapse', 'show');
	el.classList.add('collapsing');
	el.style.height = '0px';

	if (btn) {
		btn.classList.add('faq-content__accordion-button--collapsed');
		btn.setAttribute('aria-expanded', 'false');
	}

	el.addEventListener('transitionend', function handler(e) {
		if (e.target !== el) return;
		el.classList.remove('collapsing');
		el.classList.add('collapse');
		el.style.height = '';
		el.removeEventListener('transitionend', handler);
	}, { once: true });
}

document.addEventListener('click', function (e) {
	const btn = e.target.closest('[data-bs-toggle="collapse"]');
	if (!btn) return;
	e.preventDefault();

	const targetSelector = btn.getAttribute('data-bs-target') || ('#' + btn.getAttribute('aria-controls'));
	const target = document.querySelector(targetSelector);
	if (!target) return;

	const isOpen = target.classList.contains('show');

	// If this collapse belongs to a parent accordion, close siblings first
	const parentSelector = target.getAttribute('data-bs-parent');
	if (!isOpen && parentSelector) {
		const parent = document.querySelector(parentSelector);
		if (parent) {
			const openItems = parent.querySelectorAll('.faq-content__accordion-collapse.show');
			openItems.forEach(function (openEl) {
				const id = openEl.id;
				const relatedBtn = document.querySelector('[aria-controls="' + id + '"]');
				hideCollapse(openEl, relatedBtn);
			});
		}
	}

	if (isOpen) {
		hideCollapse(target, btn);
	} else {
		showCollapse(target, btn);
	}
});

// Accessibility: allow Enter / Space on focused buttons
document.addEventListener('keydown', function (e) {
	const active = document.activeElement;
	if (!active) return;
	if (!active.matches('[data-bs-toggle="collapse"]')) return;
	if (e.key === 'Enter' || e.key === ' ') {
		e.preventDefault();
		active.click();
	}
});

// Initialize button aria states on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (btn) {
		const targetSelector = btn.getAttribute('data-bs-target') || ('#' + btn.getAttribute('aria-controls'));
		const target = document.querySelector(targetSelector);
		if (!target) return;
		if (target.classList.contains('show')) {
			btn.classList.remove('faq-content__accordion-button--collapsed');
			btn.setAttribute('aria-expanded', 'true');
			// ensure visible height if present
			target.style.height = '';
		} else {
			btn.classList.add('faq-content__accordion-button--collapsed');
			btn.setAttribute('aria-expanded', 'false');
			target.classList.add('collapse');
		}
	});
});
