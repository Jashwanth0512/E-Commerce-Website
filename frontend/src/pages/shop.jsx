import React from 'react';  
import Hero from '../components/Hero/Hero';
import Popular from '../components/popular/popular';
import Offers from '../components/offers/offers';
import NewCollection from '../components/NewCollections/NewCollection';
import Newsletter from '../components/NewsLetter/NewsLetter';

const Shop = () => {
    return(
        <div>
          <Hero/>
          <Popular/>
          <Offers/>
          <NewCollection/>
          <Newsletter/>
        </div>
    );
}

export default Shop;