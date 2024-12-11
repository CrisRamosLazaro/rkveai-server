import { Sentiment } from "../types/reddit.types"

export const getRandomSentiment = (): Sentiment => {
    const sentiments: Sentiment[] = ["Positive", "Neutral", "Negative"]
    return sentiments[Math.floor(Math.random() * sentiments.length)]
}