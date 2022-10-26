import {useEffect, useState} from 'react';
import useDebounce from './debounce';

const useSearchByString = (items = [], searchedField = '') => {
    const [searchValue, setSearchValue] = useState<any>('')
    const debouncedSearchValue = useDebounce(searchValue, 300)
    const [foundItems, setFoundItems] = useState<any>(items)

    useEffect(() => {
        const value = debouncedSearchValue.toLowerCase().trim()

        items.length && debouncedSearchValue
            ? setFoundItems(items.filter((section: any) => section[searchedField].toLowerCase().startsWith(value)))
            : setFoundItems(items)

    }, [debouncedSearchValue, items])

    return {searchValue, setSearchValue, foundItems}
}

export default useSearchByString