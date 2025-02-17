import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import './copyToClipboard.scss'

const CopyToClipboard = ({ text, handleCopyChange }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyState = (copy) => {
        setIsCopied(copy);
        handleCopyChange(copy);
    }


    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                handleCopyState();
                setTimeout(() => { handleCopyState(false) }, 2000);
            }).catch(err => console.error("Greška pri kopiranju: ", err));
        } else {
            // Alternativni metod za starije pregledače
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                handleCopyState(true);
                setTimeout(() => { handleCopyState(false) }, 2000);
            } catch (err) {
                console.error("Greška pri kopiranju (fallback): ", err);
            }
            document.body.removeChild(textArea);
        }
    };

    // const handleCopy = () => {
    //     navigator.clipboard.writeText(text).then(() => {
    //         setIsCopied(true);
    //         handleCopyState(true);
    //         setTimeout(() => { setIsCopied(false); handleCopyState(false) }, 2000);
    //     });
    // };

    return (
        <button onClick={handleCopy} className="copy-button">
            <FontAwesomeIcon
                icon={isCopied ? faClipboardCheck : faClipboard}
                className={isCopied ? "copied" : ""}
            />
        </button>
    );
};

export default CopyToClipboard;