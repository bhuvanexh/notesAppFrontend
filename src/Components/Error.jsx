import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    console.log(error);
    return (
        <>
            <div>
                <h1>there was an error</h1>
                {error &&
                    <>
                        <p>{error.statusText}</p>
                        <p>{error.data}</p>
                    </>
                }
            </div>
        </>
    )

}