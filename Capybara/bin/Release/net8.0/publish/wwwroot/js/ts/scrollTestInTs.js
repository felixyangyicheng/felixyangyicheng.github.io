window.ScrollToBottomTs = (elementName) => {
    const element = document.getElementById(elementName);
    if (element) {
        console.log(element);
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
    else {
        console.error(`Element with ID ${elementName} not found.`);
    }
};
//# sourceMappingURL=scrollTestInTs.js.map