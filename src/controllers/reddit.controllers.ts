import { Request, Response, NextFunction } from 'express'
import { fetchRedditPosts } from '../services/reddit-service'
import { Sorting } from '../types/reddit.types'

const fetchPosts = async (req: Request, res: Response) => {

    const subreddit = req.query.subreddit as string
    const sorting = req.query.sorting as Sorting

    try {
        const posts = await fetchRedditPosts(subreddit, sorting)
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export { fetchPosts }
