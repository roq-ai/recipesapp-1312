import { RecipeInterface } from 'interfaces/recipe';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CommunityInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  recipe?: RecipeInterface[];
  user?: UserInterface;
  _count?: {
    recipe?: number;
  };
}

export interface CommunityGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
