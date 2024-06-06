// Extend the Window interface to include ScrollToBottom
interface Window {
    ScrollToBottomTs: (elementName: string) => void;
}

window.ScrollToBottomTs = (elementName: string): void => {
    const element: HTMLElement | null = document.getElementById(elementName);
    if (element) {
        console.log(element);
        element.scrollTop = element.scrollHeight - element.clientHeight;
    } else {
        console.error(`Element with ID ${elementName} not found.`);
    }
};
