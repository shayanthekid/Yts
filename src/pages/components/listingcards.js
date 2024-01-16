import React from 'react';
//this component will be responsible for rendering the cards based on the fetched data.
import ListingCard from './listingcard';

const ListingCards = () => {
    // Fetch data from the database and map it to individual card components
    const fetchedData = [
        {
            id: 1,
            title: 'Luxury Car Rental',
            imageURL:
             'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg'
         ,
            address: '123 Main St, Cityville',
            price: '$100/day',
        },
        {
            id: 2,
            title: 'Modern Apartment',
            imageURL: 'https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU',
            address: '456 Oak St, Townsville',
            price: '$200/night',
        },
        // Add more dummy data items as needed
    ];

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {/* Map the fetched data to ListingCard components */}
            {fetchedData.map((item) => (
                <ListingCard key={item.id} {...item} />
            ))}
            
        </div>
    );
};

export default ListingCards;