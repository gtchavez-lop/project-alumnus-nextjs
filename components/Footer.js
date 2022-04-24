import Link from 'next/link';
import { CgFacebook, CgTwitter, CgInstagram } from 'react-icons/cg';

const Footer = (e) => {
	return (
		<>
			<div className="flex w-full flex-col items-center justify-evenly gap-5 bg-base-300 py-14 px-10">
				<div className="flex gap-10">
					<Link href={'/events'} passHref scroll>
						<p className="link underline-offset-4">Events</p>
					</Link>
					<Link href={'/listing'} passHref scroll>
						<p className="link underline-offset-4">Alumni Listing</p>
					</Link>
					<Link href={'/register'} passHref scroll>
						<p className="link underline-offset-4">Registration</p>
					</Link>
				</div>
				<div className="flex gap-5">
					<CgFacebook size={25} className="opacity-50" />
					<CgTwitter size={25} className="opacity-50" />
					<CgInstagram size={25} className="opacity-50" />
				</div>
				<p className="">&#169; BSCS3A Team Alumnus, All Rights Reserved</p>
			</div>
		</>
	);
};

export default Footer;
