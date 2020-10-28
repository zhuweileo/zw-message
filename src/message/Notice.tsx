import React, { useEffect } from 'react';

export default function Notice(props: any) {
    const {
        delay = 1.5,
        onClose = () => {},
        style,
        children,
    } = props;

    const cls = 'zw-message-item';
    useEffect(() => {
        // console.log(props);
        const timer = setTimeout(() => {
            onClose();
            console.log('jajajajj');
        }, delay * 1000);
        // return () => {
        //     console.log('clear,,');
        //     clearTimeout(timer);
        // };
    }, []);
    return <div className={cls} style={style}>{children}</div>;
}
