import React from 'react';
import { render } from 'react-dom';
import Notification from './Notification';
import './index.scss';

const cls = 'zw-message-container';

let noticeInstance;
function getNoticeInstance(configs?) {
    return new Promise((resolve, reject) => {
        let container = document.querySelector(`.${cls}`);
        if (!container) {
            container = document.createElement('div');
            container.classList.add(cls);
            document.body.appendChild(container);
        }
        function ref(instance) {
            if (instance) {
                resolve(instance);
            }
        }
        render(<Notification ref={ref} />, container);
    })
}

type messageType = 'success' | 'info' | 'warn' | 'error';

type noticeProps = {
    content: React.ReactNode;
    type: messageType;
    duration?: number;
}

function notice({ content, type, duration }: noticeProps) {
    if (!noticeInstance) {
        getNoticeInstance().then((instance) => {
            noticeInstance = instance;
            noticeInstance.add({ content, type, duration });
        });
        return;
    }
    noticeInstance.add({ content, type, duration });
}

function config(configs) {
    if (!noticeInstance) {
        getNoticeInstance().then((instance) => {
            noticeInstance = instance;
            noticeInstance.config(configs);
        });
        return;
    }
    noticeInstance.config(configs);
}

type messageFunc = (msg:React.ReactNode, duration?: number, cb?: () => void ) => void
type configFunc = (msg:React.ReactNode, duration?: number, cb?: () => void ) => void

interface Message {
    success: messageFunc;
    info: messageFunc;
    error: messageFunc;
    warn: messageFunc;
    config: configFunc;
}

const message: Message = {
    success(msg, duration, cb) {
        notice({ content: msg, type: 'success', duration })
    },
    info(msg, duration, cb) {
        notice({ content: msg, type: 'info', duration, })
    },
    error(msg, duration, cb) {
        notice({ content: msg, type: 'info', duration })
    },
    warn(msg, duration, cb) {
        notice({ content: msg, type: 'warn', duration })
    },
    config(configs) {
        config(configs)
    }
};

export default message;
