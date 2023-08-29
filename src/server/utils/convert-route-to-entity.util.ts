const mapping: Record<string, string> = {
  comments: 'comment',
  communities: 'community',
  favorites: 'favorite',
  follows: 'follow',
  recipes: 'recipe',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
