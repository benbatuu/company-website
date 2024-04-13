import { useEffect } from "react";
import dynamic from "next/dynamic";
import Layouts from "@layouts/Layouts";

import { getSortedTeamData } from "@library/team";
import { getSortedServicesData } from "@library/services";

import CountUp from "react-countup";
import { circleText } from "@common/utilits";

import PageBanner from "@components/PageBanner";
import Team2Section from "@components/sections/Team2";
import PartnersSection from "@components/sections/Partners";
import AwardsSection from "@components/sections/Awards";
import Services4Section from "@components/sections/Services4";

const HistorySlider = dynamic(() => import("@components/sliders/History"), {
	ssr: false,
});
const Testimonial2Slider = dynamic(
	() => import("@components/sliders/Testimonial2"),
	{ ssr: false }
);

const About = (props) => {
	useEffect(() => {
		circleText();
	}, []);

	const clickedVideoButton = (e) => {
		e.preventDefault();

		e.target.parentNode.classList.add("active");
		let videoIframe = e.target.parentNode.querySelector(".js-video-iframe");
		let videoUrl = videoIframe.dataset.src;
		videoIframe.setAttribute("src", videoUrl);
	};

	return (
		<Layouts>
			<PageBanner
				pageTitle={"About Us"}
				pageDesc={
					"Innovative software development at the intersection of art, design, and technology."
				}
			/>

			{/* Onovo About */}
			<section className="onovo-section gap-top-140 gap-bottom-140">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
							{/* Heading */}
							<div className="onovo-heading gap-bottom-60">
								<div className="onovo-subtitle-1">
									<span> Welcome to Onovo </span>
								</div>
								<h2 className="onovo-title-3">
									<span>
										{" "}
										Shaping the Future with <br />
										Innovative Software Solutions
									</span>
								</h2>
								<div className="onovo-text">
									<p>
										From the moment of our company's inception, we have assisted
										our clients in finding exceptional solutions for their
										businesses, <strong>creating memorable brands</strong>, and{" "}
										<strong>developing digital products.</strong> Our expertise
										grows with each passing year, alongside our accumulated
										experience.
									</p>
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 offset-lg-1 hide-on-mobile">
							{/* Image */}
							<img src="/images/onovo-about-logo.png" alt="" />
						</div>
					</div>

					{/* Numbers items */}
					<div className="row gap-row gap-bottom-100">
						{/*number-item*/}
						<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<div className="onovo-counter">
								<div
									className="num onovo-text-white js-counter"
									data-end-value="23"
								>
									<CountUp
										end="23"
										duration={5}
										enableScrollSpy={true}
										scrollSpyOnce={true}
									/>
								</div>
								<div className="num-after onovo-text-white"> + </div>
								<div className="label"> Team members </div>
							</div>
						</div>

						{/*number-item*/}
						<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<div className="onovo-counter">
								<div
									className="num onovo-text-white js-counter"
									data-end-value="99"
								>
									<CountUp
										end="197"
										duration={5}
										enableScrollSpy={true}
										scrollSpyOnce={true}
									/>
								</div>
								<div className="num-after onovo-text-white"> + </div>
								<div className="label"> Completed projects </div>
							</div>
						</div>

						{/*number-item*/}
						<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<div className="onovo-counter">
								<div
									className="num onovo-text-white js-counter"
									data-end-value="12"
								>
									<CountUp
										end="17"
										duration={5}
										enableScrollSpy={true}
										scrollSpyOnce={true}
									/>
								</div>
								<div className="num-after onovo-text-white"> M </div>
								<div className="label"> Lines of code </div>
							</div>
						</div>
					</div>

					{/* Video */}
					<div className="onovo-video" data-onovo-overlay data-onovo-scroll>
						<div
							className="image"
							onClick={(e) => clickedVideoButton(e)}
							style={{ backgroundImage: "url(/images/hero-digital-1.jpg)" }}
						/>
						<iframe
							className="js-video-iframe"
							data-src="https://www.youtube.com/embed/Gu6z6kIukgg?showinfo=0&rel=0&autoplay=1"
						></iframe>
						<div
							className="play onovo-circle-text"
							onClick={(e) => clickedVideoButton(e)}
						>
							<div className="arrow" />
							<div className="label onovo-text-black onovo-circle-text-label">
								{" "}
								Play Video - Play Video - Play Video -{" "}
							</div>
						</div>
					</div>

					{/* Description */}
					<div className="row gap-top-100">
						<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
							<h5 className="text-uppercase">Our Mission</h5>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
							At our core, we are driven by a mission to redefine the boundaries
							of software development through innovation and creativity. We
							strive to empower businesses with cutting-edge solutions that not
							only meet but exceed their expectations. Our mission is to be a
							catalyst for positive change, inspiring others in the industry to
							push the boundaries of what is possible.
						</div>
					</div>

					{/* Description */}
					<div className="row gap-top-60">
						<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
							<h5 className="text-uppercase">Our Goal</h5>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
							To consistently deliver innovative and high-quality software solutions that drive the success of our clients' businesses.
						</div>
					</div>

					{/* Gallery */}
					<div className="row gap-top-100">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
							<a href="/images/posts1.jpg" className="mfp-image">
								<img src="/images/posts1-1024x683.jpg" alt="" />
							</a>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 gap-top-60">
							<a href="/images/posts2.jpg" className="mfp-image">
								<img src="/images/posts2-1024x683.jpg" alt="" />
							</a>
						</div>
					</div>
				</div>
			</section>

			<Services4Section services={props.services} />

			<AwardsSection />

			<HistorySlider />

			<Team2Section team={props.team} />

			<Testimonial2Slider />

			<PartnersSection />
		</Layouts>
	);
};
export default About;

export async function getStaticProps() {
	const allTeam = getSortedTeamData();
	const allServices = getSortedServicesData();

	return {
		props: {
			team: allTeam,
			services: allServices,
		},
	};
}
