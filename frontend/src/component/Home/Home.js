import React, { Fragment } from 'react'
// import { CgMouse } from "react-icons/all";
import './Home.css'
import Product from './Product.js'


const product ={
    name : "Blue T-shirt",
    images:[{url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKyfFPF8AGw-TT1cOqeu3XWbbYKYjUerdcw&usqp=CAU"}],
    price:"$3000",
    _id:"saksham",
};
const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <p>Welcome to Nakasa</p>
            <h1>Find Amazing Animals Below</h1>

            <a href='#container'>
                <button>Scroll
                    {/* <CgMouse /> */}
                </button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>

        <div className='container' id='container'>
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        </div>
    </Fragment>
    );
};

export default Home;