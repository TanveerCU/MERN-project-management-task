import React, { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import { useDisplayUser } from "../../data/projectListDataRetrieve";
import Card from "../utils/Card";

function SeeUser() {
	const [users, setusers] = useState([]);
	const data = useDisplayUser();
	useEffect(() => {
		setusers(data);
	}, [data]);
	return (
		<>
			{Object.keys(users).length !== 0 ? (
				<div className="flex flex-wrap justify-center sm:mt-12 ">
					{users.map((user) => {
						const { id, avatar_url, login, followers_url } = user;
						const number_of_followers = followers_url.length;
						const obj = {
							image: avatar_url,
							title: login,
							followers: number_of_followers,
						};
						return <Card {...obj} key={id} />;
					})}
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}

export default SeeUser;
