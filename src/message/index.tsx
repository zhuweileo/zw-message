import React from 'react';
import { render } from 'react-dom';
import Notification from './Notification';
import './index.scss';

export type messageType = 'success' | 'info' | 'warn' | 'error';
type noticeProps = {
    content: React.ReactNode;
    type: messageType;
    duration?: number;
    removeCallback?: () => void;
}
export type Configs = {
    maxCount?: number;
    top?: number,
    duration?: number;
}
export type messageFunc = (msg:React.ReactNode, duration?: number, cb?: () => void ) => void
export type configFunc = (configs: Configs) => void
export type Message = { [key in messageType]: messageFunc;} & { config: configFunc;}

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


function notice({ content, type, duration, removeCallback }: noticeProps) {
    if (!noticeInstance) {
        getNoticeInstance().then((instance) => {
            noticeInstance = instance;
            noticeInstance.add({ content, type, duration, removeCallback });
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

const message: Message = {
    success(msg, duration, cb) {
        notice({ content: msg, type: 'success', duration, removeCallback: cb })
    },
    info(msg, duration, cb) {
        notice({ content: msg, type: 'info', duration, removeCallback: cb})
    },
    error(msg, duration, cb) {
        notice({ content: msg, type: 'info', duration, removeCallback: cb })
    },
    warn(msg, duration, cb) {
        notice({ content: msg, type: 'warn', duration, removeCallback: cb })
    },
    config(configs) {
        config(configs)
    },
};

export default message;
