import React, { useEffect, useState } from "react";
import HighlightText from "../Components/common/HighlightText";
import Quote from "../Components/GossipPartner/About/Quote";
import "./commingsoon.css";

import Vara from "vara";

const PatnerCommingSoonPage = () => {
  const token = localStorage.getItem("token").split('"')[1];
  const [rendered, setRendered] = useState(false);

  //   useEffect(() => {
  //     const smoothWrite = () => {
  //       new Vara(
  //         "#container",
  //         "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
  //         [
  //           {
  //             text: "Comming Soon", // String, text to be shown
  //             fontSize: 70, // Number, size of the text
  //             strokeWidth: 2.5, // Width / Thickness of the stroke
  //             color: "orange", // Color of the text
  //             backgroundColor: "linear-gradient(to right, #E65C00, #F9D423)",

  //             // id: "", // String or integer, for if animations are called manually or when using the get() method. Default is the index of the object.
  //             duration: 3000, // Number, Duration of the animation in milliseconds
  //             textAlign: "center", // String, text align, accepted values are left,center,right
  //             x: 0, // Number, x coordinalor of the textte of the text
  //             y: 0, // Number, y coordinate of the text
  //             fromCurrentPosition: {
  //               // Whether the x or y coordinate should be from its calculated position, ie the position if x or y coordinates were not applied
  //               x: true, // Boolean
  //               y: true, // Boolean
  //             },
  //             autoAnimation: true, // Boolean, Whether to animate the text automatically
  //             queued: true, // Boolean, Whether the animation should be in a queue
  //             delay: 1000, // Delay before the animation starts in milliseconds
  //             /* Letter spacing can be a number or an object, if number, the spacing will be applied to every character.
  //     If object, each letter can be assigned a different spacing as follows,
  //     letterSpacing: {
  //         a: 4,
  //         j: -6,
  //         global: -1
  //     }
  //     The global property is used to set spacing of all other characters
  //     */
  //             letterSpacing: 0,
  //           },
  //         ]
  //       );
  //     };
  //     if (!rendered) {
  //       smoothWrite();
  //       setRendered(true);
  //     }
  //   }, [rendered]);
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      {/* section 1 */}
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 py-20 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto  text-4xl font-semibold lg:w-[70%]">
            Find Your Gossip Partner: Revolutionizing Social Connections with
            <HighlightText text={"GossipGram!"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Your ultimate social hub for gossip enthusiasts! Discover
              intriguing features, connect with like-minded individuals, and
              find your perfect gossip partner. Dive into a vibrant community
              experience and explore the art of conversation like never before
            </p>
          </header>

          <div className="  w-full ">
            {/* comming soon animation div */}
            {/* <div
              id="container"
              className=" w-full flex-col flex items-center justify-center"
            /> */}
            <div className="w-full flex items-center justify-center">
              <p className="text-8xl bg-gradient-to-b py-5 from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text commingsoon ">
                Comming Soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>
    </div>
  );
};

export default PatnerCommingSoonPage;
