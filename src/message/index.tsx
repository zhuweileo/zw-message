import React from 'react';
import { render } from 'react-dom';
import Notification from './Notification';
import './index.css';

const cls = 'zw-message-container';

let noticeInstance;
function notifier() {
    let container = document.querySelector(`.${cls}`);
    if (!container) {
        container = document.createElement('div');
        container.classList.add(cls);
        document.body.appendChild(container);
    }
    function ref(instance) {
        if (instance) {
            noticeInstance = instance;
        }
    }
    render(<Notification ref={ref} />, container);
}
notifier();

const message = {
    success() {

    },
    info(msg: any) {
        noticeInstance.add({ message: msg });
    },
    error() {

    },
    warn() {

    },
};

export default message;
