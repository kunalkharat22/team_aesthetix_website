import createSchema from 'part:@sanity/base/schema-creator'

import schemaTypes from 'all:part:@sanity/base/schema-type'
import banner from './banner'
import section from './section'
import products from './products'
import coaching from './coaching'
import testimonials from './testimonials'
import transfomations from './transformations'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    banner, section, products,coaching,testimonials,transfomations
  ]),
})
