import { PermissionType } from './../permission.type';
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permissions';

export const Permissions = (...permissions: PermissionType[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
