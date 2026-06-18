window.ScrollToBottom = (elementName) => {
    element = document.getElementById(elementName);
    element.scrollTop = element.scrollHeight - element.clientHeight;
}

window.capybaraFocus = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) el.focus();
}