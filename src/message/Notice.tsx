import React, { useEffect, useState } from 'react';

export default function Notice(props: any) {
    const {
        duration,
        onClose = () => { },
        style,
        children,
        type = 'info',
        removeCallback = () => { },
    } = props;

    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsEnd(true);
            setTimeout(function () {
                onClose();
                removeCallback();
            }, 500)
        }, duration * 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const prefix = 'zw-message-item'
    const cls = isEnd ? `${prefix} ${prefix}-leave` : prefix;
    const wrapCls = `${prefix}-wrap`
    const iconCls = `${prefix}-icon`;
    const iconTypeCls = `${prefix}-icon-${type}`;
    const textCls = `${prefix}-text`;

    return (
        <div className={wrapCls}>
            <div className={cls} style={style}>
                <span className={`${iconCls} ${iconTypeCls}`}></span><span className={textCls}>{children}</span>
            </div>
        </div>
    )
}
