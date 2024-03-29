import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Upvote extends BaseEntity {
  @Column({ type: 'int' })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.upvotes)
  post: Post;
}
