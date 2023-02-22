export default {
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type:'image'}],
      options: {
        hotspot: 'true',
      }
    },
    {
      name: 'largeText1',
      title: 'LargeText1',
      type: 'string',
    },
    {
      name: 'desc1',
      title: 'Desc1',
      type: 'string',
    },
    {
      name: 'buttonLink1',
      title: 'ButtonLink1',
      type: 'string',
    },
    {
      name: 'midText1',
      title: 'MidText1',
      type: 'string',      
    },
    {
      name: 'largeText2',
      title: 'LargeText2',
      type: 'string',
    },
    {
      name: 'desc2',
      title: 'Desc2',
      type: "array",
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'buttonText1',
      title: 'ButtonText1',
      type: 'string',
    },
    {
      name: 'orientation',
      title: 'Orientation',
      type: 'string'
    },
    
  ]
}

// {
//   name: '',
//   title: '',
//   type: '',
// },
// {
//   name: '',
//   type: 'array',
//   of: [{type:'image'}],
// },