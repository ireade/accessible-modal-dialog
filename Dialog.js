function Dialog(dialogEl, overlayEl) {

	this.dialogEl = dialogEl;
	this.overlayEl = overlayEl;
	this.focusedElBeforeOpen;

	var Dialog = this;
	
	this.overlayEl.addEventListener('click', function() {
		Dialog.close();
	});

	this.dialogEl.addEventListener('keydown', function(e) {
		Dialog._handleKeyDown(e);
	});

	var focusableEls = this.dialogEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	this.focusableEls = Array.prototype.slice.call(focusableEls);

	this.firstFocusableEl = this.focusableEls[0];
	this.lastFocusableEl = this.focusableEls[ this.focusableEls.length - 1 ];

	this.close(); // Reset
}


Dialog.prototype.open = function() {

	this.dialogEl.removeAttribute('aria-hidden');
	this.overlayEl.removeAttribute('aria-hidden');

	this.focusedElBeforeOpen = document.activeElement;

	this.firstFocusableEl.focus();
};

Dialog.prototype.close = function() {

	this.dialogEl.setAttribute('aria-hidden', true);
	this.overlayEl.setAttribute('aria-hidden', true);

	if ( this.focusedElBeforeOpen ) {
		this.focusedElBeforeOpen.focus();
	}
};


Dialog.prototype._handleKeyDown = function(e) {

	var Dialog = this;
	var KEY_TAB = 9;
	var KEY_ESC = 27;

	function handleBackwardTab() {
		if ( document.activeElement === Dialog.firstFocusableEl ) {
			e.preventDefault();
			Dialog.lastFocusableEl.focus();
		}
	}
	function handleForwardTab() {
		if ( document.activeElement === Dialog.lastFocusableEl ) {
			e.preventDefault();
			Dialog.firstFocusableEl.focus();
		}
	}

	switch(e.keyCode) {
	case KEY_TAB:
		if ( Dialog.focusableEls.length === 1 ) {
			e.preventDefault();
			break;
		} 
		if ( e.shiftKey ) {
			handleBackwardTab();
		} else {
			handleForwardTab();
		}
		break;
	case KEY_ESC:
		Dialog.close();
		break;
	default:
		break;
	}


};


Dialog.prototype.addEventListeners = function(openDialogSel, closeDialogSel) {

	var Dialog = this;
	
	// delegate the opening and closing event clicks to the document
	// rather than adding to each element. this allows for dynamically
	// created elements to also open/close the dialog.
	document.addEventListener('click', function(e) {
		if (e.matches(openDialogSel)) {
			Dialog.open();
		} else if (e.matches(closeDialogSelg)) {
			Dialog.close();
		}
	});

};



