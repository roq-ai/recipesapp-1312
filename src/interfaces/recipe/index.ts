import { CommentInterface } from 'interfaces/comment';
import { FavoriteInterface } from 'interfaces/favorite';
import { UserInterface } from 'interfaces/user';
import { CommunityInterface } from 'interfaces/community';
import { GetQueryInterface } from 'interfaces';

export interface RecipeInterface {
  id?: string;
  title: string;
  ingredients: string;
  instructions: string;
  cooking_time: number;
  user_id: string;
  community_id: string;
  created_at?: any;
  updated_at?: any;
  comment?: CommentInterface[];
  favorite?: FavoriteInterface[];
  user?: UserInterface;
  community?: CommunityInterface;
  _count?: {
    comment?: number;
    favorite?: number;
  };
}

export interface RecipeGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  ingredients?: string;
  instructions?: string;
  user_id?: string;
  community_id?: string;
}
