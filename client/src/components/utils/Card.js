import React from "react";

export function Card({ image, followers, title }) {
	return (
		<div className="mx-5 my-5 p-2 shadow-2xl w-64 space-y-2 rounded-xl">
			<img src={image} alt="product pic" className="h-56 mx-auto" />

			<div className="w-full  px-5 text-blue-900">
				<div className=" space-x-3 pb-5">
					<span className="text-lg font-semibold">{title}</span>
				</div>
				<div className=" space-x-3 pb-5">
					<span className="text-lg font-semibold">
						Total follower: {followers}
					</span>
				</div>
			</div>
		</div>
	);
}

export default Card;
