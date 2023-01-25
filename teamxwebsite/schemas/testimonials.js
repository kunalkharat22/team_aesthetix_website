export default {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Desc',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of:[{type:'image'}],
      options: {
        hotspot: true
      },
    },
  ]
}
