interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Recipe Creator'],
  customerRoles: [],
  tenantRoles: ['Recipe Creator', 'Recipe Explorer'],
  tenantName: 'Community',
  applicationName: 'recipesapp',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
