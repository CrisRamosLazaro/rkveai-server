import { Request, Response } from 'express'
import { fetchRedditPosts } from '../services/reddit-services'
import { analyzeSentiment } from '../services/openai-services'
import { getRandomSentiment } from '../helpers/generateRandomSentiment'
import { Sorting } from '../types/reddit.types'

const fetchPosts = async (req: Request, res: Response) => {

    const subreddit = req.query.subreddit as string
    const sorting = req.query.sorting as Sorting

    try {
        const posts = await fetchRedditPosts(subreddit, sorting)

        // const postsWithSentiment = await Promise.all(posts.map(async (post) => {
        //     const sentiment = await analyzeSentiment(post.title)
        //     return { ...post, sentiment }
        // }))
        const postsWithSentiment = posts.map(post => ({
            ...post,
            sentiment: getRandomSentiment()
        }))

        res.json(postsWithSentiment)

    } catch (error) {
        console.error('Error fetching posts:', error)
        res.status(500).json({ error: (error as Error).message })
    }
}

export { fetchPosts }
