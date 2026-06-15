import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import api from "../services/api";
import SearchBar from "../components/SearchBar";

function Products() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [brands, setBrands] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState("");

    const [sortBy, setSortBy] = useState("");

    const [keyword, setKeyword] = useState("");

    const [currentPage, setCurrentPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {

        fetchProducts();

        fetchBrands();

    }, []);

    const fetchProducts = async (
        searchKeyword = keyword,
        brandId = selectedBrand,
        sort = sortBy,
        page = currentPage
    ) => {

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/product/search",
                    {
                        keyword: searchKeyword,
                        brandId:
                            brandId === ""
                                ? null
                                : Number(brandId),
                        page,
                        size: 12,
                        sortBy: sort
                    }
                );

            setProducts(
                response.data.products
            );

            setCurrentPage(
                response.data.currentPage
            );

            setTotalPages(
                response.data.totalPages
            );

            setTotalRecords(
                response.data.totalRecords
            );

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }
    };

    const fetchBrands = async () => {

        try {

            const response =
                await api.get("/brand");

            setBrands(response.data);

        }
        catch (error) {

            console.error(error);

        }

    };

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">

                    All Products

                </h2>

                <SearchBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={() =>
                        fetchProducts(
                            keyword,
                            selectedBrand,
                            sortBy
                        )
                    }
                />

                <div className="row mb-4">

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={selectedBrand}
                            onChange={(e) => {

                                setSelectedBrand(
                                    e.target.value
                                );

                                fetchProducts(
                                    keyword,
                                    e.target.value,
                                    sortBy
                                );

                            }}
                        >

                            <option value="">
                                All Brands
                            </option>

                            {
                                brands.map(brand => (

                                    <option
                                        key={brand.id}
                                        value={brand.id}
                                    >
                                        {brand.name}
                                    </option>

                                ))
                            }

                        </select>

                    </div>

                    <div className="col-md-4 mt-3 mt-md-0">

                        <select
                            className="form-select"
                            value={sortBy}
                            onChange={(e) => {

                                setSortBy(
                                    e.target.value
                                );

                                fetchProducts(
                                    keyword,
                                    selectedBrand,
                                    e.target.value
                                );

                            }}
                        >

                            <option value="">
                                Sort By
                            </option>

                            <option value="name">
                                Name
                            </option>

                            <option value="rating">
                                Highest Rated
                            </option>

                            <option value="newest">
                                Newest
                            </option>

                        </select>

                    </div>

                </div>

                <div className="row g-4">

                    {
                        loading ?

                            [...Array(8)].map((_, index) => (

                                <div
                                    key={index}
                                    className="
                    col-12
                    col-sm-6
                    col-lg-4
                    col-xl-3
                  "
                                >

                                    <ProductCardSkeleton />

                                </div>

                            ))

                            :

                            products.map(product => (

                                <div
                                    key={product.id}
                                    className="
                    col-12
                    col-sm-6
                    col-lg-4
                    col-xl-3
                  "
                                >

                                    <ProductCard
                                        product={product}
                                    />

                                </div>

                            ))
                    }

                </div>

                <div className="mt-5">

                    <div className="text-center mb-3">

                        Total Products:
                        {" "}
                        {totalRecords}

                    </div>

                    <div
                        className="
      d-flex
      justify-content-center
      align-items-center
      gap-2
      flex-wrap
    "
                    >

                        <button
                            className="btn btn-outline-dark"
                            disabled={currentPage === 0}
                            onClick={() =>
                                fetchProducts(
                                    keyword,
                                    selectedBrand,
                                    sortBy,
                                    currentPage - 1
                                )
                            }
                        >
                            Previous
                        </button>

                        {

                            [...Array(totalPages)].map(
                                (_, index) => (

                                    <button
                                        key={index}
                                        className={
                                            currentPage === index
                                                ? "btn btn-dark"
                                                : "btn btn-outline-dark"
                                        }
                                        onClick={() =>
                                            fetchProducts(
                                                keyword,
                                                selectedBrand,
                                                sortBy,
                                                index
                                            )
                                        }
                                    >
                                        {index + 1}
                                    </button>

                                )
                            )

                        }

                        <button
                            className="btn btn-outline-dark"
                            disabled={
                                currentPage === totalPages - 1
                            }
                            onClick={() =>
                                fetchProducts(
                                    keyword,
                                    selectedBrand,
                                    sortBy,
                                    currentPage + 1
                                )
                            }
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Products;