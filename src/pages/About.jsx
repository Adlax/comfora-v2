import React from "react";

const About = () => {
	return (
		<>
			<div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
				<h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">We love</h1>
				<div className="stats bg-primary shadow">
					<div className="stat">
						<div className="stat-title text-primary-content text-4xl font-bold tracking-widest">comfora</div>
					</div>
				</div>
			</div>
			<p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sunt, inventore at cupiditate sequi quibusdam soluta ut error quod aliquid molestias
				consequatur officiis in beatae modi hic, itaque cumque iste rem! Ad reprehenderit asperiores placeat accusantium aspernatur officiis nesciunt ex
				quasi cumque aperiam maxime est pariatur non, esse, doloremque rem.
			</p>
		</>
	);
};

export default About;
