import {
    FaMagnifyingGlass,
    FaXmark
}
from "react-icons/fa6";

import "../css/components/SearchBar.css";


function SearchBar({
    keyword,
    setKeyword,
    onSearch
}) {


    const handleSearch = () => {

        const trimmedKeyword =
            keyword.trim();

        onSearch(
            trimmedKeyword
        );

    };


    const handleKeyDown = (e) => {

        if (
            e.key === "Enter"
        ) {

            handleSearch();

        }

    };


    const handleClear = () => {

        setKeyword("");

        onSearch("");

    };


    return (

        <div className="ssb-wrapper">


            <div className="ssb-search-box">


                {/* SEARCH ICON */}

                <div className="ssb-search-icon">

                    <FaMagnifyingGlass />

                </div>



                {/* INPUT */}

                <input

                    type="search"

                    className="ssb-input"

                    placeholder="Search products, brands and categories..."

                    value={
                        keyword
                    }

                    onChange={
                        (e) =>
                            setKeyword(
                                e.target.value
                            )
                    }

                    onKeyDown={
                        handleKeyDown
                    }

                    aria-label="Search products"

                />



                {/* CLEAR BUTTON */}

                {

                    keyword

                    &&

                    <button

                        type="button"

                        className="ssb-clear-button"

                        onClick={
                            handleClear
                        }

                        aria-label="Clear search"

                    >

                        <FaXmark />

                    </button>

                }



                {/* SEARCH BUTTON */}

                <button

                    type="button"

                    className="ssb-search-button"

                    onClick={
                        handleSearch
                    }

                >

                    <FaMagnifyingGlass />

                    <span>

                        Search

                    </span>

                </button>


            </div>


            {/* MOBILE SEARCH HINT */}

            <div className="ssb-hint">

                <FaMagnifyingGlass />

                <span>

                    Find exactly what you're looking for

                </span>

            </div>


        </div>

    );

}


export default SearchBar;