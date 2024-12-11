import axios from 'axios'
import { Sorting } from '../types/reddit.types'

export const fetchRedditPosts = async (subreddit: string, sorting: Sorting) => {

    try {
        const url = `https://www.reddit.com/r/${subreddit}/${sorting}.json?limit=10`

        const response = await axios.get(url)

        return response.data.data.children.map((post: any) => ({
            title: post.data.title,
            upvotes: post.data.ups,
            comments: post.data.num_comments,
            date: new Date(post.data.created_utc * 1000),
        }))

    } catch (error) {
        throw new Error('Error fetching Reddit posts')
    }
}
