const Logo = ({ strokeWidth, strokeColor, width, height }) => {
	strokeColor = strokeColor || '#fff';
	width = width || 100;
	height = height || 100;
	strokeWidth = strokeWidth || 70;

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 1500 1500"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<circle
				cx="750"
				cy="734.475"
				r="256.4"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
			/>
			<path
				d="M1391 734.475C1391 380.46 1104.01 93.4746 750 93.4746C395.985 93.4746 109 380.46 109 734.475C109 913.74 182.589 1075.82 301.206 1192.15M1200.62 1190.35C1084.84 1304.81 925.672 1375.47 750 1375.47C659.828 1375.47 574.004 1356.86 496.164 1323.25"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M301.3 734.474C301.3 486.664 502.19 285.774 750 285.774C997.81 285.774 1198.7 486.664 1198.7 734.474C1198.7 982.285 997.81 1183.17 750 1183.17C656.343 1183.17 569.388 1154.48 497.446 1105.4"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
			/>
			<path
				d="M301.3 722.937L301.3 1195.35"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
			/>
			<path
				d="M493.601 1102.41L493.6 1321.63"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M1199.98 734.475L1199.98 1375.47"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
			<path
				d="M1391 731.911L1391 1375.48"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
			<line
				x1="1201.26"
				y1="1375.47"
				x2="1391"
				y2="1375.47"
				stroke={strokeColor}
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
};

export default Logo;
