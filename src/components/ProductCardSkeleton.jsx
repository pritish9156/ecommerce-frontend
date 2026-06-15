function ProductCardSkeleton() {

  return (

    <div className="card shadow-sm">

      <div
        className="placeholder-glow"
      >

        <span
          className="placeholder col-12"
          style={{
            height: "250px"
          }}
        ></span>

      </div>

      <div className="card-body">

        <p className="placeholder-glow">

          <span className="placeholder col-8"></span>

        </p>

        <p className="placeholder-glow">

          <span className="placeholder col-12"></span>

          <span className="placeholder col-10"></span>

        </p>

        <p className="placeholder-glow">

          <span className="placeholder col-4"></span>

        </p>

      </div>

    </div>

  );
}

export default ProductCardSkeleton;