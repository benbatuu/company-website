import React from "react";
import { useEffect } from "react";
import Layouts from "@layouts/Layouts";
import dynamic from "next/dynamic";

import { getSortedPostsData } from "@library/posts";
import { getSortedProjectsData } from "@library/projects";
import { getSortedTeamData } from "@library/team";

import { circleText } from "@common/utilits";

//import HeroSection from "@components/sections/Hero";
import ServicesSection from "@components/sections/Services";
import ShowcaseSection from "@components/sections/Showcase";
import TeamSection from "@components/sections/Team";
import VideoSection from "@components/sections/Video";
import CountersSection from "@components/sections/Counters";
import CallToActionSection from "@components/sections/CallToAction";
import LatestPostsSection from "@components/sections/LatestPosts";
import PartnersSection from "@components/sections/Partners";
import CallToAction2Section from "@components/sections/CallToAction2"

const HeroSection = dynamic(() => import("@components/sections/Hero"), { ssr: false });
const HistorySlider = dynamic(() => import("@components/sliders/History"), { ssr: false });
const TickerSlider = dynamic(() => import("@components/sliders/Ticker"), { ssr: false });
const TestimonialSlider = dynamic(() => import("@components/sliders/Testimonial"), { ssr: false });

const Home1 = (props) => {
  useEffect(() => {
    circleText();
  }, []);

  return (
    <Layouts>
      <>
        <HeroSection />
        <ServicesSection />
        <HistorySlider />
        <TickerSlider />
        <ShowcaseSection projects={props.projects} />
        <TeamSection team={props.team} />
        <TestimonialSlider />
        <VideoSection />
        <CountersSection />
        <CallToActionSection />
        <LatestPostsSection posts={props.posts} />
        <CallToAction2Section />
        <PartnersSection />
      </>
    </Layouts>
  );
};
export default Home1;

export async function getStaticProps() {
  const allPosts = getSortedPostsData();
  const allProjects = getSortedProjectsData();
  const allTeam = getSortedTeamData();

  return {
    props: {
      posts: allPosts,
      projects: allProjects,
      team: allTeam
    }
  }
}