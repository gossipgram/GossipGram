import React from 'react'
import HighlightText from '../../common/HighlightText'

const Quote = () => {
  return (
    <div className=" text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
      GossipGram: Redefining Social Dynamics!     
      <HighlightText text={"Dive into Exploration , Connect Seamlessly"} /> {" "}
      , and Find Your
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        {" "}
        Perfect Gossip Partner{" "}
      </span>
      in a Vibrant Community
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        {" "}
        Experience Beyond Compare!
      </span>
    </div>
  )
}

export default Quote