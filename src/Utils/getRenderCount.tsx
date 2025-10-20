import React from "react";

export default function getRenderCount() {
	let count = 0;

	return () => {
		count++;
		return <div>Render Count: {count / 2}</div>;
	};
}
