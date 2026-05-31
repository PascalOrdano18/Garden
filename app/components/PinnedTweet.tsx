import { getTweet } from "react-tweet/api";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import type { Tweet, QuotedTweet } from "react-tweet/api";

// X's syndication API omits empty entity arrays (hashtags, urls, symbols) instead
// of returning []. react-tweet@3.3.0's getEntities() iterates them unconditionally,
// throwing "entities is not iterable" for tweets that only contain mentions.
// Backfill the missing arrays before handing the tweet to <EmbeddedTweet>.
// (media is intentionally left untouched: react-tweet guards `if (entities.media)`,
// but fixRange would crash on an empty media array.)
function normalizeEntities<T extends Tweet | QuotedTweet | undefined>(tweet: T): T {
    if (!tweet) return tweet;
    const entities = (tweet.entities ?? {}) as unknown as Record<string, unknown>;
    for (const key of ["hashtags", "urls", "symbols", "user_mentions"] as const) {
        if (!entities[key]) entities[key] = [];
    }
    (tweet as { entities: unknown }).entities = entities;
    return tweet;
}

export default async function PinnedTweet({ id }: { id: string }) {
    let tweet: Tweet | undefined;
    try {
        tweet = await getTweet(id);
    } catch (err) {
        console.error(err);
        return <TweetNotFound error={err} />;
    }

    if (!tweet) return <TweetNotFound />;

    normalizeEntities(tweet);
    normalizeEntities(tweet.quoted_tweet);

    return <EmbeddedTweet tweet={tweet} />;
}
