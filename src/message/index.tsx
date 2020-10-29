import React from 'react';
import { render } from 'react-dom';
import Notification from './Notification';
import './index.scss';

const cls = 'zw-message-container';

let noticeInstance;
function getNoticeInstance() {
    return new Promise((resolve, reject) => {
        let container = document.querySelector(`.${cls}`);
        if (!container) {
            container = document.createElement('div');
            container.classList.add(cls);
            document.body.appendChild(container);
        }
        function ref(instance) {
            if (instance) {
                // noticeInstance = instance;
                resolve(instance);
            }
        }
        render(<Notification ref={ref} />, container);
    })
}


function notice(msg, type) {
    if (!noticeInstance) {
        getNoticeInstance().then((instance) => {
            noticeInstance = instance;
            noticeInstance.add({ message: msg, type });
        });
        return;
    }
    noticeInstance.add({ message: msg, type });
}

const message = {
    success(msg) {
        notice(msg, 'success')
    },
    info(msg) {
        notice(msg, 'info')
    },
    error(msg) {
        notice(msg, 'error')
    },
    warn(msg) {
        notice(msg, 'warn')
    },
};

export default message;
