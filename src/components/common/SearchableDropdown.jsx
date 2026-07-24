import { useEffect, useMemo, useRef, useState } from "react";
import {
    FaSearch,
    FaTimes,
    FaCheck,
    FaChevronDown
} from "react-icons/fa";

function SearchableDropdown({

    items = [],

    value = "",

    onChange,

    placeholder = "Search...",

    emptyText = "Select",

    noDataText = "No results found",

    icon = null,

    labelKey = "name",

    valueKey = "id",

    disabled = false

}) {

    const wrapperRef = useRef(null);

    const inputRef = useRef(null);

    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState("");



    useEffect(() => {

        function handleOutside(event) {

            if (

                wrapperRef.current &&

                !wrapperRef.current.contains(event.target)

            ) {

                setOpen(false);

                setSearch("");

            }

        }

        document.addEventListener(

            "mousedown",

            handleOutside

        );

        return () =>

            document.removeEventListener(

                "mousedown",

                handleOutside

            );

    }, []);



    useEffect(() => {

        if (open) {

            setTimeout(() => {

                inputRef.current?.focus();

            }, 100);

        }

    }, [open]);



    const selectedItem = useMemo(

        () =>

            items.find(

                item =>

                    String(item[valueKey]) ===

                    String(value)

            ),

        [items, value, valueKey]

    );



    const filteredItems = useMemo(

        () => {

            if (!search.trim())

                return items;

            return items.filter(

                item =>

                    String(

                        item[labelKey] || ""

                    )

                        .toLowerCase()

                        .includes(

                            search.toLowerCase()

                        )

            );

        },

        [

            items,

            search,

            labelKey

        ]

    );



    const handleSelect = id => {

        onChange(id);

        setOpen(false);

        setSearch("");

    };



    return (

        <div

            className="cf-search-dropdown"

            ref={wrapperRef}

        >

            <button

                type="button"

                disabled={disabled}

                className="cf-search-trigger"

                onClick={() =>

                    setOpen(

                        previous => !previous

                    )

                }

            >

                <span>

                    {

                        selectedItem

                            ?

                            selectedItem[labelKey]

                            :

                            emptyText

                    }

                </span>

                <FaChevronDown />

            </button>



            {

                open && (

                    <div className="cf-dropdown-menu">

                        <div className="cf-dropdown-search">

                            <FaSearch />



                            <input

                                ref={inputRef}

                                value={search}

                                placeholder={placeholder}

                                onChange={

                                    e =>

                                        setSearch(

                                            e.target.value

                                        )

                                }

                            />



                            {

                                search && (

                                    <button

                                        type="button"

                                        onClick={() =>

                                            setSearch("")

                                        }

                                    >

                                        <FaTimes />

                                    </button>

                                )

                            }

                        </div>



                        <div className="cf-dropdown-list">

                            <button

                                type="button"

                                className="cf-dropdown-item"

                                onClick={() =>

                                    handleSelect("")

                                }

                            >

                                {icon}

                                <span>

                                    {emptyText}

                                </span>

                                {

                                    !value &&

                                    <FaCheck />

                                }

                            </button>



                            {

                                filteredItems.map(

                                    item => (

                                        <button

                                            key={item[valueKey]}

                                            type="button"

                                            className="cf-dropdown-item"

                                            onClick={() =>

                                                handleSelect(

                                                    item[valueKey]

                                                )

                                            }

                                        >

                                            {icon}

                                            <span>

                                                {

                                                    item[labelKey]

                                                }

                                            </span>

                                            {

                                                String(value)

                                                ===

                                                String(

                                                    item[valueKey]

                                                )

                                                &&

                                                <FaCheck />

                                            }

                                        </button>

                                    )

                                )

                            }



                            {

                                filteredItems.length === 0 && (

                                    <div className="cf-dropdown-empty">

                                        {noDataText}

                                    </div>

                                )

                            }

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default SearchableDropdown;