import React from 'react'
import { PortableText, client } from '../../lib/client';
import styles from '../../styles/PostDetails.module.scss'
import CategoryLabel from '../../components/blog/category'
import GetImage from '../../utils/getImage'
import Image from 'next/image';
import {parseISO, format} from 'date-fns'
import Link from 'next/link';
import { Newsletter } from '../../components';

const PostDetails = (props) => {

  const {postdata} = props

  const AuthorimageProps = postdata?.author?.image
  ? GetImage(postdata.author.image)
  : null;

  const imageProps = postdata?.mainImage
  ? GetImage(postdata?.mainImage)
  : null;

  // console.log('aswd',postdata.body);

  return (
    <>
    <div className={styles.PostDetailsContainer}>
      {postdata && (
        <>
        <div className={styles.container}>
          <div className={styles.categoryLabel}>
            <CategoryLabel categories={postdata.categories}/>
          </div>

          <h1 className={styles.postTitle}>
            {postdata.title}
          </h1>

          <div className={styles.postdeets}>
            <div className={styles.authorImg}>
              {AuthorimageProps&&(  
                <Image 
                  src={AuthorimageProps.src}
                  //  blurDataURL={AuthorimageProps.blurDataURL}
                  loader={AuthorimageProps.loader}
                  objectFit="cover"
                  layout="fill"
                  alt={postdata?.author?.name}
                  //  placeholder="blur"
                  // sizes="50px"
                  //  style={{borderRadius:'50%'}}
                  //  className="rounded-full"
                />
              )}
            </div>
            <div>
              <p className={styles.authorName}>
                {postdata.author.name}
              </p>
              <div className={styles.postTime}>
                <time
                  dateTime={postdata?.publishedAt || postdata._createdAt}

                >
                  {format(
                      parseISO(postdata?.publishedAt || postdata._createdAt),
                      "MMMM dd, yyyy"
                    )}
                </time>
                <span> · {postdata.estReadingTime || "5"} min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.postImg}>
          
        {imageProps && (
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            // blurDataURL={imageProps.blurDataURL}
            // placeholder="blur"
            alt={postdata.mainImage.alt || "Thumbnail"}
            layout="fill"
            objectFit="cover"
            loading="eager"
            />
          )}
        </div>

        <div className={styles.container}>
          <article className={styles.postContent}>
            <div className={styles.postTextBody}>
              {postdata.body && <PortableText value={postdata.body} />}
            </div>
            <div className={styles.backToBtn}>
              <Link href="/Blogs">
                <a><p>
                  ← View all posts
                </p></a>
              </Link>
            </div>

            <div className={styles.authorCard}>
              <div className={styles.authorImg}>
                {AuthorimageProps&&(  
                  <Image 
                    src={AuthorimageProps.src}
                    //  blurDataURL={AuthorimageProps.blurDataURL}
                    loader={AuthorimageProps.loader}
                    objectFit="cover"
                    layout="fill"
                    alt={postdata?.author?.name}
                    //  placeholder="blur"
                    // sizes="50px"
                    //  style={{borderRadius:'50%'}}
                    //  className="rounded-full"
                  />
                )}
              </div>
              <div>
                <h1>
                    About {postdata.author.name}
                </h1>
                <div>
                  {postdata.author.bio && <PortableText value={postdata.author.bio} />}
                </div>
              </div>
            </div>

          </article>
        </div>

        </>
      )}
      
    </div>
    <Newsletter />
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
    'slug': slug.current,
  }
  `;

  const allPosts = await client.fetch(query)

  const paths = allPosts?.map((page) => ({
    params: {
      slug: page.slug
    }
  })) || []

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({params}) => {
    const query = `
    *[_type == "post" && slug.current == $slug][0] {
      ...,
      author->,
      categories[]->,
      "estReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
    `
    const post = await client.fetch(query,{
      slug: params.slug
    })
  
  
    return{
      props: {
        postdata: { ...post }        
      },
      revalidate: 10
    }
  }

export default PostDetails