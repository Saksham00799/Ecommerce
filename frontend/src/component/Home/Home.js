import React, { Fragment, useEffect } from 'react'
// import { CgMouse } from "react-icons/all";
import './Home.css'
import Product from './Product.js'
import MetaData from '../layout/MetaData';
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert'


// const product = {
//     name: "Blue T-shirt",
//     images: [{ url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKyfFPF8AGw-TT1cOqeu3XWbbYKYjUerdcw&usqp=CAU" }],
//     price: "$3000",
//     _id: "saksham",
// };
const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector((state) => state.products)


    useEffect(() => {
        if(error){
            return alert.error("Error")
        }
        dispatch(getProduct());

    }, [dispatch,error,alert]);
    return (
        <Fragment>
            {
                loading ? (<Loader />) :
                    (
                        <Fragment>
                            <MetaData title="Nakkasa" />
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
                                {products && products.map((product) => <Product product={product} />)}
                            </div>
                        </Fragment>
                    )
            }
        </Fragment>

    );
};

export default Home;