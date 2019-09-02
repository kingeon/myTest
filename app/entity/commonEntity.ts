import {
    BaseEntity, Column, Entity, JoinColumn, ManyToOne, ObjectType,
    OneToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { IsDate, IsOptional, IsString, validate, ValidatorOptions } from 'class-validator';
import { ValidationError } from '../utils/HandleError';
/**
 *  公共字段
 *
 * @class CommonEntity
 * @extends {BaseEntity}
 */

class CommonEntity extends BaseEntity {

    @Column({ comment: '创建人id', readonly: true })
    createdBy: string;

    @IsString()
    @Column({ comment: '创建人名称', readonly: true })
    createdName: string;

    @Column({ type: 'timestamp', comment: '创建时间' })
    createdAt: Date;

    @IsOptional()
    @Column({ comment: '更新人id', nullable: true })
    updatedBy: string;

    @IsOptional()
    @IsString()
    @Column({ comment: '更新人名称', nullable: true })
    updatedName: string;

    @Column({ type: 'timestamp', comment: '更新时间', nullable: true })
    updatedAt: Date;

    @IsOptional()
    @Column({ comment: '删除人id', nullable: true })
    deletedBy: string;

    @IsOptional()
    @IsString()
    @Column({ comment: '删除人名称', nullable: true })
    deletedName: string;

    @IsOptional()
    @IsDate()
    @Column({ type: 'timestamp', comment: '删除时间', nullable: true })
    deletedAt: Date;

    /**
     * create entity object
     *
     * @static
     * @template T
     * @param {*} [entityOrEntities] entity Or Entities
     * @param {*} [userInfo] userInfo
     * @returns {T}
     * @memberof CommonEntity
     */
    static async create<T extends BaseEntity>
        (this: ObjectType<T>, entityOrEntities?: any, userInfo?: any, option?: ValidatorOptions): Promise<T> {
        if (entityOrEntities && Array.isArray(entityOrEntities)) {
            entityOrEntities.forEach((item: any) => {
                setDefaultData(item, userInfo);
            });
        } else if (entityOrEntities) {
            setDefaultData(entityOrEntities, userInfo);
        }
        const objectOrObjects = (this as any).getRepository().create(entityOrEntities);
        if (objectOrObjects && Array.isArray(objectOrObjects)) {
            objectOrObjects.forEach(async (item: any) => {
                await item.validate(option);
            });
        } else {
            await objectOrObjects.validate();
        }
        return objectOrObjects;
    }

    /**
     * 字段校验
     *
     * @param {*} option 校验配置
     * @returns
     * @memberof CommonEntity
     */
    protected async validate<T extends BaseEntity>(this: T, option?: ValidatorOptions): Promise<T> {
        const errors = await validate(this, option);
        if (errors.length) {
            throw new ValidationError(errorHandler(errors));
        }
        return new Promise<T>((resolve) => {
            resolve(this);
        });
    }

    public async validator() {
        const errors = await validate(this);
        if (errors.length) {
            throw new ValidationError(errorHandler(errors));
        }
    }

    public setCreatedBy(userInfo) {
        this.createdBy = userInfo.accountId;
        this.createdName = userInfo.name || userInfo.phone;
        this.createdAt = new Date();
    }

    public setUpdatedBy(userInfo) {
        this.createdBy = userInfo.accountId;
        this.updatedName = userInfo.name || userInfo.phone;;
        this.updatedAt = new Date();
    }

    public setDeletedBy(userInfo) {
        this.createdBy = userInfo.accountId;
        this.deletedName = userInfo.name || userInfo.phone;;
        this.deletedAt = new Date();
    }

}

/**
 * 设置默认值
 *
 * @param {*} item
 */
function setDefaultData(item: any, userInfo: any) {
    if (userInfo) {
        item.createdBy = item.createdBy || userInfo.accountId;
        item.createdName = item.createdName || userInfo.name;
        item.updatedBy = item.updatedBy || userInfo.accountId;
        item.updatedName = item.updatedName || userInfo.name;
    }
    item.createdAt = new Date().toISOString();
    item.updatedAt = new Date().toISOString();
}

/**
 * 错误处理
 *
 * @param {*} errors
 * @returns
 */
function errorHandler(errors: any[]): string {
    let message = '';
    for (const e of errors) {
        for (const k in e.constraints) {
            if (e.constraints.hasOwnProperty(k)) {
                message += 'Error: ' + e.constraints[k] + ';   ';
            }
        }
    }
    return message;
}

export {
    BaseEntity, CommonEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn
};
