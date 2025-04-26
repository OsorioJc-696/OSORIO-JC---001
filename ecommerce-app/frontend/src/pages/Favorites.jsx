import React from 'react';

const Favorites = () => {
    const favoriteItems = []; // Replace with your favorite items state or props

    return (
        <div>
            <h1>Favorites</h1>
            {favoriteItems.length > 0 ? (
                <ul>
                    {favoriteItems.map((item, index) => (
                        <li key={index}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>Price: ${item.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no favorite items yet.</p>
            )}
        </div>
    );
};

export default Favorites;