import { useEffect } from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Link } from 'react-router-dom';

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await fetch('https://fakestoreapi.com/products');
      if (componentMounted) {
        setData(await res.clone().json());
        setFilter(await res.json());
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>
            All
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(`men's clothing`)}>
            Men's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(`women's clothing`)}>
            Woman's Clothing
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(`jewelery`)}>
            Jewelery
          </button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct(`electronics`)}>
            Electronics
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div class="card h-100 text-center p-4" key={product.id}>
                  <img height="250px" src={product.image} class="card-img-top" alt={product.title} />
                  <div class="card-body">
                    <h5 class="card-title mb-0">{product.title.substring(0, 20)}...</h5>
                    <p class="card-text lead fw-bolder">${product.price}</p>
                    <Link to={`product/${product.id}`} class="btn btn-outline-dark">
                      Buy Now!
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12"></div>
        <h1 className="display-6 fw-bolder text-center">Lastest Products</h1>
        <hr />
      </div>
      <div className="row justify-content-center">{loading === true ? <Loading /> : <ShowProduct />}</div>
    </div>
  );
};

export default Products;
