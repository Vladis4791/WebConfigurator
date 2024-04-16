import React, { useState } from 'react'

const Sidebar = ({ onButtonClick }: { onButtonClick: (path: string) => void }) => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="Sidebar">
            <button onClick={() => onButtonClick('C:/')}>Диск C</button>
        </div>
    )
}

export default Sidebar