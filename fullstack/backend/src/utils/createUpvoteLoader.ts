import { Upvote } from '../entities/Upvote';
import DataLoader from 'dataloader';

// [{postId: 5, userId: 10}]
// [{postId: 5, userId: 10, value: 1}]
export const createUpvoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Upvote | null>(
    async (keys) => {
      /*   const postIdMap = keys.map((value) => ({
        postId: value.postId,
      }));
      const userIdMap = keys.map((value) => ({
        userId: value.userId,
      })); */

      const upvotes = await Upvote.findByIds(keys as any[]);
      console.log('upovtes----------------------------------------', upvotes);
      const upvoteIdsToUpvote: Record<string, Upvote> = {};
      upvotes.forEach((Upvote) => {
        upvoteIdsToUpvote[`${Upvote.userId}|${Upvote.postId}`] = Upvote;
      });

      return keys.map(
        (key) => upvoteIdsToUpvote[`${key.userId}|${key.postId}`]
      );
    }
  );
