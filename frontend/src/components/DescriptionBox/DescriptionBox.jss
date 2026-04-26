import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
        <p>An e-commerce website is an online platform that facilitate
        buying and selling of products or services over the internet
        server as a virtual marketplace where business and individuals 
        showcase their product, interact with customers,and conduct 
        transcation without the need of a physical presence. E-commerce 
        website have gained immense popularity due to their conevenity
        accessibility, and global reac they offer
        </p>
        <p>
        E-commerce websites typically display products or services a
         detailed description,images,prices,and any available various
         (eg., sizes,colors). Each product usually has its own detailed
          with relevant information. 
        </p>
         </div>         
            
        </div>
    )
}

export default DescriptionBox;