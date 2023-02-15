import { BlocksEnum } from '../enums/blocks.enums';
import { ValidRoles } from '../enums/valid-roles.enums';

export interface customUser {
  blocks?: BlocksEnum[];
  roles?: ValidRoles[];
}
