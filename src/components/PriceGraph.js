import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function PriceGraph({ prices }) {
    const [dates, setDates] = useState([]);
    const [priceArray, setPriceArray] = useState([]);

    useEffect(() => {
        const sortedPrices = prices.sort((a, b) => a.date.toDate() - b.date.toDate());

        const dateArray = sortedPrices.map(price => {
            const date = price.date.toDate();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        });

        const priceArray = sortedPrices.map(price => price.price);

        setDates(dateArray);
        setPriceArray(priceArray);

    }, [prices]);

    return (
        <div>

            <Plot
                data={[
                    {
                        x: dates,
                        y: priceArray,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: '#80A1D4' },
                    },
                ]}
                layout={{ width: 800, height: 400 }}
            />
        </div>
    );
}

export default PriceGraph;
