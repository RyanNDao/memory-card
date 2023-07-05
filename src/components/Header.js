import React from "react";

export default function Header({score, bestScore}){
    return (
        <div className="header-container">
            <div className="current-score">
                Current Score: {score}
            </div>
            <div className="best-score">
                Best Score: {bestScore}
            </div>
        </div>
    )
}