import axios from 'axios'
import { Sentiment } from '../types/reddit.types'

export const analyzeSentiment = async (text: string): Promise<Sentiment> => {

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a sentiment analysis assistant. You analyze the sentiment of text and assign a sentiment score.',
                    },
                    {
                        role: 'user',
                        content: `Analyze the sentiment of the following text: "${text}". Output as "Positive", "Neutral", or "Negative".`,
                    },
                ],
                max_tokens: 10,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        )
        // return response.data.choices[0].message.content.trim()
        const sentiment = response.data.choices[0].message.content.trim() as Sentiment
        if (["Positive", "Neutral", "Negative"].includes(sentiment)) {
            return sentiment
        } else {
            throw new Error('Unexpected sentiment value')
        }

    } catch (error: any) {
        console.error('Error analyzing sentiment:', {
            message: error.message,
            code: error.code,
            response: error.response?.data,
            status: error.response?.status,
        })
        throw new Error('Error analyzing sentiment')
    }
}