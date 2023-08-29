import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FollowInterface {
  id?: string;
  follower_id: string;
  followee_id: string;
  created_at?: any;
  updated_at?: any;

  user_follow_follower_idTouser?: UserInterface;
  user_follow_followee_idTouser?: UserInterface;
  _count?: {};
}

export interface FollowGetQueryInterface extends GetQueryInterface {
  id?: string;
  follower_id?: string;
  followee_id?: string;
}
