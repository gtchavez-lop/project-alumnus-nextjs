const ErrorPage = e => {
    return (
        <>
            <div className="min-h-screen flex justify-center items-center select-none">
                <p className="text-2xl">
                    <span className="text-red-500 text-5xl">404</span>
                    <span className="text-gray-500">
                        Page not found
                    </span>
                </p>
            </div>
        </>
    )
}

export default ErrorPage