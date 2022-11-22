import select from "@/config/select";

const dataContents = require.context('./data', false, /\.js$/)
const postContents = require.context('./post', false, /\.js$/)
const searchContents = require.context('./search', false, /\.js$/)

select.loadContents(dataContents, 'data')
select.loadContents(postContents, 'post')
select.loadContents(searchContents, 'search')

export default select
