import { useState } from "react";

function SearchBar({
  keyword,
  setKeyword,
  onSearch
}) {

    const handleSearch = () => {

        onSearch(keyword);

    };

    return (

        <div className="row mb-4">

            <div className="col-md-10">

                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search products..."
                    value={keyword}
                    onChange={(e) =>
                        setKeyword(e.target.value)
                    }
                />

            </div>

            <div className="col-md-2 mt-2 mt-md-0">

                <button
                    className="btn btn-dark w-100 btn-lg"
                    onClick={handleSearch}
                >
                    Search
                </button>

            </div>

        </div>

    );
}

export default SearchBar;