import React from 'react';

const Home = ({ setCurrentPage, setInputType }) => {
    const handleInputClick = () => {
        setCurrentPage(1);
        setInputType(1);
    };

    return (
        <div className="container w-10 mt-5 myshadow p-3 shade" style={{ height: '50vh', width: '90vh' }}>
            <h2 className="text-center font-weight-bold text-dark" style={{ fontSize: "3rem" }}>Diabetes Risk Analyzer</h2>
            <hr className="homehr" />
            <div className="d-flex justify-content-center align-items-center">
                <button
                    className="btn bg-pink text-white btn-lg btn-block m-5"
                    style={{ height: '100px', width: '150px' }}
                    onClick={handleInputClick}
                >
                    INPUT
                </button>
                <button
                    className="btn bg-pink text-white btn-lg btn-block m-5"
                    style={{ height: '100px', width: '150px' }}
                    setCurrentPage
                    onClick={() => {setCurrentPage(2); setInputType(1)}}
                >
                    Analytics
                </button>
            </div>
        </div>
    );
};

export default Home;
