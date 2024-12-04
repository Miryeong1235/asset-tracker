import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function PriceGraph({ prices }) {
    const [dates, setDates] = useState([]);
    const [priceArray, setPriceArray] = useState([]);

    useEffect(() => {
        const sortedPrices = prices.sort((a, b) => a.date.toDate() - b.date.toDate());

        // complement missing dates
        const interpolatedDates = [];
        const interpolatedPrices = [];

        for (let i = 0; i < sortedPrices.length; i++) {
            const currentDate = sortedPrices[i].date.toDate();
            const currentPrice = sortedPrices[i].price;

            // add current date and price
            const currentDateString = formatDate(currentDate);
            interpolatedDates.push(currentDateString);
            interpolatedPrices.push(currentPrice);

            if (i < sortedPrices.length - 1) {
                const nextDate = sortedPrices[i + 1].date.toDate();
                const nextDateString = formatDate(nextDate);

                // If the next date is not the next day, add the next date with the same price
                if (currentDateString !== nextDateString) {
                    interpolatedDates.push(nextDateString);
                    interpolatedPrices.push(currentPrice);
                }
            }
        }

        setDates(interpolatedDates);
        setPriceArray(interpolatedPrices);
    }, [prices]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

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
                        line: { shape: 'hv' }, // 水平・垂直に線を引く
                    },
                ]}
                layout={{ width: 800, height: 400 }}
            />
        </div>
    );
}

export default PriceGraph;
