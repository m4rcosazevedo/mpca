export class PermissionChecker {
  private permissions: Set<string>

  constructor(permissions: string[]) {
    const features = permissions.map((perm) => perm.split('.')[0])

    this.permissions = new Set([...features, ...permissions])
  }

  hasPermission(permission: string): boolean {
    return this.permissions.has(permission)
  }

  check(permission: string): boolean {
    if (!permission) {
      return false
    }

    const mostPermissions = permission.split(':')
    if (mostPermissions.length > 1) {
      return mostPermissions.every((perm) => this.hasPermission(perm))
    }

    return permission.split('|').some((perm) => this.hasPermission(perm))
  }
}
