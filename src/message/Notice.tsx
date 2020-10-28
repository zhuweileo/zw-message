import React, { useEffect } from 'react';

export default function Notice(props: any) {
    const {
        delay = 1.5,
        onClose = () => { },
        style,
        children,
        type = 'info',
    } = props;

    const cls = 'zw-message-item';
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, delay * 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const iconCls =  `${cls}-icon`;
    const iconTypeCls = `${cls}-icon-${type}`;
    const textCls = `${cls}-text`;

    return <div className={cls} style={style}>
        <span className={`${iconCls} ${iconTypeCls}`}></span><span className={textCls}>{children}</span>
    </div>;
}
