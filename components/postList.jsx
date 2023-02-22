import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/Blogs.module.scss'
import { urlFor } from '../lib/client'
import GetImage from '../utils/getImage'
import {HiOutlinePhotograph} from 'react-icons/hi'
import CategoryLabel from './blog/category'
import {parseISO, format} from 'date-fns'

const PostList = ({post,aspect, preloadImage}) => {

  const [isHovered, setIsHovered] = useState(false)

  const imageProps = post?.mainImage
    ? GetImage(post.mainImage)
    : null;

    const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  // console.log('imgprops',post.excerpt);

  return (
    <>
    <Link href={`/Blogs/${post.slug.current}`}>
    <div className={styles.postListContainer}>
      <div className={aspect === "landscape" ? `${styles.postImg} ${styles.aspectVideo}` : `${styles.postImg} ${styles.aspectSquare}`}>
        <Link href={`/Blogs/${post.slug.current}`}>
          <a>
            {imageProps ? (
              <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  // blurDataURL={imageProps.blurDataURL}
                  alt={post.mainImage.alt || "Thumbnail"}
                  // placeholder="blur"
                  sizes="80vw"
                  // //sizes="(max-width: 640px) 90vw, 480px"
                  layout="fill"
                  objectFit="cover"
                  priority={preloadImage ? true : false}
                  className="transition-all"
                />
              ) : (
                <span className={styles.postImgAbsent}>
                  <HiOutlinePhotograph />
                </span>
                // <></>
              )}
          </a>
        </Link>
      </div>
      <CategoryLabel categories={post.categories}/>
    
      <h2 className={styles.postTitle}>
        <Link href={`/Blogs/${post.slug.current}`}>
        <span
          className={styles.backgroundStyles}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
            {post.title}
        </span>
        </Link>
      </h2>
    
      <div>
        {post.excerpt && (
          <p className={styles.postExcerpt}>{post.excerpt}</p>
        )}
      </div>

      <div className={styles.postFooter}>
        <div className={styles.postAuthor}>
          <div className={styles.authorImg}>
            <Image 
               src={AuthorimageProps.src}
              //  blurDataURL={AuthorimageProps.blurDataURL}
               loader={AuthorimageProps.loader}
               objectFit="cover"
               layout="fill"
               alt={post?.author?.name}
              //  placeholder="blur"
               sizes="50px"
              //  style={{borderRadius:'50%'}}
              //  className="rounded-full"
            />
          </div>
          <p className={styles.authorName}>{post.author.name}</p>
        </div>
        <span className={styles.bulletMarker}>
            &bull;
        </span>
        
        <time
          dateTime={post?.publishedAt || post._createdAt}
        >
          {format(
              parseISO(post?.publishedAt || post._createdAt),
              "MMMM dd, yyyy"
            )}
        </time>
      </div>

    </div>
    </Link>
    </>
  )
}

export default PostList


