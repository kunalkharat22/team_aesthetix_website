import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText as PortableTextComponent } from '@portabletext/react'
import GetImage from '../utils/getImage'
import Image from 'next/image'

export const client = sanityClient({
  projectId: 'eml767wc',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

const ImageComponent = ({ value }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <Image
      {...GetImage(value)}
      // blurDataURL={GetImage(value).blurDataURL}
      objectFit="cover"
      sizes="(max-width: 800px) 100vw, 800px"
      alt={value.alt || " "}
      // placeholder="blur"
      loading="lazy"
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    )
  },
  marks: {
    center: props => (
      <div style={{textAlign:'center'}}>{props.children}</div>
    ),
    highlight: props => (
      <span style={{fontWeight:'bold',color:'#1271F3'}}>
        {props.children}
      </span>
    ),
    link: props => (
      <a href={props?.value?.href} target="_blank" rel="noreferrer" style={{cursor:'pointer', color:'rgba(196, 69, 54, 1)'}}>
        {props.children}
      </a>
    ),
  }
};
// Set up Portable Text serialization
export const PortableText = props => (
  <PortableTextComponent components={components} {...props} />
);