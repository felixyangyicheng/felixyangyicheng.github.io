window.ScrollToBottom = (elementName) => {
    element = document.getElementById(elementName);
    console.log(element);
    element.scrollTop = element.scrollHeight - element.clientHeight;
}