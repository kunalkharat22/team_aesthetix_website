import createSchema from 'part:@sanity/base/schema-creator'

import schemaTypes from 'all:part:@sanity/base/schema-type'
import banner from './banner'
import section from './section'
import products from './products'
import coaching from './coaching'
import testimonials from './testimonials'
import transfomations from './transformations'
import post from "./post"
import author from "./author"
import category from "./category"
import siteconfig from "./siteConfig";
 

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    banner, section, products,coaching,testimonials,transfomations, post, author, category, siteconfig
  ]),
})
