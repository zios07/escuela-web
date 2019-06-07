export class Role {
    id:number;
    roleCode: string;
    roleLabel: string;

    constructor(roleCode?: string, roleLabel?: string) {
        this.roleCode = roleCode;
        this.roleLabel = roleLabel;
    }

    getRoleCode() {
        return this.roleCode;
    }

    getRoleLabel() {
        return this.roleLabel;
    }
}