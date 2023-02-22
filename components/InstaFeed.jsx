import React, { useState, useEffect } from 'react'

const InstagramFeed = ({ feed, rows, columns }) => {
  // const [feed, setFeed] = useState([]);

  // console.log(process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE);

  // useEffect(() => {
  //   const getFeed = async () => {
  //     const res = await axios.get(
  //       `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN}`
  //     );
  //     setFeed(res.data.data);
  //   };

  //   getFeed();
  // }, [accessToken]);


  const sliceNo = rows*columns
  // console.log(feed);

  return (
    <div className='feed-container'>
      {feed && feed.slice(0,sliceNo).map(post => (
        <div key={post.id} className='feed-item'>
           {(() => {
            switch (post.media_type) {
              case "IMAGE":
              case "CAROUSEL_ALBUM":
                return <a href={post.permalink} target='_blank' rel="noreferrer noopener"><img src={post.media_url}  /></a>;
              case "VIDEO":
                return <a href={post.permalink} target='_blank' rel="noreferrer noopener"><img src={post.thumbnail_url} /></a>;
              default:
                return <></>;
            }
          })()}
          {/* alt={image.caption.slice(0,25)} */}
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;















// const InstaFeed = ({feed}) => {
//   useEffect(() => {
//     console.log(feed);
//   },[feed]);

//   return (
//     <div>
//      Hello
//     </div>
//   )
// }

// export const getStaticPaths = async () => {
//   // Fetch data to determine the set of possible values for the id param
//   const data = await fetch('https://example.com/api/posts')
//   const posts = await data.json()

//   // Use the values of the id param to create the set of possible paths
//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }))

//   return { paths, fallback: false }
// }


// export const getStaticProps = async () => {
//   const url =`https://graph.instagram.com/me/media?fields=id,caption&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
//   const data = await fetch(url)
//   const feed = await data.json()

//   console.log('feed',feed);

//   return {
//     props: {
//       feed,
//     },
//   }
// }

// export default InstaFeed