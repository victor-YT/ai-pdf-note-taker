import React, {useEffect, useState} from 'react'

function PdfViewer({fileUrl}) {
    console.log(fileUrl)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isIframeReady, setIsIframeReady] = useState(false)

    useEffect(() => {
        // set time to async loading iframe to avoid ghost image
        const timer = setTimeout(() => {
            setIsIframeReady(true)
        }, 2000)

        return () => clearTimeout(timer)  // clear timer
    }, [])

    const handleLoad = () => {
        setIsLoaded(true)
    }

    return (
        <div>
            {!isLoaded &&
                <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="loader">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>}
            {isIframeReady && <iframe
                src={fileUrl + "#toolbar=1"}
                height="90vh"
                width="100%"
                className={`h-[90vh] ${isLoaded ? '' : 'hidden'}`}
                onLoad={handleLoad}
            />}
        </div>
    )
}

export default PdfViewer
