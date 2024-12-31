import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Analytics = ({ homePage }) => {
    const itemData = [
        { img: '1.png', title: 'Density Plot' },
        { img: '2.png', title: 'Correlation with Diabetes' },
        { img: '3.png', title: 'Line Plot' },
        { img: '4.png', title: 'Heat Map' },
    ];

    return (
        <div className="container mt-5 w-75 bg-form p-4 rounded myshadow">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center myfont">Analytics Dashboard</h2>
            </div>

            {/* Image Grid */}
            <ImageList cols={2} gap={15} className="rounded">
                {itemData.map((item) => (
                    <ImageListItem key={item.img} className="rounded shadow">
                        <img
                            src={`${item.img}?w=500&fit=crop&auto=format`}
                            alt={item.title}
                            className="img-fluid rounded"
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            position="below"
                            className="bg-secondary text-white p-1 rounded"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default Analytics;

