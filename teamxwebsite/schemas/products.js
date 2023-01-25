export default {
  name: 'products',
  title: 'Product',
  type: 'document',
  fields: [
      {
        name:'title',
        title:'Title',
        type:'string'
      },
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
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
      },
      {
          name: 'desc',
          title: 'Desc',
          type: 'string',
      },
      {
          name: 'price',
          title: 'Price',
          type: 'string',
      },
      {
          name: 'discount',
          title: 'Discount',
          type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 90,
        }
      },
  ]
}