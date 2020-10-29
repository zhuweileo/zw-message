import React, {
    useState, useEffect, forwardRef, useImperativeHandle, useCallback, useReducer, useRef,
} from 'react';
import Notice from './Notice';


let seed = 0;
function getUuid() {
    return `zw-message-${seed++}`;
}

const initNotices = [];

function reducer(state, action) {
    switch (action.type) {
        case 'add': {
            const { maxCount } = action; 
            const origin = [...state, action.item];
            let res = [];
            if(maxCount && origin.length > maxCount) {
                res = origin.slice(origin.length - maxCount);
            } else {
                res = origin;
            }
            
            return res;
        }
        case 'remove': {
            const noticeUpdate = state.filter(item => item.key !== action.key);
            return noticeUpdate;
        }
        default:
            throw new Error();
    }
}

const defaultConfig = {
    maxCount: 0,
    top: 50,
    duration: 1.5,
}

function Notification(props, ref) {
    const [notices, dispatch] = useReducer(reducer, initNotices);
    const [conTop, setConTop] = useState(defaultConfig.top);

    const maxCountRef = useRef(defaultConfig.maxCount);
    const durationRef = useRef(defaultConfig.duration);

    function add({ content, type, duration }) {
        dispatch({
            type: 'add',
            maxCount: maxCountRef.current,
            item: {
                key: getUuid(),
                content,
                type,
                duration: duration || durationRef.current, 
            }
        });
    }

    function remove(key: any) {
        dispatch({ type: 'remove', key });
    }

    function config(configs) {
        const { maxCount, top } = configs;
        if (top) {
            setConTop(top);
        }
        if (maxCount) {
            maxCountRef.current = maxCount;
        }
    }

    useImperativeHandle(ref, () => {
        return {
            add,
            remove,
            config,
        };
    });

    function onClose(key) {
        return function () {
            remove(key);
        };
    }

    const cls = 'zw-message'

    return <div className={cls} style={{ top: `${conTop}px` }}>
        {
            notices.map((item, index) => {
                return <Notice key={item.key} onClose={onClose(item.key)} {...item}>{item.content}</Notice>;
            })
        }
    </div>;
}
export default forwardRef(Notification);
