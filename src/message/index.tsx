import React from 'react';
import { render } from 'react-dom';
import Notification from './Notification';
import './index.scss';

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
    success(msg) {
        noticeInstance.add({ message: msg, type: 'success' });
    },
    info(msg) {
        noticeInstance.add({ message: msg, type: 'info' });
    },
    error(msg) {
        noticeInstance.add({ message: msg, type: 'error' });
    },
    warn(msg) {
        noticeInstance.add({ message: msg, type: 'warn' });
    },
};

export default message;
