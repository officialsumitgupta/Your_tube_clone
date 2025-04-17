// import axios from 'axios';
// import { useEffect } from 'react';
// import React from 'react'
// import vid from "../../Component/Video/vid.mp4"
// import WHL from '../../Component/WHL/WHL'
// import { useSelector } from 'react-redux'
// const Likedvideo = () => {
//   const likedvideolist=useSelector((state)=>state.likedvideoreducer)
//   console.log(likedvideolist)
//     // const likedvideolist=[
//     //     {
//     //       _id:1,
//     //       video_src:vid,
//     //       chanel:"wvjwenfj3njfwef",
//     //       title:"video 1",
//     //       uploader:"abc",
//     //       description:"description of video 1"
//     //     },
//     //     {
//     //       _id:1,
//     //       video_src:vid,
//     //       chanel:"wvjwenfj3njfwef",
//     //       title:"video 1",
//     //       uploader:"abc",
//     //       description:"description of video 1"
//     //     },
//     //     {
//     //       _id:2,
//     //       video_src:vid,
//     //       chanel:"wvjwenfj3njfwef",
//     //       title:"video 2",
//     //       uploader:"abc",
//     //       description:"description of video 2"
//     //     },
//     //     {
//     //       _id:3,
//     //       video_src:vid,
//     //       chanel:"wvjwenfj3njfwef",
//     //       title:"video 3",
//     //       uploader:"abc",
//     //       description:"description of video 3"
//     //     },
//     //     {
//     //       _id:4,
//     //       video_src:vid,
//     //       chanel:"wvjwenfj3njfwef",
//     //       title:"video 4",
//     //       uploader:"abc",
//     //       description:"description of video 4"
//     //     },
//     //   ]
//   return (
//     <WHL page={"Liked Video"} videolist={likedvideolist}/>
//   )
// }

// export default Likedvideo



import axios from 'axios';
import { useEffect } from 'react';
import React from 'react';
import vid from "../../Component/Video/vid.mp4";
import WHL from '../../Component/WHL/WHL';
import { useSelector } from 'react-redux';

const Likedvideo = () => {
  const likedvideolist = useSelector((state) => state.likedvideoreducer);
  const currentUser = useSelector((state) => state.authreducer?.data);

  useEffect(() => {
    const updatePoints = async () => {
      if (!currentUser || likedvideolist.length === 0) return;

      try {
        const res = await axios.post('http://localhost:5000/points/add-points', {
          userId: currentUser._id,
          videosWatched: likedvideolist.length
        });

        console.log('✅ Points updated:', res.data.points);
      } catch (error) {
        console.error('❌ Failed to update points:', error);
      }
    };

    updatePoints();
  }, [likedvideolist, currentUser]);

  return (
    <WHL page={"Liked Video"} videolist={likedvideolist} />
  );
};

export default Likedvideo;
