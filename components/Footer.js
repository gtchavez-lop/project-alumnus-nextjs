import Link from 'next/link'

const Footer = () => {
    return (
        <>
            <div className="flex justify-between px-5 lg:px-28 py-10 bg-neutral text-neutral-content">
                <div className="flex flex-col justify-center">
                    <Link href="/events">
                        <p className="font-bold cursor-pointer">Events</p>
                    </Link>
                    <Link href="/listing">
                        <p className="font-bold cursor-pointer">Alumni List</p>
                    </Link>
                </div>
                <div className="flex justify-center">
                    <Link href="/" scroll={false}>
                        <img src="/pa-transparent-white.png" alt="logo" className="w-10 object-cover cursor-pointer" />
                    </Link>
                </div>
                <div className="flex flex-col justify-center">
                    {/* display copyright */}
                    <p className="font-bold">Copyright © 2022</p>
                </div>

            </div>
        </>
    )
}

export default Footer 