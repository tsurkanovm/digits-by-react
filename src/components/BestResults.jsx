import {useEffect, useState} from "react";

export function BestResults() {
    const [bestResult, setBestResult] = useState([]);
    useEffect(() => {
        fetch('http://fin.local/rest/V1/digits/best').then((response) => {
            return response.json()
        }).then(
            (resData) => {
                setBestResult(resData);
            }
        )
    }, [])
    return (
        <>
            <div className="best-results">
                <p><strong> Best results: </strong></p>
                {bestResult.map((result)=>
                    <p key={Math.random()*1000}>
                        {`Score - ${result.hits} with time - ${result.time}`}
                    </p>
                )}
            </div>
        </>
    )
}