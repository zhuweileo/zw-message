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
    TESTUTIL?;
}
export type Configs = {
    maxCount?: number;
    top?: number,
    duration?: number;
}
type TEST = {
    TEST_RENDER: (node: React.ReactElement) => void
}

export type messageFunc = {
    (msg: React.ReactNode, duration?: number, cb?: () => void, TESTUTIL?: TEST): void;
    (msg: React.ReactNode, duration?: number, TESTUTIL?: TEST): void;
    (msg: React.ReactNode, cb?: () => void, TESTUTIL?: TEST): void;
    (msg: React.ReactNode, TESTUTIL?: TEST): void;
}

export type configFunc = (configs: Configs) => void
export type Message = { [key in messageType]: messageFunc; } & { config: configFunc; }

const cls = 'zw-message-container';
let noticeInstance;
function getNoticeInstance(TESTUTIL) {
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
        if (process.env.NODE_ENV === 'test') {
            if (TESTUTIL) {
                const { TEST_RENDER } = TESTUTIL;
                TEST_RENDER(<Notification ref={ref} />)
            }
            return;
        }
        render(<Notification ref={ref} />, container);
    })
}


function notice({ content, type, duration, removeCallback, TESTUTIL }: noticeProps) {
    if (!noticeInstance) {
        getNoticeInstance(TESTUTIL).then((instance) => {
            noticeInstance = instance;
            noticeInstance.add({ content, type, duration, removeCallback });
        });
        return;
    }
    noticeInstance.add({ content, type, duration, removeCallback });
}

function config(configs, TESTUTIL?) {
    if (!noticeInstance) {
        getNoticeInstance(TESTUTIL).then((instance) => {
            noticeInstance = instance;
            noticeInstance.config(configs);
        });
        return;
    }
    noticeInstance.config(configs);
}

function transformArgs(args) {
    const arr = [].slice.call(args, 1);
    if (arr.length === 1) {
        return {
            duration: typeof arr[0] === 'number' ? arr[0] : undefined,
            cb: typeof arr[0] === 'function' ? arr[0] : undefined,
            TESTUTIL: typeof arr[0] === 'object' ? arr[0] : undefined,
        }
    }
    if (arr.length > 1) {
        return {
            duration: typeof arr[0] === 'number' ? arr[0] : undefined,
            cb: typeof arr[1] === 'function' ? arr[1] : undefined,
            TESTUTIL: typeof arr[2] === 'object' ? arr[2] : undefined,
        }
    }
    return {
        duration: undefined,
        cb: undefined
    }
}

const message: Message = {
    success(msg) {
        const { duration, cb, TESTUTIL } = transformArgs(arguments);
        notice({ content: msg, type: 'success', duration, removeCallback: cb, TESTUTIL })
    },
    info(msg) {
        const { duration, cb } = transformArgs(arguments);
        notice({ content: msg, type: 'info', duration, removeCallback: cb })
    },
    error(msg) {
        const { duration, cb } = transformArgs(arguments);
        notice({ content: msg, type: 'error', duration, removeCallback: cb })
    },
    warn(msg) {
        const { duration, cb } = transformArgs(arguments);
        notice({ content: msg, type: 'warn', duration, removeCallback: cb })
    },
    config(configs, TESTUTIL?) {
        config(configs, TESTUTIL)
    },
};

export default message;
