import React, {
    useState, useEffect, forwardRef, useImperativeHandle, useCallback, useReducer,
} from 'react';
import Notice from './Notice';


let seed = 0;
function getUuid() {
    return `zw-message-${seed++}`;
}

const init = { notices: [] };

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return { notices: [...state.notices, action.item] };
        case 'remove': {
            const noticeUpdate = state.notices.filter(item => item.key !== action.key);
            return { notices: noticeUpdate };
        }
        default:
            throw new Error();
    }
}

function Notification(props: any, ref: any) {
    const [state, dispatch] = useReducer(reducer, init);

    function add({ message, type }: any) {
        dispatch({ type: 'add', item: { key: getUuid(), message, type } });
    }

    function remove(key: any) {
        dispatch({ type: 'remove', key });
    }


    useImperativeHandle(ref, () => {
        return {
            add,
            remove,
        };
    });

    function onClose(key: any) {
        return function() {
            remove(key);
        };
    }


    return <div>
        {
            state.notices.map((item: any, index: any) => {
                const height = 40;
                const style = {
                    height: `${height}px`,
                    lineHeight: `${height}px`,
                    top: `${index * (height + 10) + 50}px`,
                };
                return <Notice key={item.key} style={style} onClose={onClose(item.key)} {...item}>{item.message}</Notice>;
            })
        }
    </div>;
}
export default forwardRef(Notification);
