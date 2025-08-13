import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchAllCoin = async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-roNcNWiLxetq3yMT7vtGpTCt'
                }
            };

            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
                options
            );
            const data = await res.json();
            setAllCoin(data); // store in state
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    const contextValue = {
        allCoin,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
