import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const SpecificProject = () => {
            const { id } = useParams();
            useEffect(() => {
                        console.log(id)
            }, [])
            return (
                        <div>SpecificProject</div>
            )
}

export default SpecificProject;