export default {
  name: 'coaching',
  title: 'Coaching',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Desc',
      type: "array",
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
    },
    {
      name:'index',
      title:'Index',
      type:'string'
    }
    
    
  ]
}
