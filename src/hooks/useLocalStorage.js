import { useEffect, useState } from "react";

const UPDATE_STORAGE_EVENT = 'UPDATE_STORAGE_EVENT'

export function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const getDefaultValue = (key, defaultValue) => {
    const data = localStorage.getItem(key)
    if (data) {
        if (IsJsonString(data)) {
            return JSON.parse(data)
        } else {
            return data
        }
    } else {
        return defaultValue
    }
}

const createUpdateStorageCustomEvent = (value, keyEvent) => new CustomEvent(UPDATE_STORAGE_EVENT, {
    detail: { value, keyEvent }
});


export const useLocalStorage = ({ key, defaultValue }) => {
    const [pageValue, setPageValue] = useState(getDefaultValue(key, defaultValue))

    const handler = (e) => {
        if (key === e.detail.keyEvent) {
            setPageValue(e.detail.value)
        }
    }

    useEffect(() => {
        window.addEventListener(UPDATE_STORAGE_EVENT, handler)

        return () => {
            window.removeEventListener(UPDATE_STORAGE_EVENT, handler)
        }
    }, [key])

    useEffect(() => {
        if (typeof pageValue === 'object') {
            localStorage.setItem(key, JSON.stringify(pageValue) || '')
        } else {
            localStorage.setItem(key, typeof pageValue === 'boolean' ? pageValue : pageValue || '')
        }
        window.dispatchEvent(createUpdateStorageCustomEvent(pageValue, key))
    }, [pageValue, key])

    return {pageValue, setPageValue}
}


// example of usage //

//   const { pageValue: tabs, setPageValue: setListTabs } = useLocalStorage({
//     key: "LIST_TABS",
//     defaultValue: [],
//   });

// example of usage //